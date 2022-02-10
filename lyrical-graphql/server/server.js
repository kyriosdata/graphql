const express = require("express");
const models = require("./models");
const {graphqlHTTP} = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("../webpack.config");

async function databaseMongoDB() {
    const USER = process.env.AZURE_MONGODB_USER;
    const PASS = process.env.AZURE_MONGODB_PASSWORD;

    const MONGO_URI = `mongodb://${USER}:${PASS}@admissao.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@admissao@`;
    if (!MONGO_URI) {
        throw new Error("You must provide a MongoLab URI");
    }

    mongoose.Promise = global.Promise;
    await mongoose.connect(MONGO_URI);
    console.log("Conexão com Azure Cosmos DB realizada")

    mongoose.connection
        .once("open", () => console.log("Conexão aberta com Azure Cosmos DB (MongoDB API)."))
        .on("error", (error) => console.log("Error connecting to MongoLab:", error));

}

const app = express();

databaseMongoDB().then(() => { console.log("databaseMongoDB"); return "ok"; });

app.use(bodyParser.json());
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.use(webpackMiddleware(webpack(webpackConfig)));


module.exports = app;
