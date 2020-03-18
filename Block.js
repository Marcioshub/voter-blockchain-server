const crypto = require("crypto");

class Block {
  constructor(id, vote, secret, prev_hash) {
    this.id = id;
    this.vote = vote;
    this.secret = secret;
    this.prev_hash = prev_hash;
  }

  // only for the first block
  static GENESIS_BLOCK() {
    return {
      id: "GENESIS",
      vote: "GENESIS",
      prev_hash: "GENESIS"
    };
  }

  generate_block() {
    const hash = crypto.createHash("sha256");
    hash.update(
      JSON.stringify({
        id: this.id,
        vote: this.vote,
        secret: this.secret,
        prev_hash: this.prev_hash
      })
    );

    return {
      id: hash.digest("hex"),
      vote: this.vote,
      prev_hash: this.prev_hash
    };
  }
}

module.exports = Block;
