const express = require("express");
const next = require("next");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// resolvers
const { portfolioResolvers } = require("./graphql/resolvers");
// types
const { portfolioTypes } = require("./graphql/types");

app.prepare().then(() => {
  const server = express();

  // construct a schema, using GRAPHQL schema language
  // "!" means a property is NOT nullable
  const schema = buildSchema(`
    ${portfolioTypes}

    type Query {
      hello: String
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }
  `);

  // root provides a resolver for each API endpoiint
  const root = {
    ...portfolioResolvers,
  };

  // GraphQL routes
  server.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    })
  );

  // route all other requests to next.js handler
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
