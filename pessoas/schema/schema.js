// UMA DAS FORMAS DE SE USAR GraphQL (schema) com JavaScript
// Veja opção usando GraphQL Schema Language em
// https://www.apollographql.com/blog/graphql/how-to-use-graphql-with-javascript-graphql-js-tutorial/

const axios = require("axios");
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull} = require("graphql");

const EmpresaType = new GraphQLObjectType({
    name: "Empresa",
    fields: () => ({
        id: {type: GraphQLString},
        nome: {type: GraphQLString},
        endereco: {type: GraphQLString},
        pessoas: {
            type: new GraphQLList(PessoaType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/empresas/${parentValue.id}/pessoas`)
                    .then(resposta => resposta.data);
            }
        }
    }),
});

const PessoaType = new GraphQLObjectType({
    name: "Pessoa",
    fields: () => ({
        id: {type: GraphQLString},
        nome: {type: GraphQLString},
        idade: {type: GraphQLInt},
        empresa: {
            type: EmpresaType,
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/empresas/${parentValue.empresaId}`)
                    .then((resposta) => resposta.data);
            },
        },
    }),
});

// Cada grafo é acompanhado da definição da raiz (root)
// (uma consulta que identifica a raiz, RootQuery)
// Precisamos identificar um nó de interesse no grafo
// (dê-me um 'id' e retorno um User)

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        pessoa: {
            type: PessoaType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/pessoas/${args.id}`)
                    .then((resposta) => resposta.data);
            },
        },

        pessoas: {
            type: new GraphQLList(PessoaType),
            resolve(parentValue, args) {
                return axios
                    .get("http://localhost:3000/pessoas")
                    .then(r => r.data);
            }
        },

        empresa: {
            type: EmpresaType,
            args: {
                id: {
                    type: GraphQLString,
                },
            },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/empresas/${args.id}`)
                    .then((resposta) => resposta.data);
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        adicionaPessoa: {
            type: PessoaType,
            args: {
                nome: {type: new GraphQLNonNull(GraphQLString)},
                idade: {type: new GraphQLNonNull(GraphQLInt)},
                empresaId: {type: GraphQLString}
            },
            resolve(parentValue, { nome, idade, empresaId }) {
                let novo = { nome, idade, empresaId };
                return axios.post("http://localhost:3000/pessoas", novo)
                    .then(resposta => resposta.data);
            }
        },

        removePessoa: {
            type: PessoaType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args) {
                return axios.delete(`http://localhost:3000/pessoas/${args.id}`)
                    .then(r => r.data);
            }
        },

        atualizaPessoa: {
            type: PessoaType,
            args : {
                id: { type: new GraphQLNonNull(GraphQLString)},
                nome: { type: GraphQLString},
                idade: { type: GraphQLInt},
                empresaId: { type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3000/pessoas/${args.id}`, args)
                    .then(r => r.data);
            }
        }
    }),
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});
