const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require("path");


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/procorterDB", {useNewUrlParser: true});

const articleSchema = {
  name: String,
  email: String,
  id:String,
  number:Number,
  image:String,
};

const Article = mongoose.model("Article", articleSchema);


app.get("/",(req,res)=>{
  res.sendFile("index.html", { root: "public/html" });
    console.log(__dirname)
})

app.post("/",(req,res)=>{
    const name= req.body.name;
    const email = req.body.email;
    const id = req.body.id;
    const number= req.body.number;

    // console.log(name,email,id,number);

    const newArticle = new Article({
      name: name,
      email: email,
      id:id,
      number:number,
    });

    newArticle.save(function(err){
      if (!err){
         res.redirect("/vdo");
        console.log("success");
      } else {
        res.send(err);
      }
    });
  })

  app.get("/vdo",(req,res)=>{
    res.sendFile("Examination.html", { root: "public/html" });
  })
  
  app.post('/data',(req,res)=>{
    const blob = req.body.blob;
    console.log(blob);
  })

  app.get("/thanks",(req,res)=>{
    res.sendFile("Thanks.html",{root:"public/html"});
  })

app.listen(9800, function() {
  console.log("Server started on port 9800");
});