const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const {
  portfolioQueries,
  portfolioMutations,
  userQueries,
  userMutations,
  forumQueries,
} = require("./resolvers"); // resolvers
const { portfolioTypes, userTypes, forumTypes } = require("./types"); // types
const { buildAuthContext } = require("./context");

// gql models
const Portfolio = require("./models/Portfolio");
const User = require("./models/User");
const ForumCategory = require("./models/ForumCategory");
const Topic = require("./models/Topic");

exports.createApolloServer = () => {
  // construct a schema, using graphql library's buildSchema() method
  // "!" means a property is NOT nullable
  // replace "buildSchema" with "gql"
  const typeDefs = gql(`
    ${portfolioTypes}
    ${userTypes}
    ${forumTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
      userPortfolios: [Portfolio]

      user: User

      forumCategories: [ForumCategory]

      topicsByCategory(category: String): [Topic]
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: Boolean
    }
  `);

  // root provides a resolver for each API endpoiint
  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries,
      ...forumQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // bind gql models as context
    context: ({ req }) => {
      return {
        ...buildAuthContext(req), // returns the auth object {authenticate: ()=>{}}
        models: {
          // instanciate Portfolio class by passing in "model" and "user" args defined in constructor
          Portfolio: new Portfolio(mongoose.model("Portfolio"), req.user), // req.user is the logged-in user from passport.session middleware
          User: new User(mongoose.model("User")),
          ForumCategory: new ForumCategory(mongoose.model("ForumCategory")),
          Topic: new Topic(mongoose.model("Topic")),
        },
      };
    },
  });

  return apolloServer;
};
