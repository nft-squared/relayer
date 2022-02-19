const { getMessage } = require('eip-712');
const ethers = require('ethers')

const EIP712Domain = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' }
]
const Authorize = [
    { name: 'token', type: 'address' },
    { name: 'tokenID', type: 'uint256' },
    { name: 'targetChainID', type: 'uint256' },
    { name: 'targetIPPool', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    //{ name: 'deadline', type: 'uint256' }
]

const MessageType = {
    Authorize
}

module.exports = {
    verifyTypeData(primaryType, domain, message, signature) {
        const typedData = {
            types: {
                EIP712Domain,
                [primaryType]: MessageType[primaryType]
            },
            domain,
            primaryType,
            message
        }
        const digest = Buffer.from(getMessage(typedData, true)).toString('hex')
        const account = ethers.utils.recoverAddress(`0x${digest}`, {
            r: signature.slice(0, 2+(32*2)),
            s: `0x${signature.slice(2+(32*2), 2+(32*2)*2)}`,
            v: parseInt(signature.slice(-2), 16)
        })
        return account
    }
}
