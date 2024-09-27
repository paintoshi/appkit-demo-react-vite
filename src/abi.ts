const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "getAllNFTs",
    outputs: [
      {
        internalType: "uint256[8]",
        name: "counts",
        type: "uint256[8]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]

export default abi
