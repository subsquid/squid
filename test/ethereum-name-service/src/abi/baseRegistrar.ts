import * as ethers from "ethers";

export const abi = new ethers.utils.Interface(getJsonAbi());

export interface ControllerAdded0Event {
  controller: string;
}

export interface ControllerRemoved0Event {
  controller: string;
}

export interface NameMigrated0Event {
  id: ethers.BigNumber;
  owner: string;
  expires: ethers.BigNumber;
}

export interface NameRegistered0Event {
  id: ethers.BigNumber;
  owner: string;
  expires: ethers.BigNumber;
}

export interface NameRenewed0Event {
  id: ethers.BigNumber;
  expires: ethers.BigNumber;
}

export interface OwnershipTransferred0Event {
  previousOwner: string;
  newOwner: string;
}

export interface Transfer0Event {
  from: string;
  to: string;
  tokenId: ethers.BigNumber;
}

export interface Approval0Event {
  owner: string;
  approved: string;
  tokenId: ethers.BigNumber;
}

export interface ApprovalForAll0Event {
  owner: string;
  operator: string;
  approved: boolean;
}

export interface EvmEvent {
  data: string;
  topics: string[];
}

export const events = {
  "ControllerAdded(address)": {
    topic: abi.getEventTopic("ControllerAdded(address)"),
    decode(data: EvmEvent): ControllerAdded0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("ControllerAdded(address)"),
        data.data || "",
        data.topics
      );
      return {
        controller: result[0],
      };
    },
  },
  "ControllerRemoved(address)": {
    topic: abi.getEventTopic("ControllerRemoved(address)"),
    decode(data: EvmEvent): ControllerRemoved0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("ControllerRemoved(address)"),
        data.data || "",
        data.topics
      );
      return {
        controller: result[0],
      };
    },
  },
  "NameMigrated(uint256,address,uint256)": {
    topic: abi.getEventTopic("NameMigrated(uint256,address,uint256)"),
    decode(data: EvmEvent): NameMigrated0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NameMigrated(uint256,address,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        id: result[0],
        owner: result[1],
        expires: result[2],
      };
    },
  },
  "NameRegistered(uint256,address,uint256)": {
    topic: abi.getEventTopic("NameRegistered(uint256,address,uint256)"),
    decode(data: EvmEvent): NameRegistered0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NameRegistered(uint256,address,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        id: result[0],
        owner: result[1],
        expires: result[2],
      };
    },
  },
  "NameRenewed(uint256,uint256)": {
    topic: abi.getEventTopic("NameRenewed(uint256,uint256)"),
    decode(data: EvmEvent): NameRenewed0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NameRenewed(uint256,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        id: result[0],
        expires: result[1],
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
  "Transfer(address,address,uint256)": {
    topic: abi.getEventTopic("Transfer(address,address,uint256)"),
    decode(data: EvmEvent): Transfer0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Transfer(address,address,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        from: result[0],
        to: result[1],
        tokenId: result[2],
      };
    },
  },
  "Approval(address,address,uint256)": {
    topic: abi.getEventTopic("Approval(address,address,uint256)"),
    decode(data: EvmEvent): Approval0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("Approval(address,address,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        owner: result[0],
        approved: result[1],
        tokenId: result[2],
      };
    },
  },
  "ApprovalForAll(address,address,bool)": {
    topic: abi.getEventTopic("ApprovalForAll(address,address,bool)"),
    decode(data: EvmEvent): ApprovalForAll0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("ApprovalForAll(address,address,bool)"),
        data.data || "",
        data.topics
      );
      return {
        owner: result[0],
        operator: result[1],
        approved: result[2],
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
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
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
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "from",
          type: "address",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "id",
          type: "uint256",
        },
        {
          name: "owner",
          type: "address",
        },
      ],
      name: "reclaim",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "ens",
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
      constant: false,
      inputs: [
        {
          name: "from",
          type: "address",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "transferPeriodEnds",
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
          name: "resolver",
          type: "address",
        },
      ],
      name: "setResolver",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
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
      name: "MIGRATION_LOCK_PERIOD",
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
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
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
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
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
          name: "id",
          type: "uint256",
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
      constant: false,
      inputs: [
        {
          name: "to",
          type: "address",
        },
        {
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "controller",
          type: "address",
        },
      ],
      name: "addController",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "previousRegistrar",
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
      constant: false,
      inputs: [
        {
          name: "from",
          type: "address",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
        },
        {
          name: "_data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "GRACE_PERIOD",
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
          name: "id",
          type: "uint256",
        },
        {
          name: "duration",
          type: "uint256",
        },
      ],
      name: "renew",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "id",
          type: "uint256",
        },
      ],
      name: "nameExpires",
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
          name: "",
          type: "address",
        },
      ],
      name: "controllers",
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
      name: "baseNode",
      outputs: [
        {
          name: "",
          type: "bytes32",
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
          name: "owner",
          type: "address",
        },
        {
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
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
          name: "label",
          type: "bytes32",
        },
        {
          name: "deed",
          type: "address",
        },
        {
          name: "",
          type: "uint256",
        },
      ],
      name: "acceptRegistrarTransfer",
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
      constant: false,
      inputs: [
        {
          name: "controller",
          type: "address",
        },
      ],
      name: "removeController",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "id",
          type: "uint256",
        },
        {
          name: "owner",
          type: "address",
        },
        {
          name: "duration",
          type: "uint256",
        },
      ],
      name: "register",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          name: "_ens",
          type: "address",
        },
        {
          name: "_previousRegistrar",
          type: "address",
        },
        {
          name: "_baseNode",
          type: "bytes32",
        },
        {
          name: "_transferPeriodEnds",
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
          indexed: true,
          name: "controller",
          type: "address",
        },
      ],
      name: "ControllerAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "controller",
          type: "address",
        },
      ],
      name: "ControllerRemoved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "id",
          type: "uint256",
        },
        {
          indexed: true,
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          name: "expires",
          type: "uint256",
        },
      ],
      name: "NameMigrated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "id",
          type: "uint256",
        },
        {
          indexed: true,
          name: "owner",
          type: "address",
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
          indexed: true,
          name: "id",
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
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          name: "tokenId",
          type: "uint256",
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
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
  ];
}
