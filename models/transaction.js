const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    type: String, 
    from: String,
    to: String,
    amount: Number,
    date: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);