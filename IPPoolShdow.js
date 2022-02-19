const { abi } = require('./abis/IPPoolShadow.json')
const addressRecord = require('./abis/record_test.json')
const ethers = require('ethers')
const { Wallet } = require('ethers')
const { FromKeystore } = require('./wallet')
const fs = require('fs')
const hmytestAddress = addressRecord['1666700000']
const provider = new ethers.providers.StaticJsonRpcProvider('https://api.s0.b.hmny.io')
const keystoreStr = fs.readFileSync(process.env.KEYSTORE)
const signer = new Wallet(FromKeystore(keystoreStr, process.env.PASSWD), provider)

const IPPoolShadow = new ethers.Contract(hmytestAddress.IPPoolShadows['4'], abi, signer)
async function IPAdd(token, tokenId, owner) {
    return IPPoolShadow.IPAdd(token, tokenId, owner)
    //return IPPoolShadow.callStatic.IPAdd(token, tokenId, owner)
}

let promise = Promise.resolve()
module.exports = {
    IPAddTask(token, tokenId, owner) {
        return new Promise((resolve, reject) => {
            promise = promise.then(
                () => IPAdd(token, tokenId, owner)
                    .then(tx => resolve({ hash: tx.hash }))
                    .catch(err => reject(new Error(err)))
            )
        })
    }
}