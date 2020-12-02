const express = require("express");
const next = require("next");

// following libraries have been replaced by apollo-server
// const { graphqlHTTP } = require("express-graphql");
// const { buildSchema } = require("graphql");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to DB
const db = require("./database");
db.connect();

app.prepare().then(() => {
  const server = express();

  // hook up express-session as a middleware
  require("./middlewares").init(server, db);

  // import apolloServer
  const apolloServer = require("./graphql").createApolloServer();

  // add apolloServer as Express middleware
  // all request sent to "/graphql" will be handled by apollo
  apolloServer.applyMiddleware({ app: server });

  // route all other requests to next.js handler
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
