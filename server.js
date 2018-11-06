const express = require('express');
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const posts = require('./controllers/posts.js');
const comments = require('./controllers/comments-controller.js');
const auth = require('./controllers/auth.js');

const app = express();

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone', { useMongoClient: true });
require('./data/reddit-db');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// app.use(expressValidator());

posts(app);
comments(app);
auth(app);

module.exports = app;
