import * as ethers from "ethers";

export const abi = new ethers.utils.Interface(getJsonAbi());

export interface AuthorisationChanged0Event {
  node: string;
  owner: string;
  target: string;
  isAuthorised: boolean;
}

export interface TextChanged0Event {
  node: string;
  indexedKey: string;
  key: string;
}

export interface PubkeyChanged0Event {
  node: string;
  x: string;
  y: string;
}

export interface NameChanged0Event {
  node: string;
  name: string;
}

export interface InterfaceChanged0Event {
  node: string;
  interfaceID: string;
  implementer: string;
}

export interface ContenthashChanged0Event {
  node: string;
  hash: string;
}

export interface AddrChanged0Event {
  node: string;
  a: string;
}

export interface AddressChanged0Event {
  node: string;
  coinType: ethers.BigNumber;
  newAddress: string;
}

export interface ABIChanged0Event {
  node: string;
  contentType: ethers.BigNumber;
}

export interface EvmEvent {
  data: string;
  topics: string[];
}

export const events = {
  "AuthorisationChanged(bytes32,address,address,bool)": {
    topic: abi.getEventTopic(
      "AuthorisationChanged(bytes32,address,address,bool)"
    ),
    decode(data: EvmEvent): AuthorisationChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("AuthorisationChanged(bytes32,address,address,bool)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        owner: result[1],
        target: result[2],
        isAuthorised: result[3],
      };
    },
  },
  "TextChanged(bytes32,string,string)": {
    topic: abi.getEventTopic("TextChanged(bytes32,string,string)"),
    decode(data: EvmEvent): TextChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("TextChanged(bytes32,string,string)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        indexedKey: result[1],
        key: result[2],
      };
    },
  },
  "PubkeyChanged(bytes32,bytes32,bytes32)": {
    topic: abi.getEventTopic("PubkeyChanged(bytes32,bytes32,bytes32)"),
    decode(data: EvmEvent): PubkeyChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("PubkeyChanged(bytes32,bytes32,bytes32)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        x: result[1],
        y: result[2],
      };
    },
  },
  "NameChanged(bytes32,string)": {
    topic: abi.getEventTopic("NameChanged(bytes32,string)"),
    decode(data: EvmEvent): NameChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NameChanged(bytes32,string)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        name: result[1],
      };
    },
  },
  "InterfaceChanged(bytes32,bytes4,address)": {
    topic: abi.getEventTopic("InterfaceChanged(bytes32,bytes4,address)"),
    decode(data: EvmEvent): InterfaceChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("InterfaceChanged(bytes32,bytes4,address)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        interfaceID: result[1],
        implementer: result[2],
      };
    },
  },
  "ContenthashChanged(bytes32,bytes)": {
    topic: abi.getEventTopic("ContenthashChanged(bytes32,bytes)"),
    decode(data: EvmEvent): ContenthashChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("ContenthashChanged(bytes32,bytes)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        hash: result[1],
      };
    },
  },
  "AddrChanged(bytes32,address)": {
    topic: abi.getEventTopic("AddrChanged(bytes32,address)"),
    decode(data: EvmEvent): AddrChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("AddrChanged(bytes32,address)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        a: result[1],
      };
    },
  },
  "AddressChanged(bytes32,uint256,bytes)": {
    topic: abi.getEventTopic("AddressChanged(bytes32,uint256,bytes)"),
    decode(data: EvmEvent): AddressChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("AddressChanged(bytes32,uint256,bytes)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        coinType: result[1],
        newAddress: result[2],
      };
    },
  },
  "ABIChanged(bytes32,uint256)": {
    topic: abi.getEventTopic("ABIChanged(bytes32,uint256)"),
    decode(data: EvmEvent): ABIChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("ABIChanged(bytes32,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        node: result[0],
        contentType: result[1],
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
          internalType: "bytes4",
          name: "interfaceID",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "string",
          name: "key",
          type: "string",
        },
        {
          internalType: "string",
          name: "value",
          type: "string",
        },
      ],
      name: "setText",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "bytes4",
          name: "interfaceID",
          type: "bytes4",
        },
      ],
      name: "interfaceImplementer",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "contentTypes",
          type: "uint256",
        },
      ],
      name: "ABI",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "x",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "y",
          type: "bytes32",
        },
      ],
      name: "setPubkey",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "hash",
          type: "bytes",
        },
      ],
      name: "setContenthash",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
      ],
      name: "addr",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "target",
          type: "address",
        },
        {
          internalType: "bool",
          name: "isAuthorised",
          type: "bool",
        },
      ],
      name: "setAuthorisation",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "string",
          name: "key",
          type: "string",
        },
      ],
      name: "text",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "contentType",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "setABI",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
      ],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      name: "setName",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "coinType",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "a",
          type: "bytes",
        },
      ],
      name: "setAddr",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
      ],
      name: "contenthash",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
      ],
      name: "pubkey",
      outputs: [
        {
          internalType: "bytes32",
          name: "x",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "y",
          type: "bytes32",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "a",
          type: "address",
        },
      ],
      name: "setAddr",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "bytes4",
          name: "interfaceID",
          type: "bytes4",
        },
        {
          internalType: "address",
          name: "implementer",
          type: "address",
        },
      ],
      name: "setInterface",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "coinType",
          type: "uint256",
        },
      ],
      name: "addr",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "authorisations",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract ENS",
          name: "_ens",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "target",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isAuthorised",
          type: "bool",
        },
      ],
      name: "AuthorisationChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "string",
          name: "indexedKey",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "key",
          type: "string",
        },
      ],
      name: "TextChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "x",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "y",
          type: "bytes32",
        },
      ],
      name: "PubkeyChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      name: "NameChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes4",
          name: "interfaceID",
          type: "bytes4",
        },
        {
          indexed: false,
          internalType: "address",
          name: "implementer",
          type: "address",
        },
      ],
      name: "InterfaceChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "hash",
          type: "bytes",
        },
      ],
      name: "ContenthashChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "address",
          name: "a",
          type: "address",
        },
      ],
      name: "AddrChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "coinType",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "newAddress",
          type: "bytes",
        },
      ],
      name: "AddressChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "contentType",
          type: "uint256",
        },
      ],
      name: "ABIChanged",
      type: "event",
    },
  ];
}
