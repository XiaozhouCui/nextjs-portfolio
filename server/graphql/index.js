const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const { portfolioQueries, portfolioMutations } = require("./resolvers"); // resolvers
const { portfolioTypes } = require("./types"); // types
const Portfolio = require("./models/Portfolio"); // gql models

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
    }
  `);

  // root provides a resolver for each API endpoiint
  const resolvers = {
    Query: {
      ...portfolioQueries,
    },
    Mutation: {
      ...portfolioMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // bind gql models as context
    context: () => {
      return {
        models: { Portfolio: new Portfolio(mongoose.model("Portfolio")) },
      };
    },
  });

  return apolloServer;
};
