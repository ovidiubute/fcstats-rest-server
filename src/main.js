"use strict";

const restify = require('restify');
const Match = require('fcstats-persistence').Match;
const persistence = require('fcstats-persistence').lib;

let db;
const server = restify.createServer({
  name: 'fcstats-rest-server',
  version: '2.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use((req, res, next) => {
  persistence.loadDatabase('./node_modules/fcstats-dbimporter/out/fcstats0_4.json').then((database) => {
    db = database;
    next();
  })
});

server.get('/api/matches/:leagueName/:seasonYear', function (req, res, next) {
  console.log(db);
  const year = Number.parseInt(req.params.seasonYear);
  const league = req.params.leagueName;

  const matches = Match.get(persistence.getTable(db, 'matches')).findByYearAndLeague(year, league);

  res.send(matches);

  return next();
});

server.listen(7216, function () {
  console.log('%s listening at %s', server.name, server.url);
});
