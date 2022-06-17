const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const schema = require("./schema/schema");

const app = express();
const port = process.env.PORT || 3000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log("Server is up on port " + port);
});