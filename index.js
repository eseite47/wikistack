const express = require('express');
const app = express();
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const models = require('./models');
const routes = require('./routes');

//console.log("our db", Object.keys(models.db.models))

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render)

// models.User.sync({})
// .then(function(){
//     return models.Page.sync({})
// })
// .then(function(){
// app.listen('1337', () => console.log('listening on port 1337') );
// })
// .catch(console.error);

models.db.sync({})
.then(function(){
    app.listen('1337', () => console.log('listening on port 1337') );
})
.catch(console.error);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(volleyball);

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);
