import { keccak256 } from "@ethersproject/keccak256";
import { EvmLogHandlerContext } from "@subsquid/eth-processor";
import { Store } from "@subsquid/typeorm-store";
import {
  Account,
  Domain,
  DomainEvent,
  NewOwner,
  NewResolver,
  NewTTL,
  Resolver,
  Transfer,
} from "./model";
import * as registry from "./abi/registry";
import { createEventID } from "./util";

export const ROOT_NODE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

const BIG_INT_ZERO = BigInt(0);

function createDomain(node: string, timestamp: bigint): Domain {
  if (node == ROOT_NODE) {
    return new Domain({
      id: node,
    });
  } else {
    return new Domain({
      id: node,
      owner: new Account({
        id: EMPTY_ADDRESS,
      }),
      isMigrated: true,
      createdAt: timestamp,
    });
  }
}

async function getDomain(
  store: Store,
  node: string,
  timestamp: bigint = BIG_INT_ZERO
): Promise<Domain | undefined> {
  let domain = await store.get(Domain, node);
  if (!domain && node == ROOT_NODE) {
    return createDomain(node, timestamp);
  } else {
    return domain;
  }
}

function makeSubnode(event: registry.NewOwner0Event): string {
  return keccak256(
    Buffer.concat([
      Buffer.from(event.node, "hex"),
      Buffer.from(event.label, "hex"),
    ])
  );
}

async function handleNewOwnerImpl(
  ctx: EvmLogHandlerContext<Store>,
  isMigrated: boolean
): Promise<void> {
  if (!ctx.log.data) {
    throw new Error("no data");
  }
  if (!ctx.log.block.timestamp) {
    throw new Error("no timestamp");
  }
  if (!ctx.log.logIndex) {
    throw new Error("no log index");
  }
  if (!ctx.log.block.number) {
    throw new Error("no block number");
  }

  const timestamp = BigInt(ctx.log.block.timestamp);

  const event = registry.events["NewOwner(bytes32,bytes32,address)"].decode({
    data: ctx.log.data,
    topics: ctx.log.topics,
  });

  const owner = new Account({ id: event.owner });
  await ctx.store.save(owner);

  const subnode = makeSubnode(event);

  let domain = await getDomain(ctx.store, subnode, timestamp);
  if (domain === undefined) {
    domain = new Domain({
      id: subnode,
      createdAt: timestamp,
    });
  }

  domain.owner = owner;
  domain.parent = await ctx.store.get(Domain, event.node);
  domain.labelhash = Buffer.from(event.label, "hex");
  domain.isMigrated = isMigrated;

  await ctx.store.save(domain);

  const transactionID = ctx.log.tx.hash;
  if (!transactionID) {
    throw new Error("no tx hash");
  }

  await ctx.store.save(
    new DomainEvent({
      id: createEventID(ctx.log.block.number, ctx.log.logIndex),
      transactionID: Buffer.from(transactionID, "hex"),
      blockNumber: ctx.log.block.number,
      kind: new NewOwner({
        owner: event.owner,
      }),
      domain,
    })
  );
}

export async function handleTransfer(
  ctx: EvmLogHandlerContext<Store>
): Promise<void> {
  if (!ctx.log.data) {
    throw new Error("no data");
  }
  if (!ctx.log.block.timestamp) {
    throw new Error("no timestamp");
  }
  if (!ctx.log.logIndex) {
    throw new Error("no log index");
  }

  const timestamp = BigInt(ctx.log.block.timestamp);

  const event = registry.events["Transfer(bytes32,address)"].decode({
    data: ctx.log.data,
    topics: ctx.log.topics,
  });

  let owner = await ctx.store.get(Account, event.owner);
  if (!owner) {
    owner = new Account({
      id: event.owner,
    });
    await ctx.store.save(owner);
  }

  let domain = await getDomain(ctx.store, event.node, timestamp);
  if (!domain) {
    domain = new Domain({
      id: event.node,
      isMigrated: false,
      createdAt: BigInt(Date.now()),
      owner,
    });
    await ctx.store.save(domain);
  }

  const blockNumber = ctx.log.block.number;
  if (!blockNumber) {
    throw new Error("no block number");
  }

  const transactionID = ctx.log.tx.hash;
  if (!transactionID) {
    throw new Error("no tx hash");
  }

  await ctx.store.save(
    new DomainEvent({
      id: createEventID(blockNumber, ctx.log.logIndex),
      transactionID: Buffer.from(transactionID, "hex"),
      blockNumber,
      kind: new Transfer({
        owner: event.owner,
      }),
      domain,
    })
  );
}

export async function handleNewResolver(
  ctx: EvmLogHandlerContext<Store>
): Promise<void> {
  if (!ctx.log.data) {
    throw new Error("no data");
  }
  if (!ctx.log.block.timestamp) {
    throw new Error("no timestamp");
  }
  if (!ctx.log.logIndex) {
    throw new Error("no log index");
  }

  const timestamp = BigInt(ctx.log.block.timestamp);

  const blockNumber = ctx.log.block.number;
  if (!blockNumber) {
    throw new Error("no block number");
  }

  const transactionID = ctx.log.tx.hash;
  if (!transactionID) {
    throw new Error("no tx hash");
  }

  const event = registry.events["NewResolver(bytes32,address)"].decode({
    data: ctx.log.data,
    topics: ctx.log.topics,
  });

  const id = event.resolver.concat("-").concat(event.node);

  const domain = await getDomain(ctx.store, event.node, timestamp);
  if (!domain) {
    return;
  }

  let resolver = await ctx.store.get(Resolver, id);
  if (!resolver) {
    resolver = new Resolver({
      id,
      domain,
      address: Buffer.from(event.resolver, "hex"),
    });
  }
  await ctx.store.save(resolver);

  domain.resolver = resolver;

  await ctx.store.save(
    new DomainEvent({
      id: createEventID(blockNumber, ctx.log.logIndex),
      transactionID: Buffer.from(transactionID, "hex"),
      blockNumber,
      kind: new NewResolver({
        resolver: event.resolver,
      }),
      domain,
    })
  );
}

export async function handleNewTtl(
  ctx: EvmLogHandlerContext<Store>
): Promise<void> {
  if (!ctx.log.data) {
    throw new Error("no data");
  }
  if (!ctx.log.block.timestamp) {
    throw new Error("no timestamp");
  }
  if (!ctx.log.logIndex) {
    throw new Error("no log index");
  }

  const timestamp = BigInt(ctx.log.block.timestamp);

  const blockNumber = ctx.log.block.number;
  if (!blockNumber) {
    throw new Error("no block number");
  }

  const transactionID = ctx.log.tx.hash;
  if (!transactionID) {
    throw new Error("no tx hash");
  }

  const event = registry.events["NewTTL(bytes32,uint64)"].decode({
    data: ctx.log.data,
    topics: ctx.log.topics,
  });

  const domain = await getDomain(ctx.store, event.node, timestamp);
  if (!domain) {
    return;
  }

  await ctx.store.save(
    new DomainEvent({
      id: createEventID(blockNumber, ctx.log.logIndex),
      transactionID: Buffer.from(transactionID, "hex"),
      blockNumber,
      kind: new NewTTL({
        ttl: event.ttl.toBigInt(),
      }),
      domain,
    })
  );
}

export async function handleNewOwner(
  ctx: EvmLogHandlerContext<Store>
): Promise<void> {
  return await handleNewOwnerImpl(ctx, true);
}

export async function handleNewOwnerOldRegistry(
  ctx: EvmLogHandlerContext<Store>
): Promise<void> {
  if (!ctx.log.data) {
    throw new Error("no data");
  }
  if (!ctx.log.block.timestamp) {
    throw new Error("no timestamp");
  }
  if (!ctx.log.logIndex) {
    throw new Error("no log index");
  }
  if (!ctx.log.block.number) {
    throw new Error("no block number");
  }

  const timestamp = BigInt(ctx.log.block.timestamp);

  const event = registry.events["NewOwner(bytes32,bytes32,address)"].decode({
    data: ctx.log.data,
    topics: ctx.log.topics,
  });

  const subnode = makeSubnode(event);

  const domain = await ctx.store.get(Domain, subnode);
  if (!domain) {
    return;
  }
  if (event.node == ROOT_NODE || !domain.isMigrated) {
    return await handleNewOwnerImpl(ctx, false);
  }
}

export async function handleNewTtlOldRegistry(
  ctx: EvmLogHandlerContext<Store>
): Promise<void> {
  if (!ctx.log.data) {
    throw new Error("no data");
  }
  if (!ctx.log.block.timestamp) {
    throw new Error("no timestamp");
  }
  if (!ctx.log.logIndex) {
    throw new Error("no log index");
  }

  const timestamp = BigInt(ctx.log.block.timestamp);

  const blockNumber = ctx.log.block.number;
  if (!blockNumber) {
    throw new Error("no block number");
  }

  const transactionID = ctx.log.tx.hash;
  if (!transactionID) {
    throw new Error("no tx hash");
  }

  const event = registry.events["NewTTL(bytes32,uint64)"].decode({
    data: ctx.log.data,
    topics: ctx.log.topics,
  });

  const domain = await getDomain(ctx.store, event.node, timestamp);
  if (!domain) {
    return;
  }

  if (!domain.isMigrated) {
    await handleNewTtl(ctx);
  }
}

export async function handleTransferOldRegistry(
  ctx: EvmLogHandlerContext<Store>
): Promise<void> {
  if (!ctx.log.data) {
    throw new Error("no data");
  }
  if (!ctx.log.block.timestamp) {
    throw new Error("no timestamp");
  }
  if (!ctx.log.logIndex) {
    throw new Error("no log index");
  }

  const timestamp = BigInt(ctx.log.block.timestamp);

  const event = registry.events["Transfer(bytes32,address)"].decode({
    data: ctx.log.data,
    topics: ctx.log.topics,
  });

  const domain = await getDomain(ctx.store, event.node, timestamp);
  if (!domain) {
    return;
  }

  if (!domain.isMigrated) {
    await handleTransfer(ctx);
  }
}

export async function handleNewResolverOldRegistry(
  ctx: EvmLogHandlerContext<Store>
): Promise<void> {
  if (!ctx.log.data) {
    throw new Error("no data");
  }
  if (!ctx.log.block.timestamp) {
    throw new Error("no timestamp");
  }
  if (!ctx.log.logIndex) {
    throw new Error("no log index");
  }

  const timestamp = BigInt(ctx.log.block.timestamp);

  const blockNumber = ctx.log.block.number;
  if (!blockNumber) {
    throw new Error("no block number");
  }

  const transactionID = ctx.log.tx.hash;
  if (!transactionID) {
    throw new Error("no tx hash");
  }

  const event = registry.events["NewResolver(bytes32,address)"].decode({
    data: ctx.log.data,
    topics: ctx.log.topics,
  });

  const domain = await getDomain(ctx.store, event.node, timestamp);
  if (!domain) {
    return;
  }

  if (event.node == ROOT_NODE || !domain.isMigrated) {
    await handleNewResolver(ctx);
  }
}
