const { MongoClient } = require("mongodb");

module.exports = {
    selectedDb: {},
   async connect() {
        try {
            const client = await MongoClient.connect(process.env.MONGODB_CLUSTER); 
            this.selectedDb = client.db("password");
            console.log( this.selectedDb);
        } catch (err) {
            console.log(err);
        }
    }, 
};

