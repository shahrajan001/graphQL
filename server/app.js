const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const schema = require("./schema/schema");
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const connectionURL = 'mongodb://127.0.0.1:27017/graphQLbasics'
mongoose.connect(connectionURL, {
    useNewURLParser: true,
    // useCreateIndex: true
});

mongoose.connection.once('open',()=>{
    console.log("-----------mongoDB connection successful-----------")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log("Server is up on port " + port);
});