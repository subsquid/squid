import * as ethers from "ethers";

export const abi = new ethers.utils.Interface(getJsonAbi());

export interface AuctionStarted0Event {
  hash: string;
  registrationDate: ethers.BigNumber;
}

export interface NewBid0Event {
  hash: string;
  bidder: string;
  deposit: ethers.BigNumber;
}

export interface BidRevealed0Event {
  hash: string;
  owner: string;
  value: ethers.BigNumber;
  status: number;
}

export interface HashRegistered0Event {
  hash: string;
  owner: string;
  value: ethers.BigNumber;
  registrationDate: ethers.BigNumber;
}

export interface HashReleased0Event {
  hash: string;
  value: ethers.BigNumber;
}

export interface HashInvalidated0Event {
  hash: string;
  name: string;
  value: ethers.BigNumber;
  registrationDate: ethers.BigNumber;
}

export interface EvmEvent {
  data: string;
  topics: string[];
}

export const events = {
  "AuctionStarted(bytes32,uint256)": {
    topic: abi.getEventTopic("AuctionStarted(bytes32,uint256)"),
    decode(data: EvmEvent): AuctionStarted0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("AuctionStarted(bytes32,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        hash: result[0],
        registrationDate: result[1],
      };
    },
  },
  "NewBid(bytes32,address,uint256)": {
    topic: abi.getEventTopic("NewBid(bytes32,address,uint256)"),
    decode(data: EvmEvent): NewBid0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("NewBid(bytes32,address,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        hash: result[0],
        bidder: result[1],
        deposit: result[2],
      };
    },
  },
  "BidRevealed(bytes32,address,uint256,uint8)": {
    topic: abi.getEventTopic("BidRevealed(bytes32,address,uint256,uint8)"),
    decode(data: EvmEvent): BidRevealed0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("BidRevealed(bytes32,address,uint256,uint8)"),
        data.data || "",
        data.topics
      );
      return {
        hash: result[0],
        owner: result[1],
        value: result[2],
        status: result[3],
      };
    },
  },
  "HashRegistered(bytes32,address,uint256,uint256)": {
    topic: abi.getEventTopic("HashRegistered(bytes32,address,uint256,uint256)"),
    decode(data: EvmEvent): HashRegistered0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("HashRegistered(bytes32,address,uint256,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        hash: result[0],
        owner: result[1],
        value: result[2],
        registrationDate: result[3],
      };
    },
  },
  "HashReleased(bytes32,uint256)": {
    topic: abi.getEventTopic("HashReleased(bytes32,uint256)"),
    decode(data: EvmEvent): HashReleased0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("HashReleased(bytes32,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        hash: result[0],
        value: result[1],
      };
    },
  },
  "HashInvalidated(bytes32,string,uint256,uint256)": {
    topic: abi.getEventTopic("HashInvalidated(bytes32,string,uint256,uint256)"),
    decode(data: EvmEvent): HashInvalidated0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("HashInvalidated(bytes32,string,uint256,uint256)"),
        data.data || "",
        data.topics
      );
      return {
        hash: result[0],
        name: result[1],
        value: result[2],
        registrationDate: result[3],
      };
    },
  },
};

function getJsonAbi(): any {
  return [
    {
      constant: false,
      inputs: [
        {
          name: "_hash",
          type: "bytes32",
        },
      ],
      name: "releaseDeed",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_hash",
          type: "bytes32",
        },
      ],
      name: "getAllowedTime",
      outputs: [
        {
          name: "timestamp",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "unhashedName",
          type: "string",
        },
      ],
      name: "invalidateName",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "hash",
          type: "bytes32",
        },
        {
          name: "owner",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "salt",
          type: "bytes32",
        },
      ],
      name: "shaBid",
      outputs: [
        {
          name: "sealedBid",
          type: "bytes32",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "bidder",
          type: "address",
        },
        {
          name: "seal",
          type: "bytes32",
        },
      ],
      name: "cancelBid",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_hash",
          type: "bytes32",
        },
      ],
      name: "entries",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
        {
          name: "",
          type: "address",
        },
        {
          name: "",
          type: "uint256",
        },
        {
          name: "",
          type: "uint256",
        },
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
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
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_hash",
          type: "bytes32",
        },
        {
          name: "_value",
          type: "uint256",
        },
        {
          name: "_salt",
          type: "bytes32",
        },
      ],
      name: "unsealBid",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_hash",
          type: "bytes32",
        },
      ],
      name: "transferRegistrars",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "address",
        },
        {
          name: "",
          type: "bytes32",
        },
      ],
      name: "sealedBids",
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
          name: "_hash",
          type: "bytes32",
        },
      ],
      name: "state",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_hash",
          type: "bytes32",
        },
        {
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transfer",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_hash",
          type: "bytes32",
        },
        {
          name: "_timestamp",
          type: "uint256",
        },
      ],
      name: "isAllowed",
      outputs: [
        {
          name: "allowed",
          type: "bool",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_hash",
          type: "bytes32",
        },
      ],
      name: "finalizeAuction",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "registryStarted",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "launchLength",
      outputs: [
        {
          name: "",
          type: "uint32",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "sealedBid",
          type: "bytes32",
        },
      ],
      name: "newBid",
      outputs: [],
      payable: true,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "labels",
          type: "bytes32[]",
        },
      ],
      name: "eraseNode",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_hashes",
          type: "bytes32[]",
        },
      ],
      name: "startAuctions",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "hash",
          type: "bytes32",
        },
        {
          name: "deed",
          type: "address",
        },
        {
          name: "registrationDate",
          type: "uint256",
        },
      ],
      name: "acceptRegistrarTransfer",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_hash",
          type: "bytes32",
        },
      ],
      name: "startAuction",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "rootNode",
      outputs: [
        {
          name: "",
          type: "bytes32",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "hashes",
          type: "bytes32[]",
        },
        {
          name: "sealedBid",
          type: "bytes32",
        },
      ],
      name: "startAuctionsAndBid",
      outputs: [],
      payable: true,
      type: "function",
    },
    {
      inputs: [
        {
          name: "_ens",
          type: "address",
        },
        {
          name: "_rootNode",
          type: "bytes32",
        },
        {
          name: "_startDate",
          type: "uint256",
        },
      ],
      payable: false,
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "hash",
          type: "bytes32",
        },
        {
          indexed: false,
          name: "registrationDate",
          type: "uint256",
        },
      ],
      name: "AuctionStarted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "hash",
          type: "bytes32",
        },
        {
          indexed: true,
          name: "bidder",
          type: "address",
        },
        {
          indexed: false,
          name: "deposit",
          type: "uint256",
        },
      ],
      name: "NewBid",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "hash",
          type: "bytes32",
        },
        {
          indexed: true,
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          name: "value",
          type: "uint256",
        },
        {
          indexed: false,
          name: "status",
          type: "uint8",
        },
      ],
      name: "BidRevealed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "hash",
          type: "bytes32",
        },
        {
          indexed: true,
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          name: "value",
          type: "uint256",
        },
        {
          indexed: false,
          name: "registrationDate",
          type: "uint256",
        },
      ],
      name: "HashRegistered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "hash",
          type: "bytes32",
        },
        {
          indexed: false,
          name: "value",
          type: "uint256",
        },
      ],
      name: "HashReleased",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "hash",
          type: "bytes32",
        },
        {
          indexed: true,
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          name: "value",
          type: "uint256",
        },
        {
          indexed: false,
          name: "registrationDate",
          type: "uint256",
        },
      ],
      name: "HashInvalidated",
      type: "event",
    },
  ];
}
