const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    balance: Number,
    image: String
});

module.exports = mongoose.model('User', UserSchema);