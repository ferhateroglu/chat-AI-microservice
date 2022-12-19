const express = require('express');
const cors  = require('cors');
const { account, accountEvents } = require('./api');
const HandleErrors = require('./utils/errorHandler')

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //Listen to Events 
    accountEvents(app);

    //api
    account(app);

    // error handling
    app.use(HandleErrors);
    
}