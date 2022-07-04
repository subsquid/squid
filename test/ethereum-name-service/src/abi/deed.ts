import * as ethers from "ethers";

export const abi = new ethers.utils.Interface(getJsonAbi());

export interface OwnerChanged0Event {
  newOwner: string;
}

export interface DeedClosed0Event {}

export interface EvmEvent {
  data: string;
  topics: string[];
}

export const events = {
  "OwnerChanged(address)": {
    topic: abi.getEventTopic("OwnerChanged(address)"),
    decode(data: EvmEvent): OwnerChanged0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("OwnerChanged(address)"),
        data.data || "",
        data.topics
      );
      return {
        newOwner: result[0],
      };
    },
  },
  "DeedClosed()": {
    topic: abi.getEventTopic("DeedClosed()"),
    decode(data: EvmEvent): DeedClosed0Event {
      const result = abi.decodeEventLog(
        abi.getEvent("DeedClosed()"),
        data.data || "",
        data.topics
      );
      return {};
    },
  },
};

function getJsonAbi(): any {
  return [
    {
      constant: true,
      inputs: [],
      name: "creationDate",
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
      constant: false,
      inputs: [],
      name: "destroyDeed",
      outputs: [],
      payable: false,
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
      name: "setOwner",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "registrar",
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
      inputs: [],
      name: "value",
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
      name: "previousOwner",
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
      inputs: [],
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
          name: "newValue",
          type: "uint256",
        },
        {
          name: "throwOnFailure",
          type: "bool",
        },
      ],
      name: "setBalance",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "refundRatio",
          type: "uint256",
        },
      ],
      name: "closeDeed",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "newRegistrar",
          type: "address",
        },
      ],
      name: "setRegistrar",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      payable: true,
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnerChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [],
      name: "DeedClosed",
      type: "event",
    },
  ];
}
