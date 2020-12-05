const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const {
  portfolioQueries,
  portfolioMutations,
  userQueries,
  userMutations,
} = require("./resolvers"); // resolvers
const { portfolioTypes, userTypes } = require("./types"); // types
const Portfolio = require("./models/Portfolio"); // gql models
const User = require("./models/User");
const { buildAuthContext } = require("./context");

exports.createApolloServer = () => {
  // construct a schema, using graphql library's buildSchema() method
  // "!" means a property is NOT nullable
  // replace "buildSchema" with "gql"
  const typeDefs = gql(`
    ${portfolioTypes}
    ${userTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]

      user: User
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
          Portfolio: new Portfolio(mongoose.model("Portfolio")),
          User: new User(mongoose.model("User")),
        },
      };
    },
  });

  return apolloServer;
};
