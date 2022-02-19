const { abi } = require('./abis/IERC721.json')
const ethers = require('ethers')

const provider = new ethers.providers.StaticJsonRpcProvider('https://mainnet.infura.io/v3/1a2431ca526c4e50a0a01f861e48642a')

module.exports = {
    ownerOf(token, tokenID){
        const IERC721 = new ethers.Contract(token, abi, provider)
        return IERC721.ownerOf(tokenID)
    }
}