const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {testConnection} = require('../helpers/connections_multi_mongodb.js');

const UseSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = testConnection.model('user', UseSchema);