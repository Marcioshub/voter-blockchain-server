const Blockchain = require("../Blockchain");
const express = require("express");
const router = express.Router();

const blockchain = new Blockchain(); // create blockchain

// return blockchain data
router.get("/blockchain", (req, res) => {
  res.json({
    blockchain: blockchain.chain
  });
});

// return blockchain size
router.get("/blockchainsize", (req, res) => {
  res.json({
    size: blockchain.chain.length - 1
  });
});

// return voters data
router.get("/voters", (req, res) => {
  res.json({
    voters: blockchain.voters
  });
});

// return voter size
router.get("/votersize", (req, res) => {
  res.json({
    size: blockchain.voters.length
  });
});

// submit a vote
router.post("/vote", (req, res) => {
  const { id, vote, secret } = req.body;

  if (vote === "turd" || vote === "douche") {
    // error checking
    if (id === undefined || vote === undefined || secret === undefined) {
      return res.status(400).json({
        message: "Sorry, you must enter all fields"
      });
    }

    if (req.body === {} || id === "" || vote === "" || secret === "") {
      return res.status(400).json({
        message: "Sorry, you must enter all fields"
      });
    }

    // add vote to blockchain
    if (blockchain.addVote(req.body)) {
      res.status(200).json({
        message: "you voted!"
      });
    } else {
      res.status(400).json({
        message: "Sorry, block rejected. Your ID has already been used."
      });
    }
  } else {
    return res.status(400).json({
      message: "Please pick one of the candidates"
    });
  }
});

module.exports = router;
