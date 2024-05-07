const mongo = require("mongoose");
const mongoConn = async () => {
  try {
    mongo.set("strictQuery", false);
    const conn = await mongo.connect(
"mongodb+srv://justingilugali:EXcv5gWjIMhohW0w@janvier.nqj5ac2.mongodb.net/?retryWrites=true&w=majority&appName=janvier");
    console.log(`connectig to db ${conn.connection.host}`);
  } catch (error) {
    console.error("error connecting to db", error);
  }
};

module.exports = mongoConn;
