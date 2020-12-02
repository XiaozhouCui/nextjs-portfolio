const GraphqlStrategy = require("./strategies");

// register passport middleware
exports.init = (passport) => {
  // 'graphql' is the name of strategy
  passport.use(
    "graphql",
    // options: email and password
    new GraphqlStrategy((options, done) => {
      console.log("Calling verify function of strategy");
      // 1. Find user in DB and if user exists, verify user password
      // If user is verified, call "done"

      if (true) {
        // first param of done is reserved for "error", second param for "user"
        done();
      }
    })
  );
};
