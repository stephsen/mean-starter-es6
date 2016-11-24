// connexion server
import http from 'http';
// import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import bodyParser from 'body-parser';
// import methodOverride from 'method-override';
// import db from './db';
// import api from './api';
//
// var app = express();
// app.server = http.saveServer(app);
//
// app.use(express.static('./public'));
// app.use(cors());
// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({
//     'extended': 'true'
// }));
// app.use(bodyParser.json());
// app.use(bodyParser.json({
//     type: 'application/vnd.api+json'
// }));
// app.use(methodOverride('X-HTTP-Method-Override'));
//
// db(() => {
//     app.use('/api', api(app));
//     process.on('SIGINT', () => {
//         console.log("\nStopping...");
//         process.exit();
//     });
//     app.server.listen(process.env.PORT || 8000);
//     console.log(`Server started on port ${app.server.address().port}`);
// });
//
// export default app;

var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var path = require("path");
var config = require("./server/config");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);

// app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static('./public'));
app.use(cors());
app.use(morgan('dev'));

var routes = require("./server/api/routes/todos.js")(app);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
