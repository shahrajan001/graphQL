const graphql = require("graphql")
const _ = require("lodash")

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema } = graphql;

const Users = require('../models/users')
const Posts = require('../models/posts')
// const users = [
//     {
//         name: 'Rajan shah',
//         phone: 7621982258,  //cant use
//         email: "shahrajan7621@gmail.com",
//         id: '2'
//     },
//     {
//         name: 'Shah Rajan',
//         phone: 8460038564,
//         email: "shahrajan001@gmail.com",
//         id: '1'
//     }
// ]

// const userPosts = [
//     {
//         likesCount: 54,
//         commentsCount: 12,
//         id: '2',
//         userId: '1'
//     },
//     {
//         likesCount: 108,
//         commentsCount: 8,
//         id: '1',
//         userId: '1'
//     },
//     {
//         likesCount: 1050,
//         commentsCount: 58,
//         id: '3',
//         userId: '2'
//     },

// ]


const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLInt }, //cant use
        email: { type: GraphQLString },
        posts: {
            type: new GraphQLList(dataCountType),
            resolve(parent,args){
                console.log(parent)
                return  _.filter(userPosts, { userId: parent.id })
            }
        }
    })
})

const dataCountType = new GraphQLObjectType({
    name: 'Data',
    fields: () => ({
        userId: { type: GraphQLID },
        commentsCount: { type: GraphQLInt },
        likesCount: { type: GraphQLInt },
        user: {
            type: userType,
            resolve(parent,args){
                console.log(parent)
                return  _.find(users, { id: parent.userId })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(users, { id: args.id })
            }
        },
        data: {
            type: dataCountType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(userPosts, { id: args.id })
            }
        },
        users: {
            type: new GraphQLList(userType),
            resolve(parent, args) {
                return users
            }    
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                name: { type: GraphQLString },
                phone: { type: GraphQLInt }, //cant use
                email: { type: GraphQLString },
            },
            resolve(parent, args){
                let user = new Users({
                    name: args.name,
                    phone: args.phone,
                    email: args.email
                });
                return user.save();
            }
        },
        addPost :{
            type: dataCountType,
            args:{
                commentsCount: { type: GraphQLInt },
                likesCount: { type: GraphQLInt },
                userId: { type: GraphQLID },
            },
            resolve(parent, args){
                let post = new Posts({
                    commentsCount: args.commentsCount,
                    likesCount: args.likesCount,
                    userId: args.userId,
                });
                return post.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});