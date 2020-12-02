const passport = require("passport");

// options == { email, password }
const authenticateUser = (req, options) => {
  return new Promise((resolve, reject) => {
    // console.log("Calling authenticateUser");

    // "err" and "user" params come from strategies.authenticate()
    const done = (error, user) => {
      // console.log("Calling 'done' of authenticateUser");
      if (error) return reject(new Error(error));

      // Here we will get user if user is authenticated
      // If we can get user here, persist session to DB
      if (user) {
        // req.login() comes from the passport.initialize() middleware
        // req.login() will serialize user into session (using express-session) and save to DB
        req.login(user, (error) => {
          if (error) return reject(new Error(error));
          return resolve(user);
        });
      } else {
        return reject(new Error("Invalid email or password"));
      }
    };

    // "graphql" is the name of strategy
    const authFn = passport.authenticate("graphql", options, done);
    authFn();
  });
};

exports.buildAuthContext = (req) => {
  const auth = {
    authenticate: (options) => authenticateUser(req, options),
    // req.logout() comes from the passport.initialize() middleware
    logout: () => req.logout(), //  will remove the passport of session object on DB
    //req.isAuthenticated() comes from passport.initialize() middleware
    isAuthenticated: () => req.isAuthenticated(),
    // req.user comes from passport.session() middleware
    getUser: () => req.user,
  };

  return auth;
};
