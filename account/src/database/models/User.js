
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StorySchema = new Schema({
    title: {type: String},
    body: {type: String, },
    slug: {type: String, },
    fileKey: {type: String, },
    image: {type: String, },
},{
    timestamps: true
});

const UserSchema = new Schema({
    username:{type: String},
    email: {type: String, unique: true},
    password: String,
    score: Number,
    salt: String,
    role: { type: String, required: true, default:'user' },
    rights: { type: Array, of: String, required: true , default: "USER001"},
    image: {type: String},
    likes: {type: Array, of:StorySchema}
},{
    timestamps: true
});



module.exports =  mongoose.model('user', UserSchema);