class User {
  constructor(model) {
    this.Model = model;
  }

  getAuthUser(ctx) {
    // "isAuthenticated" and "getUser" come from context "buildAuthContext"
    if (ctx.isAuthenticated) {
      return ctx.getUser();
    }
    return null;
  }

  signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error("Password must be the same as confirmation password!");
    }
    // return a promise
    return this.Model.create(signUpData);
  }

  // ctx comes from gql context "buildAuthContext"
  async signIn(signInData, ctx) {
    try {
      const user = await ctx.authenticate(signInData);
      // user follows the gql type "User"
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // ctx comes from gql context "buildAuthContext"
  signOut(ctx) {
    try {
      // console.log("BEFORE LOGOUT---------------");
      // console.log("is authenticated", ctx.isAuthenticated());
      // console.log("user", ctx.getUser());
      ctx.logout();
      // console.log("AFTER LOGOUT---------------");
      // console.log("is authenticated", ctx.isAuthenticated());
      // console.log("user", ctx.getUser());
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = User;
