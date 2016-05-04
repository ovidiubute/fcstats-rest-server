"use strict";

var restify = require('restify');
var MatchEntity = require('fcstats-persistence').models.match;

var server = restify.createServer({
  name: 'fcstats-rest-server',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.CORS({
  origins: ['https://footballstats.oviprojects.xyz', 'http://footballstats.oviprojects.xyz'],
  headers: [
    "authorization",
    "withcredentials",
    "x-requested-with",
    "x-forwarded-for",
    "x-real-ip",
    "x-customheader",
    "user-agent",
    "keep-alive",
    "host",
    "accept",
    "connection",
    "upgrade",
    "content-type",
    "dnt",
    "if-modified-since",
    "cache-control"
  ]
}));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.opts( /.*/, ( req, res ) => res.send( 204 ) )

server.get('/api/matches/:leagueName/:seasonYear', function (req, res, next) {

  MatchEntity
    .scan()
    .filterExpression('#s.yearStart = :y1 AND #s.yearEnd = :y2 AND #s.leagueName = :lg')
    .expressionAttributeNames({
      "#s": "season"
    })
    .expressionAttributeValues({
      ':y1': parseInt(req.params.seasonYear),
      ':y2': parseInt(req.params.seasonYear) + 1,
      ':lg': req.params.leagueName
    })
    .exec(function (err, result) {
      res.send(result.Items)
    });

  return next();
});

server.listen(7216, function () {
  console.log('%s listening at %s', server.name, server.url);
});
