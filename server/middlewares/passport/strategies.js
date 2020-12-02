const { Strategy } = require("passport-strategy");

// Strategy get options (email, password) needed to authenticate user
// Strategy gets a callback function (verify) that will contain functionality to verify a user
// Strategy has to have "authenticate" function
// Strategy has access to "error", "fail" and "success" function
class GraphqlStrategy extends Strategy {
  constructor(verify) {
    super();
    // "verify" callback is inherited from Strategy, need super()
    if (!verify) throw new Error("Graphql strategy requires a verify callback");

    this.verify = verify;
    this.name = "graphql";
  }

  // options: email and password
  authenticate(_, options) {
    console.log("Calling authenticate in strategy!");

    // in done we will receive "error", "user", "info"
    const done = () => {
      // console.log("Calling done in authenticate callback.");
      // if user then call "success" otherwise call "fail" or "error"
      if (true) {
        this.success("LoggedInUser");
        // this.error("Some nasty error");
      }
    };

    this.verify(options, done);
  }
}

module.exports = GraphqlStrategy;
