var express = require('express')
var app = express()
var jwt=require("jsonwebtoken");

app.get('/', function (req, res) {
   res.json({message:"welcome to API"})
})

app.post("/post",verifyToken,(req,res)=>{
    jwt.verify(req.token,"secretAPIKEY",(err,authData)=>{
        if(err){
            res.status(404).json("no valid key")
        }
        else{
            res.json({message:"post done",authData})
        }

    })
    
})

app.post('/login',(req,res)=>{

    const user={
        id:1,
        username:"sumit",
        email:"sumitsaurabh15@gmail.com"

    }

    jwt.sign({user},"secretAPIKEY",{expiresIn:"30s"},(err,token)=>{
        res.json({
            token
        });
    });

   
     
 });


  //Verify the Api token
  function verifyToken(req,res,next){
    //get Auth header value
    const bearerHeader=req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader!=="undefined"){
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();

    }
    else{
        res.sendStatus(404);
    }
}


app.listen(3000, () => {
    console.log("connected to 3000");
})
// const APIChecker = (req, res, next) => {
//     req.headers =
//         console.log('an api is checked and passed');
//     next();
// };

// const post = (req, res) => {
//     res.status(200).json({ "message": "post called" });

// };











