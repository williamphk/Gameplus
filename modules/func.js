//MongoDB config
const { MongoClient, ObjectId } = require("mongodb");
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;
const client = new MongoClient(dbUrl);

const dbName = "gameplus";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  return "connected to MongoDB";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

async function getNewProducts() {
  await client.connect();
  const db = client.db(dbName);
  let results = db
    .collection("products")
    .find({})
    .sort({ releaseDate: -1 })
    .limit(4);
  res = await results.toArray();
  return res;
}

async function getAllProducts() {
  await client.connect();
  const db = client.db(dbName);
  let results = db.collection("products").find({}).sort({ releaseDate: -1 });
  res = await results.toArray();
  return res;
}

async function getProduct(id) {
  await client.connect();
  const db = client.db(dbName);
  let results = db.collection("products").findOne({ _id: new ObjectId(id) });
  return results;
}

module.exports = {
  getNewProducts,
  getAllProducts,
  getProduct,
};
