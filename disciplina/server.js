const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// GraphQL schema language
// Há uma "entidade" denominada "Disciplina"
// que pode ser recuperada pelo seu identificador
const schema = buildSchema(`
"""
Disciplina de um curso
"""
type Disciplina {
    """
    Nome da disciplina
    """
    nome: String

    """
    Identificador único da disciplina
    """
    id: String!
}

type RootQueryType {
    disciplina(id: String): Disciplina
    total: Int
}

schema {
    query: RootQueryType
}
`);

// Apenas para acesso rápido aos dados
// Simula um SGBD ou serviço a ser utilizado
const disciplinas = [
  { id: "1", nome: "Português básico" },
  { id: "2", nome: "Matemática" },
];

// Resolver (função executada para o endpoint "recepcao")
const root = {
  disciplina: (args) => {
    return disciplinas.find((d) => d.id === args.id);
  },
  total: () => disciplinas.length,
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
