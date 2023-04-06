import server from "./server";
import { getPublicKey, sign, verify } from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { sha256 } from "ethereum-cryptography/sha256";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  setSig,
  privateKey,
  setPrivateKey,
}) {
  async function submit(privKey) {
    const message = sha256(utf8ToBytes("Signing A Message for Verification!"));
    const publicKey = getPublicKey(privKey);
    const signature = await sign(message, privKey);
    const isSigned = verify(signature, message, publicKey);

    const hexPublicKey = toHex(publicKey);

    if (isSigned) {
      const {
        data: { balance },
      } = await server.get(`balance/${hexPublicKey}`);
      setBalance(balance);
      setAddress(hexPublicKey);
    }
  }

  return (
    <>
      <div className="container wallet">
        <h1>Your Private Key</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(privateKey);
          }}
        >
          <label>
            Private Key
            <input
              placeholder="Type in your private key and to sign message"
              value={privateKey}
              onChange={(e) => {
                setPrivateKey(e.target.value);
              }}
            ></input>
          </label>
          <button type="submit">Sign Message</button>
        </form>
        <h4>Wallet Address: {address.slice(0, 10) + "..."}</h4>
        <div className="balance">Balance: {balance}</div>
      </div>
    </>
  );
}

export default Wallet;
