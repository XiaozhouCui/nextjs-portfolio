const session = require("express-session");
const config = require("./config/dev");

exports.init = (server, db) => {
  // setup session options for express-session
  const sess = {
    name: "portfolio-session",
    secret: config.SESSION_SECRET,
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    store: db.initSessionStore(),
  };
  // add express-session as middleware
  server.use(session(sess));
};
