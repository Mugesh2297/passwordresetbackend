const mongo = require("../connect");
const {ObjectId} = require("mongodb");


module.exports.getUser = async (req, res, next) => {
    try {
       const userData = await mongo.selectedDb.collection("users").find().toArray();
       res.send(userData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

module.exports.getUserById = async (req, res, next) => {
    const id = req.params.id;

    try {
       const userData = await mongo.selectedDb.collection("users").find({_id:ObjectId(id)}).toArray();
       res.send(userData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


module.exports.updateUser = async (req, res, next) => {
    const id = req.params.id;
    delete req.body.currentuser;

    try{
   const updateUser = await  mongo.selectedDb.collection("users").findOneAndUpdate({_id:ObjectId(id)},
   { $set: {...req.body}},
   {returnDocument: "after"});
   res.send(updateUser);
} catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};




module.exports.createUser = async (req, res, next) => {
    delete req.body.currentuser;

      try {
        const insertedResponse = await mongo.selectedDb.collection("users").insertOne(req.body);
        res.send(insertedResponse);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
module.exports.deleteUser = async (req, res, next) => {
   const id = req.params.id;
   try{
    const deletedData = await mongo.selectedDb.collection("users").remove({_id:ObjectId(id)});
    res.send(deletedData);
   }
   catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};