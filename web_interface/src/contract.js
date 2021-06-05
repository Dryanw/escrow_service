export const ESCROW_ADDRESS = '0xe982E462b094850F12AF94d21D470e21bE9D0E9C';

export const ESCROW_ABI = [
                          	{
                          		"inputs": [],
                          		"stateMutability": "nonpayable",
                          		"type": "constructor"
                          	},
                          	{
                          		"inputs": [],
                          		"name": "_fee",
                          		"outputs": [
                          			{
                          				"internalType": "uint256",
                          				"name": "",
                          				"type": "uint256"
                          			}
                          		],
                          		"stateMutability": "view",
                          		"type": "function"
                          	},
                          	{
                          		"inputs": [
                          			{
                          				"internalType": "uint8",
                          				"name": "status",
                          				"type": "uint8"
                          			}
                          		],
                          		"name": "checkCondition",
                          		"outputs": [
                          			{
                          				"internalType": "bool",
                          				"name": "",
                          				"type": "bool"
                          			}
                          		],
                          		"stateMutability": "view",
                          		"type": "function"
                          	},
                          	{
                          		"inputs": [
                          			{
                          				"internalType": "address",
                          				"name": "buyer",
                          				"type": "address"
                          			},
                          			{
                          				"internalType": "address",
                          				"name": "agent",
                          				"type": "address"
                          			},
                          			{
                          				"internalType": "uint256",
                          				"name": "price",
                          				"type": "uint256"
                          			},
                          			{
                          				"internalType": "uint8",
                          				"name": "condition",
                          				"type": "uint8"
                          			}
                          		],
                          		"name": "createTask",
                          		"outputs": [],
                          		"stateMutability": "nonpayable",
                          		"type": "function"
                          	},
                          	{
                          		"inputs": [],
                          		"name": "isFundReceived",
                          		"outputs": [
                          			{
                          				"internalType": "bool",
                          				"name": "",
                          				"type": "bool"
                          			}
                          		],
                          		"stateMutability": "view",
                          		"type": "function"
                          	},
                          	{
                          		"inputs": [
                          			{
                          				"internalType": "address",
                          				"name": "agent",
                          				"type": "address"
                          			}
                          		],
                          		"name": "register",
                          		"outputs": [],
                          		"stateMutability": "nonpayable",
                          		"type": "function"
                          	},
                          	{
                          		"inputs": [
                          			{
                          				"internalType": "bool",
                          				"name": "valid",
                          				"type": "bool"
                          			}
                          		],
                          		"name": "release",
                          		"outputs": [],
                          		"stateMutability": "payable",
                          		"type": "function"
                          	},
                          	{
                          		"stateMutability": "payable",
                          		"type": "receive"
                          	}
                          ];