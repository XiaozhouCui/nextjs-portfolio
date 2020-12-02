const GraphqlStrategy = require("./strategies");
const User = require("../../database/models/user");

// register passport middleware
exports.init = (passport) => {
  // 'graphql' is the name of strategy
  passport.use(
    "graphql",
    // options: email and password
    new GraphqlStrategy(({ email }, done) => {
      // console.log("Calling verify function of strategy");
      // Find user in DB, if user exists, verify user password
      User.findOne({ email }, (error, user) => {
        if (error) return done(error);
        // first param of done is reserved for "error", second param for "user"
        if (!user) return done(null, false);

        // TO DO: CHECK USER PASSWORD

        // If user is verified, call "done"
        return done(null, user);
      });
    })
  );
};
