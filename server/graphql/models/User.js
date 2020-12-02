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

  async signIn(signInData, ctx) {
    try {
      const user = await ctx.authenticate(signInData); // returns a boolean
      console.log(user);
      return `User: ${user.username}`;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  signOut() {
    return "Signing Out...";
  }
}

module.exports = User;
