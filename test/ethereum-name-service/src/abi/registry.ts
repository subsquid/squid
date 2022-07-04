import * as ethers from "ethers";

export const abi = new ethers.utils.Interface(getJsonAbi());

export interface Transfer0Event {
  node: string;
  owner: string;
}

export interface NewOwner0Event {
  node: string;
  label: string;
  owner: string;
}

export interface NewResolver0Event {
  node: string;
  resolver: string;
}

export interface NewTTL0Event {
  node: string;
  ttl: ethers.BigNumber;
}

export interface EvmEvent {
  data: string;
  topics: string[];
}

export const events = {
  "Transfer(bytes32,address)": {
    topic: abi.getEventTopic("Transfer(bytes32,address)"),
    decode(data: EvmEvent): Transfer0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Transfer(bytes32,address)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        owner: result[1],
      };
    },
  },
  "NewOwner(bytes32,bytes32,address)": {
    topic: abi.getEventTopic("NewOwner(bytes32,bytes32,address)"),
    decode(data: EvmEvent): NewOwner0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NewOwner(bytes32,bytes32,address)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        label: result[1],
        owner: result[2],
      };
    },
  },
  "NewResolver(bytes32,address)": {
    topic: abi.getEventTopic("NewResolver(bytes32,address)"),
    decode(data: EvmEvent): NewResolver0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NewResolver(bytes32,address)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        resolver: result[1],
      };
    },
  },
  "NewTTL(bytes32,uint64)": {
    topic: abi.getEventTopic("NewTTL(bytes32,uint64)"),
    decode(data: EvmEvent): NewTTL0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NewTTL(bytes32,uint64)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        ttl: result[1],
      };
    },
  },
};

function getJsonAbi(): any {
  return [
    {
      constant: true,
      inputs: [
        {
          name: "node",
          type: "bytes32",
        },
      ],
      name: "resolver",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "node",
          type: "bytes32",
        },
      ],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "node",
          type: "bytes32",
        },
        {
          name: "label",
          type: "bytes32",
        },
        {
          name: "owner",
          type: "address",
        },
      ],
      name: "setSubnodeOwner",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "node",
          type: "bytes32",
        },
        {
          name: "ttl",
          type: "uint64",
        },
      ],
      name: "setTTL",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "node",
          type: "bytes32",
        },
      ],
      name: "ttl",
      outputs: [
        {
          name: "",
          type: "uint64",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "node",
          type: "bytes32",
        },
        {
          name: "resolver",
          type: "address",
        },
      ],
      name: "setResolver",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "node",
          type: "bytes32",
        },
        {
          name: "owner",
          type: "address",
        },
      ],
      name: "setOwner",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "node",
          type: "bytes32",
        },
        {
          indexed: false,
          name: "owner",
          type: "address",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "node",
          type: "bytes32",
        },
        {
          indexed: true,
          name: "label",
          type: "bytes32",
        },
        {
          indexed: false,
          name: "owner",
          type: "address",
        },
      ],
      name: "NewOwner",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "node",
          type: "bytes32",
        },
        {
          indexed: false,
          name: "resolver",
          type: "address",
        },
      ],
      name: "NewResolver",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "node",
          type: "bytes32",
        },
        {
          indexed: false,
          name: "ttl",
          type: "uint64",
        },
      ],
      name: "NewTTL",
      type: "event",
    },
  ];
}
