const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// GraphQL schema language (converte para maiúscula)
var schema = buildSchema(`
  type Query {
    maiuscula(entrada: String): String
  }
`);

// Resolver (função executada para o endpoint "recepcao")
const root = {
  maiuscula: (args) => {
    return args.entrada.toUpperCase();
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
