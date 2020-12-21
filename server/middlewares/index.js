const session = require("express-session");
const config = require("../config");
const passport = require("passport");

exports.init = (server, db) => {
  require("./passport").init(passport);

  // setup session options for express-session
  const sess = {
    name: "portfolio-session",
    secret: config.SESSION_SECRET,
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    store: db.initSessionStore(),
  };

  // prepare for deployment
  if (process.env.NODE_ENV === "production") {
    server.set("trust proxy", 1);
    sess.cookie.sucure = true;
    sess.cookie.httpOnly = true;
    sess.cookie.sameSite = true;
    // DOMAIN: .next-gql-portfolio.herokuapp.com
    sess.cookie.domain = process.env.DOMAIN;
  }

  // add express-session as middleware
  server.use(session(sess));

  // add passport middleware
  server.use(passport.initialize());

  // initialize user on req object (req.user)
  server.use(passport.session());
};
