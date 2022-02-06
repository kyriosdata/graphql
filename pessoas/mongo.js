const { MongoClient } = require("mongodb");

// Defina variáveis de ambiente
// MONGODB_USER (usuário do mongodb)
// MONGODB_PASSWORD (senha do usuário do mongodb)
const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASSWORD;
const conta = `${user}:${pass}`;

const db = "tceduca-logs";
const host = "tceduca-logs.sagyy.mongodb.net";
const uri = `mongodb+srv://${conta}@${host}/${db}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = await client.db("tceduca-logs");
    const users = database.collection("users");
    const result = await users.find({}).toArray();
    console.log(result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
