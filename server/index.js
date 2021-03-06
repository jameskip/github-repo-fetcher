var express = require('express');
var bodyParser = require('body-parser');
var $ = require('jquery');


var app = express();
module.exports = app;

app.use(express.static('client'));

app.use( bodyParser.json() );


var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  },
});


app.post('/repos/import', function (req, res) {
  req.body.forEach((current) => {
    var insert = {
      id: current.id,
      username: current.owner.login,
      reponame: current.name,
      stargazers: current.stargazers_count,
      ownerLink: current.owner.html_url,
      link: current.html_url
    };

    knex('repos').insert(insert)
    .then(function (req, res) {
    })
    .catch(function(err) {
      console.error(err);
    })

  })
});


app.get('/repos', function (req, res) {
  knex('repos').orderBy('stargazers', 'desc').limit(50)
  .then(function(insert) {
    res.send(JSON.stringify(insert));
  })
  .catch(function(error) {
    console.error(error);
  })
});


app.get('/', function (req, res) {
  res.sendFile('/Users/james/Documents/github-repo-fetcher/client/index.html')
});

app.get('/truncate', function(req, res) {
  knex('repos').truncate()
  .then(function() {
  })
})

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
