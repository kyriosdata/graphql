const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

// Apenas para facilitar (conveniência)
// (em cenário real usa-se um SGBD, em geral)

const users = [
  { id: "23", firstName: "Bill", age: 20 },
  { id: "47", firstName: "Samantha", age: 21 },
];

// Define o esquema para o tipo (User)
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

// Para todo grafo é necessário definir a raiz (root)
// (uma consulta que identifica a raiz, RootQuery)
// Precisamos identificar um nó de interesse no grafo
// (dê-me um 'id' e retorno um User)

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parentValue, args) {
        // Retorna o primeiro usuário com o argumento fornecido
        return _.find(users, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
