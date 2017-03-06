var express = require('express');
var bodyParser = require('body-parser');
var $ = require('jquery');


var app = express();
module.exports = app;

app.use( bodyParser.json() );


var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  }
});


app.post('/repos/import', function (req, res) {
  // TODO

  console.log('hey i\'m trying to post here')
});


app.get('/repos', function (req, res) {
  // TODO
});


app.get('/', function (req, res) {
  res.sendFile('/Users/james/Documents/hratx25-fullstack-exercise/client/index.html')
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
