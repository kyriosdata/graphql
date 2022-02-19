import graphql from "graphql";

const { GraphQLSchema } = graphql;

import RootQueryType from "./root_query_type.js";
import mutations from "./mutations.js";

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});
