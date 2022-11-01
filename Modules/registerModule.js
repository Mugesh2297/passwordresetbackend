const mongo = require("../connect");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");






exports.signup= async(req,res,next)=>{
 
try{
    //Email id Validation
  const existUser = await mongo.selectedDb.
  collection("users").findOne({email: req.body.email});
if(existUser) {
    return res.status(400).send({msg: "User Already Exists"});
}
//confirm password checking 

const isSamePassword = checkPassword(req.body.password, req.body.confirmPassword);
if(!isSamePassword)
    return res.status(400).send({msg:"Password doesn't match "});
else
 delete req.body.confirmPassword;    

//password hash  
const randomString = await bcrypt.genSalt(10);
req.body.password = await bcrypt.hash(req.body.password,randomString);

//Save in DB

const insertedResponse = await mongo.selectedDb.
collection("users").insertOne({...req.body});
res.send(insertedResponse);

}catch(err){password
console.error(err);
res.status(500).send(err);
}

};

const checkPassword = (password, confirmPassword)=>{
    return password!==confirmPassword? false : true;
}
exports.signin= async (req,res,next)=>{
    //req.body : Email and Password 
    //step1 : check Whether user already exists 

    try{
  const existUser = await mongo.selectedDb.collection("users").findOne({email: req.body.email});
  if(!existUser){
    return res.status(400).send({msg: "Your are not an Existing User, Please Sign up to continue", code: "Email"});
  } 
  //password check
  const isSamePassword = await bcrypt.compare 
  (req.body.password, existUser.password);

  if(!isSamePassword)
  return res.status(400).send({msg:"Password Incorrect", code: "Password"});

//Generate and Send token as a response 
//JWT token library 

const token = jwt.sign(existUser,process.env.SECRET_KEY, {expiresIn: "30m"});
res.send(token);

    }catch(err){

    }

};