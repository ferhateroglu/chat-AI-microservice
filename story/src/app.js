const express = require('express');
const cors  = require('cors');
const { story, storyEvents } = require('./api');
const HandleErrors = require('./utils/errorHandler')
const {JwtPolicy} = require("./utils")

module.exports = async (app) => {

    app.use(express.json({ limit: '2mb'}));
    app.use(express.urlencoded({ extended: true, limit: '2mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))
    app.use(JwtPolicy)

    //Listen to Events 
    storyEvents(app);

    //api
    story(app);

    // error handling
    app.use(HandleErrors);
    
}