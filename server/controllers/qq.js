'use strict';
var jwt = require('jsonwebtoken');
var User = require('../models').User;
const simpleOauthModule = require('simple-oauth2');

const HOST = "https://login.qqcatalyst.com";
const AUTHORIZE_PATH = "/oauth/authorize"
const ACCESS_TOKEN_PATH = "/oauth/token"
const RESOURCE_URL = "https://api.qqcatalyst.com";
const CALLBACK_URL = "https://xilo-qq-test.herokuapp.com/callback";
const DEV_CALLBACK_URL = "http://localhost:3000/callback";

const oauth2 = simpleOauthModule.create({
  client: {
    id: "96935486-9f62-469a-9062-46cb5864b5b0",
    secret: "33c64f80-da90-45d3-bd11-a39912019d96",
  },
  auth: {
    tokenHost: HOST,
    tokenPath: ACCESS_TOKEN_PATH,
    authorizeHost: HOST,
    authorizePath: AUTHORIZE_PATH
  }
});

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: CALLBACK_URL,
  scope: '',
  state: '',
});

module.exports = {
  authorize: function authorize(req, res) {
    console.log(authorizationUri);
    return res.status(200).json(authorizationUri);
  }
};


