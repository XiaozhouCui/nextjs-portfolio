class User {
  constructor(model) {
    this.Model = model;
  }

  signIn() {
    return "Signing In...";
  }

  signUp() {
    return "Signning Up... ";
  }

  signOut() {
    return "Signing Out...";
  }
}

module.exports = User;
