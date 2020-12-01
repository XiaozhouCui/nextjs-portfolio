const express = require("express");
const next = require("next");

// following libraries are replaced by apollo-server
// const { graphqlHTTP } = require("express-graphql");
// const { buildSchema } = require("graphql");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to DB
require("./database").connect();

app.prepare().then(() => {
  const server = express();

  // import apolloServer
  const apolloServer = require("./graphql").createApolloServer();

  // add apolloServer as Express middleware
  // all request sent to "/graphql" will be handled by apollo
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
