const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// GraphQL schema language (consulta que retorna vetor de strings)
var schema = buildSchema(`
  type Query {
    recepcao: [String]
  }
`);

// Resolver (função executada para o endpoint "recepcao")
const root = {
  recepcao: () => {
    return ["Seja", "Bem-vindo!"];
  },
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => console.log("Aguardando na porta 4000..."));
