const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    name: String,
    phone: Number,
    email: String,
    id :String
});

module.exports = mongoose.model('Users', Users);