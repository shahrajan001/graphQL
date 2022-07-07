const graphql = require("graphql")
const _ = require("lodash")

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLID, 
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull } = graphql;

const Users = require('../models/users')
const Posts = require('../models/posts')

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLInt }, //cant use
        email: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostsCountType),
            resolve(parent,args){
                // return  _.filter(userPosts, { userId: parent.id })
                return Posts.find({userId: parent._id});
            }
        }
    })
})

const PostsCountType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        userId: { type: GraphQLID },
        commentsCount: { type: GraphQLInt },
        likesCount: { type: GraphQLInt },
        user: {
            type: userType,
            resolve(parent,args){
                // console.log(parent)
                // return  _.find(users, { id: parent.userId })
                return Users.findById(parent.userId);
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
                // return _.find(users, { id: args.id })
                return Users.findById(args.id);
            }
        },
        post: {
            type: PostsCountType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(userPosts, { id: args.id })
                return Posts.findById(args.id );
            }
        },
        users: {
            type: new GraphQLList(userType),
            resolve(parent, args) {
                return Users.find({})
            }    
        },
        posts: {
            type: new GraphQLList(PostsCountType),
            resolve(parent, args) {
                return Posts.find({})
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLInt) }, //cant use
                email: { type: new GraphQLNonNull(GraphQLString) },
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
            type: PostsCountType,
            args:{
                commentsCount: { type: GraphQLInt },
                likesCount: { type: GraphQLInt },
                userId: { type: new GraphQLNonNull(GraphQLID) },
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