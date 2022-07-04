import * as ethers from "ethers";

export const abi = new ethers.utils.Interface(getJsonAbi());

export interface NameRegistered0Event {
  name: string;
  label: string;
  owner: string;
  cost: ethers.BigNumber;
  expires: ethers.BigNumber;
}

export interface NameRenewed0Event {
  name: string;
  label: string;
  cost: ethers.BigNumber;
  expires: ethers.BigNumber;
}

export interface NewPriceOracle0Event {
  oracle: string;
}

export interface OwnershipTransferred0Event {
  previousOwner: string;
  newOwner: string;
}

export interface EvmEvent {
  data: string;
  topics: string[];
}

export const events = {
  "NameRegistered(string,bytes32,address,uint256,uint256)": {
    topic: abi.getEventTopic(
      "NameRegistered(string,bytes32,address,uint256,uint256)"
    ),
    decode(data: EvmEvent): NameRegistered0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NameRegistered(string,bytes32,address,uint256,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        name: result[0],
        label: result[1],
        owner: result[2],
        cost: result[3],
        expires: result[4],
      };
    },
  },
  "NameRenewed(string,bytes32,uint256,uint256)": {
    topic: abi.getEventTopic("NameRenewed(string,bytes32,uint256,uint256)"),
    decode(data: EvmEvent): NameRenewed0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NameRenewed(string,bytes32,uint256,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        name: result[0],
        label: result[1],
        cost: result[2],
        expires: result[3],
      };
    },
  },
  "NewPriceOracle(address)": {
    topic: abi.getEventTopic("NewPriceOracle(address)"),
    decode(data: EvmEvent): NewPriceOracle0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NewPriceOracle(address)"),
        data.data || "",
        data.topics
      );
      return {
        oracle: result[0],
      };
    },
  },
  "OwnershipTransferred(address,address)": {
    topic: abi.getEventTopic("OwnershipTransferred(address,address)"),
    decode(data: EvmEvent): OwnershipTransferred0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("OwnershipTransferred(address,address)"),
        data.data || "",
        data.topics
      );
      return {
        previousOwner: result[0],
        newOwner: result[1],
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
          name: "interfaceID",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
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
      inputs: [],
      name: "withdraw",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_prices",
          type: "address",
        },
      ],
      name: "setPriceOracle",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_minCommitmentAge",
          type: "uint256",
        },
        {
          name: "_maxCommitmentAge",
          type: "uint256",
        },
      ],
      name: "setCommitmentAges",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "bytes32",
        },
      ],
      name: "commitments",
      outputs: [
        {
          name: "",
          type: "uint256",
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
          name: "name",
          type: "string",
        },
        {
          name: "duration",
          type: "uint256",
        },
      ],
      name: "rentPrice",
      outputs: [
        {
          name: "",
          type: "uint256",
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
          name: "name",
          type: "string",
        },
        {
          name: "owner",
          type: "address",
        },
        {
          name: "duration",
          type: "uint256",
        },
        {
          name: "secret",
          type: "bytes32",
        },
      ],
      name: "register",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "MIN_REGISTRATION_DURATION",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "minCommitmentAge",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
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
      inputs: [],
      name: "isOwner",
      outputs: [
        {
          name: "",
          type: "bool",
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
          name: "name",
          type: "string",
        },
      ],
      name: "valid",
      outputs: [
        {
          name: "",
          type: "bool",
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
          name: "name",
          type: "string",
        },
        {
          name: "duration",
          type: "uint256",
        },
      ],
      name: "renew",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "name",
          type: "string",
        },
      ],
      name: "available",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "maxCommitmentAge",
      outputs: [
        {
          name: "",
          type: "uint256",
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
          name: "commitment",
          type: "bytes32",
        },
      ],
      name: "commit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "owner",
          type: "address",
        },
        {
          name: "secret",
          type: "bytes32",
        },
      ],
      name: "makeCommitment",
      outputs: [
        {
          name: "",
          type: "bytes32",
        },
      ],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          name: "_base",
          type: "address",
        },
        {
          name: "_prices",
          type: "address",
        },
        {
          name: "_minCommitmentAge",
          type: "uint256",
        },
        {
          name: "_maxCommitmentAge",
          type: "uint256",
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
          indexed: false,
          name: "name",
          type: "string",
        },
        {
          indexed: true,
          name: "label",
          type: "bytes32",
        },
        {
          indexed: true,
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          name: "cost",
          type: "uint256",
        },
        {
          indexed: false,
          name: "expires",
          type: "uint256",
        },
      ],
      name: "NameRegistered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "name",
          type: "string",
        },
        {
          indexed: true,
          name: "label",
          type: "bytes32",
        },
        {
          indexed: false,
          name: "cost",
          type: "uint256",
        },
        {
          indexed: false,
          name: "expires",
          type: "uint256",
        },
      ],
      name: "NameRenewed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "oracle",
          type: "address",
        },
      ],
      name: "NewPriceOracle",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
  ];
}
