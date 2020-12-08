// Add a graphql abstract layer on top of Mongoose Models
class Portfolio {
  constructor(model, user) {
    // this.Model === Portfolio
    this.Model = model;
    this.user = user;
    this.writeRights = ["admin", "instructor"];
  }

  getAll() {
    return this.Model.find({});
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
