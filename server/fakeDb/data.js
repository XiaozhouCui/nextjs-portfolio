const mongoose = require("mongoose");
const moment = require("moment");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const forum1Id = mongoose.Types.ObjectId();
const forum2Id = mongoose.Types.ObjectId();
const forum3Id = mongoose.Types.ObjectId();

const topic1Id = mongoose.Types.ObjectId();

const post1Id = mongoose.Types.ObjectId();
const post2Id = mongoose.Types.ObjectId();
const post3Id = mongoose.Types.ObjectId();
const post4Id = mongoose.Types.ObjectId();

const post1CreatedAt = moment().subtract(7, "days");
const post2CreatedAt = moment(post1CreatedAt).add(1, "days");
const post3CreatedAt = moment(post2CreatedAt).add(1, "days");
const post4CreatedAt = moment(post3CreatedAt).add(1, "days");

const data = {
  users: [
    {
      _id: user1Id,
      avatar:
        "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      email: "joe.cui@outlook.com",
      name: "Joe Cui",
      username: "Joe888",
      info: "Hello, I am Joe and I am a web developer",
      password: "123456",
      role: "admin",
    },
    {
      _id: user2Id,
      avatar:
        "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      email: "test1@asdf.com",
      name: "Tester1",
      username: "tester1",
      info: "Hello, I am a test user",
      password: "123456",
    },
  ],
  portfolios: [
    {
      title: "Job in Netcentric",
      company: "Netcentric",
      companyWebsite: "www.google.com",
      location: "Spain, Barcelona",
      jobTitle: "Engineer",
      description: "Doing something, programing....",
      startDate: "01/01/2014",
      endDate: "01/01/2016",
      user: user1Id,
    },
    {
      title: "Job in Siemens",
      company: "Siemens",
      companyWebsite: "www.google.com",
      location: "Slovakia, Kosice",
      jobTitle: "Software Engineer",
      description: "Responsoble for parsing framework for JSON medical data.",
      startDate: "01/01/2011",
      endDate: "01/01/2013",
      user: user1Id,
    },
    {
      title: "Work in USA",
      company: "WhoKnows",
      companyWebsite: "www.google.com",
      location: "USA, Montana",
      jobTitle: "Housekeeping",
      description: "So much responsibility....Overloaaaaaad",
      startDate: "01/01/2010",
      endDate: "01/01/2011",
      user: user1Id,
    },
  ],
  forumCategories: [
    {
      _id: forum1Id,
      title: "General Discussion",
      subTitle: "Open any topic you want",
      slug: "general-discussion",
    },
    {
      _id: forum2Id,
      title: "Job Requests",
      subTitle: "Post here job opportunities",
      slug: "job-requests",
    },
    {
      _id: forum3Id,
      title: "Developer Jokes",
      subTitle: "Just funny developing stuff",
      slug: "developer-jokes",
    },
  ],
  topics: [
    {
      _id: topic1Id,
      title: "How to learn JS",
      slug: "how-to-learn-js",
      content:
        "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1Id,
      user: user1Id,
    },
    {
      title: "How to learn JAVA",
      slug: "how-to-learn-java",
      content:
        "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1Id,
      user: user1Id,
    },
    {
      title: "How to learn C++",
      slug: "how-to-learn-c++",
      content:
        "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1Id,
      user: user1Id,
    },
  ],
  posts: [
    {
      _id: post1Id,
      content: "Hey there how are you ?",
      slug: "md43",
      fullSlug: post1CreatedAt.toISOString() + ":md43",
      topic: topic1Id,
      user: user1Id,
      createdAt: post1CreatedAt,
    },
    {
      _id: post2Id,
      content: "What do you think about this?",
      slug: "md59",
      fullSlug: post2CreatedAt.toISOString() + ":md59",
      topic: topic1Id,
      user: user2Id,
      createdAt: post2CreatedAt,
    },
    // post3 is a reply to post2
    {
      _id: post3Id,
      content: "I think its nice (:",
      slug: "md59/md79",
      fullSlug:
        post2CreatedAt.toISOString() +
        ":md59" +
        "/" +
        post3CreatedAt.toISOString() +
        ":md79",
      topic: topic1Id,
      user: user1Id,
      parent: post2Id,
      createdAt: post3CreatedAt,
    },
    // post4 is a reply to post3
    {
      _id: post4Id,
      content: "Good to hear that!",
      slug: "md59/md79/md89",
      fullSlug:
        post2CreatedAt.toISOString() +
        ":md59" +
        "/" +
        post3CreatedAt.toISOString() +
        ":md79" +
        "/" +
        post4CreatedAt.toISOString() +
        ":md89",
      topic: topic1Id,
      user: user2Id,
      parent: post3Id,
      createdAt: post4CreatedAt,
    },
  ],
};

module.exports = data;
