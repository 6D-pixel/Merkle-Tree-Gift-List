const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = root.toString('hex');

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const name = body.name;
  const index = niceList.findIndex(n => n===name);
  // TODO: prove that a name is in the list 
  const proof = merkleTree.getProof(index);
  const isInTheList = verifyProof(proof,name,root);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
