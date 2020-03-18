const Block = require("./Block");
const crypto = require("crypto");

class Blockchain {
  constructor() {
    this.chain = [Block.GENESIS_BLOCK()];
    this.voters = []; // ss of people that already voted
  }

  addVote(blk) {
    // check if ss was already used, if used that mean they already
    // voted, or someone else used their ss to vote
    if (this.checkID(blk.id)) {
      return false;
    }

    const newblock = new Block(
      blk.id,
      blk.vote,
      blk.secret,
      this.chain[this.chain.length - 1].id
    );

    const hash = crypto.createHash("sha256");
    hash.update(JSON.stringify(newblock));

    // add to chain
    this.chain.push(newblock.generate_block());

    // add to voter chain
    this.voters.push(blk.id);

    return true;
  }

  checkID(id) {
    for (let i = 0; i < this.voters.length; i++) {
      if (this.voters[i] === id) {
        return true; // person already voted
      }
    }

    return false; // add new voter
  }
}

module.exports = Blockchain;
