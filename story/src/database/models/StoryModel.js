
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StorySchema = new Schema({
    title: {type: String, unique: true, required:true},
    body: {type: String, required:true},
    slug: {type: String, required: true, unique: true},
    fileKey: {type: String, unique: true, required:true},
},{
    timestamps: true
});

module.exports =  mongoose.model('story', StorySchema);