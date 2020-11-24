const express = require("express");
const next = require("next");

const { ApolloServer, gql } = require("apollo-server-express");

// following libraries are replaced by apollo-server
// const { graphqlHTTP } = require("express-graphql");
// const { buildSchema } = require("graphql");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// resolvers
const { portfolioQueries, portfolioMutations } = require("./graphql/resolvers");
// types
const { portfolioTypes } = require("./graphql/types");

app.prepare().then(() => {
  const server = express();

  // construct a schema, using graphql library's buildSchema() method
  // "!" means a property is NOT nullable
  // replace "buildSchema" with "gql"
  const typeDefs = gql(`
    ${portfolioTypes}

    type Query {
      hello: String
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
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

  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  // add apolloServer as Express middleware
  apolloServer.applyMiddleware({ app: server });

  // // GraphQL routes
  // server.use(
  //   "/graphql",
  //   graphqlHTTP({
  //     schema,
  //     rootValue: root,
  //     graphiql: true,
  //   })
  // );

  // route all other requests to next.js handler
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
