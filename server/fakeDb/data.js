const mongoose = require("mongoose");
const moment = require("moment");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const portfolio1Id = mongoose.Types.ObjectId();
const portfolio2Id = mongoose.Types.ObjectId();
const portfolio3Id = mongoose.Types.ObjectId();
const portfolio4Id = mongoose.Types.ObjectId();

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
        "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png",
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
      _id: portfolio1Id,
      title: "Web Developer",
      company: "BPA Analytics",
      companyWebsite: "https://bpanz.com",
      location: "Brisbane, Australia",
      jobTitle: "eSurvey and Web Developer",
      description:
        "Develop, maintain and upgrade eSurveys for data collection. Develop new projects and features to facilitate data collection. Technology stack: React, Redux, TypeScript, Node/Express, MongoDB, SQL Server, Sass, AWS, Python, C#, VBS and many more.",
      startDate: "01/14/2019",
      user: user1Id,
    },
    {
      _id: portfolio2Id,
      title: "Web Developer",
      company: "JR Academy",
      companyWebsite: "https://jiangren.com.au",
      location: "Brisbane, Australia",
      jobTitle: "Full Stack Web Developer",
      description:
        "Working in an agile environment, I was involved in the development and maintenance of JR Academy’s official website and other products, mainly using Node.js (Keystone and koa), React (AntD) and Redux.",
      startDate: "11/01/2018",
      endDate: "01/14/2019",
      user: user1Id,
    },
    {
      _id: portfolio3Id,
      title: "Process Safety Engineer",
      company: "Huahai Safety Science",
      companyWebsite: "http://www.safsci.org/",
      location: "Beijing, China",
      jobTitle: "Process safety engineering",
      description:
        "Process safety analysis and risk management for oil refineries and chemical processing plants.",
      startDate: "01/15/2015",
      endDate: "02/01/2018",
      user: user1Id,
    },
    {
      _id: portfolio4Id,
      title: "Process Engineer",
      company: "Worley",
      companyWebsite: "https://www.worley.com/",
      location: "Beijing, Brisbane, Kuala Lumpur",
      jobTitle: "Process engineering design",
      description:
        "Process engineering design in the oil and gas industry. I worked in project-oriented and multi-disciplinary teams in China, Australia and Malaysia",
      startDate: "05/01/2011",
      endDate: "01/15/2015",
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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      forumCategory: forum1Id,
      user: user1Id,
    },
    {
      title: "How to learn Python",
      slug: "how-to-learn-python",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      forumCategory: forum1Id,
      user: user1Id,
    },
    {
      title: "How to learn C#",
      slug: "how-to-learn-c#",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
