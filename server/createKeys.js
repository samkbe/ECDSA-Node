const { utils, getPublicKey } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = toHex(utils.randomPrivateKey());
const publicKey = toHex(getPublicKey(privateKey));

console.log("PRIVATE KEY: ", privateKey);
console.log("PUBLIC KEY: ", publicKey);
