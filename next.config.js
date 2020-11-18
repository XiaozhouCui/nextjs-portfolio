const path = require("path");

module.exports = {
  webpack: (config) => {
    // root folder is referred to as "@", absolute path made easy
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};
