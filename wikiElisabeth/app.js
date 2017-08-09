const express = require ('express');
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const nunjucks = require ('nunjucks');
const models = require ('./models');
const wiki = require ('./routes/wiki')
const user = require ('./routes/user')

const app = express();

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

app.use('/wiki', wiki);
app.use('/user', user);
app.get('/', function(req, res, next){
  res.render('index.html');
})

models.db.sync({force: true})
.then(function(){
  app.listen(4726, function(){
    console.log('Listening to port 4726');
  })
}).catch(console.error);

