const SHA256 = require('crypto-js/sha256');
const fs = require('fs');
const alert = require('alert');
class Block {
    constructor(timestamp, lastHash, hash, data, chkvr) {
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;
      this.chkvr = data;
      console.log(this.chkvr);
      if (this.chkvr !="-17")
       {alert('Invalid Value');} 
      
      var Temp = data;
      if(Temp==-17) console.log("Valid");
      if(Temp!=-17) console.log("Invalid");
        fs.writeFile("temp.txt",Temp,(err)=>{
            if(err) console.log("Text Write Error");
        });
    }
    
    toString() {
        return `Block -
              Timestamp : ${this.timestamp}
              Last Hash : ${this.lastHash.substring(0, 10)}
              Hash      : ${this.hash.substring(0, 10)}
              Data      : ${this.data}`;
      }
    static genesis() {
        return new this('Genesis time', '-----', 'f1r57-h45h', []);
    }
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);
        return new this(timestamp, lastHash, hash, data);
    }
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
    static blockHash(block) {
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp, lastHash, data);
    }
    }
    module.exports = Block;
    