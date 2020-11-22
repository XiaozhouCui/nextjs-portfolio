const express = require("express");
const next = require("next");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const data = {
  portfolios: [
    {
      _id: "6a09f09432fl",
      title: "Job in USA",
      content: "It was very nice experience",
      jobTitle: "Chef",
      daysOfExperience: 100,
      isCurrentlyEmployed: false,
    },
    {
      _id: "6a09f09432f3",
      title: "Job in Barcelona",
      content: "It was very funny experience",
      jobTitle: "Developer",
      isCurrentlyEmployed: true,
    },
    {
      _id: "6a09f09432f2",
      title: "Job in Germany",
      content: "It was very good!",
      jobTitle: "Manager",
      daysOfExperience: 30,
      isCurrentlyEmployed: true,
    },
  ],
};

app.prepare().then(() => {
  const server = express();

  // construct a schema, using GRAPHQL schema language
  // "_id: ID!" means it is NOT nullable
  const schema = buildSchema(`

    type Portfolio {
      _id: ID!
      title: String
      content: String
      jobTitle: String
      daysOfExperience: Int
      isCurrentlyEmployed: Boolean
    }

    type Query {
      hello: String
      portfolio: Portfolio
      portfolios: [Portfolio]
    }
  `);

  // root provides a resolver for each API endpoiint
  const root = {
    hello: () => {
      return "Hello World!";
    },
    portfolio: () => {
      return data.portfolios[0];
    },
    portfolios: () => {
      return data.portfolios;
    },
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
