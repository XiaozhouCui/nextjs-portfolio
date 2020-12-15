const slugify = require("slugify");
class Topic {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAllByCategory(forumCategory) {
    return this.Model.find({ forumCategory })
      .populate("user")
      .populate("forumCategory");
  }

  async create(topicData) {
    if (!this.user) {
      throw new Error("You need to authenticate to create a topic!");
    }

    topicData.user = this.user;
    // generate slug
    topicData.slug = slugify(topicData.title, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
    });

    // calling mongoose model to create data in DB
    const createdTopic = await this.Model.create(topicData);
    return this.Model.findById(createdTopic._id)
      .populate("user")
      .populate("forumCategory");
  }
}

module.exports = Topic;
