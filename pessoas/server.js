const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

// Configuração para desenvolvimento
// (propriedade graphiql, observe o "i" em graphiql)
// Visite a URL: http://localhost:4000/graphql (sem "i")

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Aguardando na porta 4000 ...");
});
