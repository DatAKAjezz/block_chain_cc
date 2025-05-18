const crypto = require("crypto");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.data) +
          this.previousHash
      )
      .digest("hex");
  }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, Date.now().toString(), "Genesis Block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash; // Corrected method name
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
           const current = this.chain[i];
           const previous = this.chain[i - 1]
           
           if (current.hash !== current.calculateHash()) return false;
           if (current.previousHash!== previous.hash) return false;

        }
        return true;
    }

}

const myCoin = new Blockchain();

myCoin.addBlock(new Block(1, Date.now().toString(), { from: "Alice", to: "Bob", amount: 10 }));
myCoin.addBlock(new Block(2, Date.now().toString(), { from: "Bob", to: "Charlie", amount: 5 }));

console.log(JSON.stringify(myCoin, null, 2));
console.log("Chuỗi hợp lệ?", myCoin.isChainValid());