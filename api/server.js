const express = require("express");
const sessions = require("express-session");
const KnexSessionStore = require("connect-session-knex")(sessions);

const apiRouter = require("./api-router.js");
const configureMiddleware = require("./configure-middleware.js");
const knex = require("../data/dbConfig.js");

const server = express();

const sessionConfig = {
  name: "apple",
  secret: "kept secret, kept safe", // this would be an environment variable
  saveUninitialized: true,
  resave: false,
  store: new KnexSessionStore({
    knex,
    createTable: true,
    clearInterval: 1000 * 60 * 10, // clears the expired session
    sidFieldName: "sid",
    tablename: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  }
};

configureMiddleware(server);

server.use(sessions(sessionConfig)); // this adds req.session

server.use("/api", apiRouter);

module.exports = server;
