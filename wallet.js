const {Wallet} = require('ethers')
const decrypt = (keystoreStr, password) => {
    const wallet = Wallet.fromEncryptedJsonSync(keystoreStr, password);
    return wallet.privateKey;
}

const encrypt = async(privateKey, password) => {
    if(password.length < 6) throw "passwd too short";
    const wallet = new Wallet(privateKey);
    return wallet.encrypt(password); // json string
}

module.exports = {
    FromKeystore: (keystoreStr, password) => decrypt(keystoreStr, password),
    ToKeystore: (privateKey, password) => encrypt(privateKey, password)
}

