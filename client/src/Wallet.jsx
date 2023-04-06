import server from "./server";
import { getPublicKey, sign, verify } from "ethereum-cryptography/secp256k1";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  setSig,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const privKey = evt.target.value;

    const publicKey = secp.getPublicKey(privateKey);
    const signature = await secp.sign("123", privKey);
    const isSigned = secp.verify(signature, messageHash, publicKey);

    setAddress(publicKey);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <>
      <div className="container wallet">
        <h1>Your Private Key</h1>
        <label>
          Private Key
          <input
            placeholder="Type in your private key and to sign message"
            value={privateKey}
            onChange={onChange}
          ></input>
        </label>
        <h3>Wallet Address: {address}</h3>
        <div className="balance">Balance: {balance}</div>
      </div>
    </>
  );
}

export default Wallet;
