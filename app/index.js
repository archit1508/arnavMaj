const express = require('express');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const P2pServer = require('./p2p-server');
const mongoose = require('mongoose');

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

var arr=[]
, arr_b = [];
app.set('view engine', 'ejs');
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/arnavDB");

const bl = {
  inpData : String
};

const dataFeed = mongoose.model("dataFeed", bl);

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);

  p2pServer.syncChains();

  res.redirect('/blocks');
});

app.get("/ab",function(req,res){
  res.render("index");
});

app.post("/m2",function(req,res){
  const abcd = req.body.data2;
  console.log("yolo"+abcd);
  const block = bc.addBlock(req.body.data2);
  const bb = new dataFeed({inpData:abcd});
  bb.save().then(() => console.log('block saved ok'));;
  console.log(`New block added: ${block.toString()}`);
  p2pServer.syncChains();
  res.redirect('/blocks');
});

app.get("/mt", function(req,res){

  dataFeed.find({},function(err,dataFind){
    if(err){
      console.log(err);
    }
    else{
      dataFind.forEach(function(ele){
        let a = ele.inpData;
        arr.push(a);
      });
    }arr.forEach(function(dele){
      if(dele=="-17"){
        console.log("not ok");
      }
      else{
        console.log("ok");
      }
    });
  });

});


app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));
p2pServer.listen();
