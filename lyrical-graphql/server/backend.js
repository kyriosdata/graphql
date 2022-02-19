import express from "express";
import mongoose from "mongoose";
import {graphqlHTTP} from "express-graphql";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";

import schema from "./schema/esquema.js";
import webpackConfig from "../webpack.config.js";

async function databaseMongoDB() {
    const USER = process.env.AZURE_MONGODB_USER;
    const PASS = process.env.AZURE_MONGODB_PASSWORD;

    const MONGO_URI = `mongodb://${USER}:${PASS}@admissao.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@admissao@`;

    mongoose.Promise = global.Promise;
    await mongoose.connect(MONGO_URI);
    console.log("Conexão com Azure Cosmos DB realizada")

    mongoose.connection
        .once("open", () => console.log("Conexão aberta com Azure Cosmos DB (MongoDB API)."))
        .on("error", (error) => console.log("Error connecting to MongoLab:", error));

}

const app = express();

databaseMongoDB().then(() => { console.log("databaseMongoDB"); return "ok"; });

app.use(express.json());
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.use(webpackMiddleware(webpack(webpackConfig)));

export default app;