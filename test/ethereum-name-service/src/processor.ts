import { EthProcessor } from "@subsquid/eth-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as registry from "./abi/registry";
import {
  handleTransfer,
  handleNewOwner,
  handleNewResolver,
  handleNewOwnerOldRegistry,
  handleNewTtl,
  handleNewTtlOldRegistry,
  handleTransferOldRegistry,
  handleNewResolverOldRegistry,
} from "./ensRegistry";

require("dotenv").config();

const processor = new EthProcessor(new TypeormDatabase());

processor.setDataSource({
  archive: "http://172.30.144.1:8080",
});

processor.setBlockRange({
  from: 11000000,
  to: 14150000,
});

processor.setBatchSize(1000);

processor.setFieldSelection({
  tx: {
    hash: true,
  },
  block: {
    number: true,
    timestamp: true,
  },
  data: true,
  logIndex: true,
});

const ensRegistryAddr = "0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e";

processor.addEvmLogHandler(
  ensRegistryAddr,
  [[registry.events["Transfer(bytes32,address)"].topic]],
  handleTransfer
);
processor.addEvmLogHandler(
  ensRegistryAddr,
  [[registry.events["NewOwner(bytes32,bytes32,address)"].topic]],
  handleNewOwner
);
processor.addEvmLogHandler(
  ensRegistryAddr,
  [[registry.events["NewResolver(bytes32,address)"].topic]],
  handleNewResolver
);
processor.addEvmLogHandler(
  ensRegistryAddr,
  [[registry.events["NewTTL(bytes32,uint64)"].topic]],
  handleNewTtl
);

const ensRegistryOldAddr = "0x314159265dd8dbb310642f98f50c066173c1259b";

processor.addEvmLogHandler(
  ensRegistryOldAddr,
  [[registry.events["Transfer(bytes32,address)"].topic]],
  handleTransferOldRegistry
);
processor.addEvmLogHandler(
  ensRegistryOldAddr,
  [[registry.events["NewOwner(bytes32,bytes32,address)"].topic]],
  handleNewOwnerOldRegistry
);
processor.addEvmLogHandler(
  ensRegistryOldAddr,
  [[registry.events["NewResolver(bytes32,address)"].topic]],
  handleNewResolverOldRegistry
);
processor.addEvmLogHandler(
  ensRegistryOldAddr,
  [[registry.events["NewTTL(bytes32,uint64)"].topic]],
  handleNewTtlOldRegistry
);

processor.run();
