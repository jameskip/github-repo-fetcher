var express = require('express');
var bodyParser = require('body-parser');
var $ = require('jquery');


var app = express();
module.exports = app;

app.use(express.static('client'))

app.use( bodyParser.json() );


var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  }
});


app.post('/repos/import', function (req, res, next) {
  // TODO: If repo already exists update star count: NO DUPLICATES
  req.body.forEach((current) => {
    var insert = {id: current.id, username: current.owner.login, reponame: current.name, stargazers: current.stargazers_count, ownerLink: current.owner.html_url, link: current.html_url}

    knex('repos').insert(insert)
    .then(function (req, res) {
      res.send(200);
    })
    .catch(function(err) {
      console.error(JSON.stringify(err));
    })

  })
});


app.get('/repos', function (req, res) {
  // TODO: knex to get top 25 repos by stars: checkout orderBy and limit
  knex('repos').orderBy('stargazers', 'desc').limit(25)
  .then(function(insert) {
    res.send(JSON.stringify(insert));
  })
});


app.get('/', function (req, res) {
  res.sendFile('/Users/james/Documents/hratx25-fullstack-exercise/client/index.html')
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
