const { Strategy } = require("passport-strategy");

// Strategy get options (email, password) needed to authenticate user
// Strategy gets a callback function (verify) that will contain functionality to verify a user
// Strategy has to have "authenticate" function
// Strategy has access to "error", "fail" and "success" function
class GraphqlStrategy extends Strategy {
  constructor(verify) {
    super();
    // "verify" callback is inherited from passport-strategy, need super()
    if (!verify) throw new Error("Graphql strategy requires a verify callback");

    this.verify = verify;
    this.name = "graphql";
  }

  // options: email and password
  authenticate(_, options) {
    console.log("Calling authenticate in strategy!");

    // in done we will receive "error", "user" (found from DB) and "info"
    const done = (error, user, info) => {
      // console.log("Calling done in authenticate callback.");
      // if user found, then call "this.success()" otherwise call "this.fail()" or "this.error()"
      if (error) return this.error(error); // this.error() inherited from passport-strategy
      if (!user) return this.fail(401);

      return this.success(user, info);
    };

    this.verify(options, done);
  }
}

module.exports = GraphqlStrategy;
