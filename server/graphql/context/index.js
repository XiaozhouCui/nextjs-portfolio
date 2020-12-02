const passport = require("passport");

// options == { email, password }
const authenticateUser = (options) => {
  return new Promise((resolve, reject) => {
    console.log("Calling authenticateUser");

    // "err" and "user" params come from strategies.authenticate()
    const done = (err, user) => {
      // Here we will get user if user is authenticated
      // If we can get user here, we will save session to DB
      // console.log("Calling 'done' of authenticateUser");
      if (err) return reject(new Error(err));
      if (user) return resolve(user);
    };

    // "graphql" is the name of strategy
    const authFn = passport.authenticate("graphql", options, done);
    authFn();
  });
};

exports.buildAuthContext = () => {
  const auth = {
    authenticate: (options) => authenticateUser(options),
  };

  return auth;
};
