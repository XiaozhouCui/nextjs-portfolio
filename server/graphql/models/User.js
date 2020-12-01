class User {
  constructor(model) {
    this.Model = model;
  }

  signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error("Password must be the same as confirmation password!");
    }
    // return a promise
    return this.Model.create(signUpData);
  }

  signIn(signInData, ctx) {
    const isAuthenticated = ctx.authenticate(signInData); // returns a boolean

    if (isAuthenticated) {
      console.log("User is Authenticated");
    }
    return `Sign In Output!`;
  }

  signOut() {
    return "Signing Out...";
  }
}

module.exports = User;
