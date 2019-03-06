const compression = require('compression');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');
var User = require('./server/models').User;
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



const index = require('./server/routes/index');
const user = require('./server/routes/user');
const qq = require('./server/routes/qq');

const url = "https://xilo-qq-test.herokuapp.com";
const devUrl = "http://localhost:4200";

const app = express();

require('dotenv').config();

app.use(compression());
app.set('views', path.join(__dirname, './dist'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}, {limit: '50mb'}));
app.use(cookieParser());

app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin",  (process.env.NODE_ENV === 'production') ? url : devUrl);
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(function(req, res, next) {
  if (process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
      if(req.headers["x-forwarded-proto"] === "https"){
        return next();
      }
   return res.redirect('https://'+req.hostname+req.url);
  }
  return next();
});

app.use('/user', user);
app.use('/qq', qq);
app.get('/callback', async (req, res) => {
  const code = req.query.code;
  const options = {
    code
  };

  try {
    const result = await oauth2.authorizationCode.getToken(options);

    console.log('The resulting token: ', result);

    const token = oauth2.accessToken.create(result);

    return User.update({
      accessToken: token
    }).then(function(updatedUser) {
      return res.status(200).json({
        title: "Token stored successfull",
        obj: token
      });
    }).catch(function(error) {
      return res.status(400).json({
        message: "Issue Storing Token",
        error: error.stack
      });
    });
  } catch(error) {
    console.error('Access Token Error', error.message);
    return res.status(400).json({
      message: "Authentication Failed",
      error: error.stack
    });
  }
});
app.use('/', index);

app.use(express.static(path.join(__dirname, './dist')));

app.use('*', index);

module.exports = app;
