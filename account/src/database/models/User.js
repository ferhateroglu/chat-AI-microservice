
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{type: String},
    email: {type: String, unique: true},
    password: String,
    salt: String,
    phone: String,
    role: { type: String, required: true, default:'user' },
    rights: { type: Array, of: String, required: true , default: "USER001"},
},{
    timestamps: true
});

module.exports =  mongoose.model('user', UserSchema);