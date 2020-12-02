const passport = require("passport");

// options == { email, password }
const authenticateUser = (options) => {
  console.log("Calling authenticateUser");

  const done = () => {
    // Here we will get user if user is authenticated
    // If we can get user here, we will save session to DB
    console.log("Calling 'done' of authenticateUser");
  };

  // "graphql" is the name of strategy
  const authFn = passport.authenticate("graphql", options, done);
  authFn();

  return true;
};

exports.buildAuthContext = () => {
  const auth = {
    authenticate: (options) => authenticateUser(options),
  };

  return auth;
};
