const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");

// Configuração para desenvolvimento (propriedade graphiql com i abaixo)
// Visite a URL: http://localhost:4000/graphql

const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Listening...");
});
