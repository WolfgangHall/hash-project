var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('hash_login_db', 'root');

var PORT = process.env.NODE_ENV || 3000;

var app = express();

var User = Sequelize.define('User',{
  username:{
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len:{
        args:[8]
      }
    }
  },
});

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.render('home');
})

app.post('/', function(req, res){
  Entry.create(req.body).then(function(entries){
    res.render('home',{ 
      entries: entries
    });
  });
});

sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("LISTNEING!");
  });
});