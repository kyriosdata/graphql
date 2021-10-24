const graphql = require("graphql");
const axios = require("axios");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

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
        // return _.find(users, { id: args.id });
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resposta) => resposta.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
