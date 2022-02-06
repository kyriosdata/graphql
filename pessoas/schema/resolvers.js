const axios = require("axios");

const resolvers = {

    pessoa : async ({ id }, context) => {
        console.log(id, context);
    }

}