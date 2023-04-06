const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04832586656c85b8cb70758d4469fb7d824f9d332c1412864db880a20ba2a50bfed847e769019ce2dc397b840674229d9bd48c6eb2cfb53f815690a2804dd0dfce": 100,
  "04c508b9381d25c2b1b208a2ff014c7a86874eb4a2a08a9a7916b83d52b68d7ffeec8055848babeeb1ba33c8f299cf19482789cba0621e727a4db4fd30c9e9d0cc": 50,
  "046979b0f93564b3273a3b87ff92b76d33a0899d03ed3d584af995c28062f18da292da713cbcc86faf4102d82199cb38d86fed2018cf3862b4224e3b71988b3116": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
