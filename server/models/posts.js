const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    likesCount: Number,
    commentsCount: Number,
    id :String,
    userId: String
});

module.exports = mongoose.model('Posts', Post);