const web3 = new web3(window.ethereum);
var account;
const CONTRACT_ADDR= "0xd9145CCE52D386f254917e481eB44e9943F39138";

const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_candidateName",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidateCount",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "getVoteCount",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contract = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDR);

document.addEventListener("DOMContentLoaded",()=>{
    if(window.ethereum){
        ethereum.request({method:"eth_requestAccounts"}).then((accounts)=>{
            account = accounts[0];
            console.log(account);
        });

    }
    else{
        console.log("please install metamask");

    }
    
    contract.methods.candidateCount().call().then((e)=>{
        for(var i=0;i<=e;i++){
            contract.methods.candidates(i).call().then((f)=>{
            document.getElementById(f.id).innerHTML=f.name;
            document.getElementById(`candidate${f.id} `).innerHTML=f.voteCount;
            });
        }
    })

});
