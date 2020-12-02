const passport = require("passport");

// options == { email, password }
const authenticateUser = (options) => {
  return new Promise((resolve, reject) => {
    // console.log("Calling authenticateUser");

    // "err" and "user" params come from strategies.authenticate()
    const done = (error, user) => {
      // console.log("Calling 'done' of authenticateUser");
      if (error) return reject(new Error(error));

      // Here we will get user if user is authenticated
      // If we can get user here, we will save session to DB
      if (user) {
        return resolve(user);
      } else {
        return reject(new Error("Invalid email or password"));
      }
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
