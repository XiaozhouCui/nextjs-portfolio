const path = require("path");

const dev = process.env.NODE_ENV !== "production";

module.exports = {
  webpack: (config) => {
    // root folder is referred to as "@", absolute path made easy
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  env: {
    BASE_URL: dev
      ? "http://localhost:3000/graphql"
      : "https://next-gql-portfolio.herokuapp.com/graphql",
  },
};
