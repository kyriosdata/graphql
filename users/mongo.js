const { MongoClient } = require("mongodb");

const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASSWORD;

const conta = `${user}:${pass}`;
const uri = `mongodb+srv://${conta}@tceduca-logs.sagyy.mongodb.net/tceduca-logs?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = await client.db("tceduca-logs");
    const logs = database.collection("users");
    const usuario = {
      id: "53",
      firstName: "fabio",
      age: 34,
    };

    const result = await logs.insertOne(usuario);

    console.log(result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
