const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {testConnection} = require('../helpers/connections_multi_mongodb.js');
const bcrypt = require('bcrypt');
const UseSchema = new Schema({
    email: {
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

UseSchema.pre('save', async function(next){
    try {
        console.log(`Called before save:::`, this.email, this.password);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
})
UseSchema.methods.isCheckPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        next(error);   
    }
}
module.exports = testConnection.model('user', UseSchema);