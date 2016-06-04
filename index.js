"use strict";

const restify = require('restify');
const expressValidator = require('express-validator');
const fs = require('fs');

const Match = require('fcstats-persistence').Match;
const Season = require('fcstats-persistence').Season;
const persistence = require('fcstats-persistence').lib;

let db;
persistence.loadDatabase('./node_modules/fcstats-dbimporter/out/fcstats0_5.json').then((database) => {
  db = database;
});

const server = restify.createServer({
  name: 'fcstats-rest-server',
  version: '3.0.0'
});
server.use(restify.acceptParser(server.acceptable));
if (process.env !== 'production') {
  server.use(
    function crossOrigin(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      return next();
    }
  );
}
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(expressValidator());

server.get('/api/matches/:leagueName/:seasonYear', function (req, res, next) {
  const year = Number.parseInt(req.params.seasonYear);
  const league = req.params.leagueName;

  const matches = Match.get(persistence.getTable(db, 'matches')).findByYearAndLeague(year, league);

  res.send(matches);

  return next();
});

server.post('/api/feedback', function (req, res, next) {
  req.assert('email', 'valid email required').isEmail();
  req.sanitize('body').escape().trim();
  req.assert('body').notEmpty();

  var errors = req.validationErrors(true);

  if (errors){
    res.send(400);
  } else {
    fs.appendFile('/home/feedback.txt', 'email=' + req.params.email + ', body='+ req.params.body + '\\r\\n', 'utf8', (err) => {
      if (err) {
        console.log('Failed to save feedback, err=' + err);
      } else {
        console.log('New feedback from ' + req.params.email);
      };
    });

    res.send(200);
    next();
  }
})

server.get('/api/seasons/:leagueName', (req, res, next) => {
  const league = req.params.leagueName;

  const seasons = Season.get(persistence.getTable(db, 'matches')).findByLeague(league);

  res.send(seasons);

  return next();
});

server.listen(7216, function () {
  console.log('%s listening at %s', server.name, server.url);
});
