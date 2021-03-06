const express = require('express');
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const expressValidator = require('express-validator');

const posts = require('./controllers/posts.js');
const comments = require('./controllers/comments-controller.js');
const auth = require('./controllers/auth.js');
const replies = require('./controllers/replies.js');

const app = express();

const checkAuth = (req, res, next) => {
    console.log('Checking authentication');
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null){
        req.user = null;
    }else{
        let token = req.cookies.nToken;
        let decodedToken = jwt.decode(token, {complete: true}) || {};
        req.user = decodedToken.payload;
    }

    console.log(req.user);
    next();
};

const displayAuth = (req,res,next)=>{
    const adminPath = ['/admin'];
    const insecurePath = ['/','/sign-up','/login'];
    let _ = require('underscore');
    if (req.user || _.contains(insecurePath, req.path)){
        console.log("authenticated");
        if (req.user && !req.user.isAdmin && _.contains(adminPath, req.path)){
            console.log("UNAUTHORIZED");
            return res.send('UNAUTHORIZED').status(403);
        }else{
            return next();
        }
    }else{
        console.log("UNAUTHENTICATED");
        return res.status(401).send('UNAUTHENTICATED');
    }
    next();
}

const displayAuthorization = (req,res,next)=>{
    const adminPath = ['/admin'];
    let _ = require('underscore');
    if (req.user.isAdmin && _.contains(adminPath, req.path)){
        console.log("authorized");
        return next();
    }else{
        console.log("UNAUTHORIZED");
        return res.status(401).send('UNAUTHENTICATED');
    }
    next();
}

const renderUser = function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
};

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone', { useMongoClient: true });
require('./data/reddit-db');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(expressValidator());
app.use(checkAuth);
app.use(displayAuth);
// app.use(displayAuthorization);
app.use(renderUser);

posts(app);
comments(app);
auth(app);
replies(app);

module.exports = app;
