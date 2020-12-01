const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const {
  portfolioQueries,
  portfolioMutations,
  userMutations,
} = require("./resolvers"); // resolvers
const { portfolioTypes } = require("./types"); // types
const Portfolio = require("./models/Portfolio"); // gql models
const User = require("./models/User");

exports.createApolloServer = () => {
  // construct a schema, using graphql library's buildSchema() method
  // "!" means a property is NOT nullable
  // replace "buildSchema" with "gql"
  const typeDefs = gql(`
    ${portfolioTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      signIn: String
      signUp: String
      signOut: String
    }
  `);

  // root provides a resolver for each API endpoiint
  const resolvers = {
    Query: {
      ...portfolioQueries,
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
    context: () => {
      return {
        models: {
          Portfolio: new Portfolio(mongoose.model("Portfolio")),
          User: new User(mongoose.model("User")),
        },
      };
    },
  });

  return apolloServer;
};
