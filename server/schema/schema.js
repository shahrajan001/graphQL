const graphQL = require("graphql")

const { GraphQLObjectType, GraphQLString,GraphQLSchema } = graphql;

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                args.id

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});