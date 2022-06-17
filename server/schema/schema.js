const graphql = require("graphql")

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const users = [
    {
        name: 'Rajan shah',
        phone: 7621982258,
        email: "shahrajan7621@gmail.com",
        id: '02'
    },
    {
        name: 'Shah Rajan',
        phone: 8460038564,
        email: "shahrajan001@gmail.com",
        id: '01'
    }
]
const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLInt },
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
                return users.findOne({id:args.id})

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});