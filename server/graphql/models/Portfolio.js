// Add a graphql abstract layer on top of Mongoose Models
class Portfolio {
  constructor(model, user) {
    this.Model = model; // mongoose model (Portfolio)
    this.user = user; // logged-in user (req.user from passport.session middleware)
    this.writeRights = ["admin", "instructor"]; // role authorisation
  }

  getAll() {
    return this.Model.find({});
  }

  getAllByUser() {
    return this.Model.find({ user: this.user._id }).sort({ startDate: "desc" });
  }

  getById(id) {
    return this.Model.findById(id);
  }

  create(data) {
    if (!this.user || !this.writeRights.includes(this.user.role)) {
      return new Error("Not Authorised!");
    }
    // persist logged-in user to DB
    data.user = this.user;
    return this.Model.create(data);
  }

  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  findAndDelete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }
}

module.exports = Portfolio;
