const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;

// Configuration for development
// Direct you browser to localhost:4000/graphql

const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Listening...");
});
