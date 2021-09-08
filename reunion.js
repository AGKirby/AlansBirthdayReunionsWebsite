var express = require('express');
// var mysql = require('./dbcon.js'); 

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static("public"));


app.get('/',function(req,res){
  var context = {};
  context.title = "Alan's Birthday Reunions"
  res.render('home', context)
});

app.get('/reunion',function(req,res){
  var context = {};
  context.title = "Alan's Birthday X (Year 10)"
  res.render('reunion', context)
});

app.get('/hunger-games',function(req,res){
  var context = {};  
  context.title = "The Hunger Games"
  res.render('hunger-games')
});

app.get('/betting',function(req,res){
  var context = {};
  context.title = "Betting"
  res.render('betting', context)
});

app.get('/bet-head-to-head',function(req,res){
  var context = {};
  context.title = "Betting"
  res.render('bet-head-to-head', context)
});

app.get('/bet-pool',function(req,res){
  var context = {};
  context.title = "Betting"
  res.render('bet-pool', context)
});


app.get('/history-ABC',function(req,res){
  var context = {};
  context.title = "Alan's Birthday Classic History"
  res.render('history-ABC', context)
});

app.get('/history-ABU',function(req,res){
  var context = {};
  context.title = "Alan's Birthday Ultimate History"
  res.render('history-ABU', context)
});

app.get('/history-ABR',function(req,res){
  var context = {};
  context.title = "Alan's Birthday Reunion History"
  res.render('history-ABR', context)
});

app.get('/history-Teams',function(req,res){
  var context = {};
  context.title = "Alan's Birthday Teams History"
  res.render('history-Teams', context)
});

app.get('/history-HG',function(req,res){
  var context = {};
  context.title = "Hunger Games History"
  res.render('history-HG', context)
});

app.get('/history-statistics',function(req,res){
  var context = {};
  context.title = "Alan's Birthday Statistics"
  res.render('history-statistics', context)
});


app.get('/alans-famous-quotes',function(req,res){
  var context = {};
  context.title = "Alan's Famous Quotes"
  res.render('alans-famous-quotes', context)
});

// app.get('/discord',function(req,res){
//   var context = {};
//   context.title = "Discord"
//   res.render('discord', context)
// });

app.get('/speedrace',function(req,res){
  var context = {};
  context.title = "Speedrace Fortnightly"
  res.render('speedrace', context)
});

app.get('/bracket-generator',function(req,res){
  var context = {};
  context.title = "Tournament Bracket Generator"
  res.render('bracket', context)
});

// app.get('/grand-council',function(req,res){
//   var context = {};
//   context.title = "Grand Council"
//   res.render('grand-council', context)
// });

// app.get('/account',function(req,res){
//   var context = {};
//   res.render('account', context)
// });


app.use(function(req,res){
  res.render('404', {})
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
