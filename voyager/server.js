const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const fs = require("fs");
const { exit } = require("process");

const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

let sdlSchema;

if (process.argv.length < 3) {
  console.log("Forneça arquivo contendo GraphQL Schema Language");
  exit(1);
}

try {
  // Carrega GraphQL SDL (único argumento fornecido)
  sdlSchema = fs.readFileSync(process.argv[2], {
    encoding: "utf8",
    flag: "r",
  });
} catch (error) {
  console.log(`Erro ao carregar o arquivo ${process.argv[2]}`);
  return;
}

const schema = buildSchema(sdlSchema);

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express();

app.use(connectLiveReload());

app.use(express.static(__dirname));
app.use(
  "/graphql",
  graphqlHTTP(() => ({ schema }))
);

app.listen(9091, function () {
  const port = this.address().port;
  console.log(`Exibindo ${process.argv[2]}`);
  console.log(`Iniciado em http://localhost:${port}/`);
});
