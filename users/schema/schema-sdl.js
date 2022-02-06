const fs = require("fs");
const { buildSchema } = require("graphql");

const sdl = fs.readFileSync("./schema.graphql").toString();

module.exports = buildSchema(sdl);