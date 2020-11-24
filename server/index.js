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
      _id: "sad87da79",
      title: "Job in Netcentric",
      company: "Netcentric",
      companyWebsite: "www.google.com",
      location: "Spain, Barcelona",
      jobTitle: "Engineer",
      description: "Doing something, programing....",
      startDate: "01/01/2014",
      endDate: "01/01/2016",
    },
    {
      _id: "da789ad1",
      title: "Job in Siemens",
      company: "Siemens",
      companyWebsite: "www.google.com",
      location: "Slovakia, Kosice",
      jobTitle: "Software Engineer",
      description: "Responsoble for parsing framework for JSON medical data.",
      startDate: "01/01/2011",
      endDate: "01/01/2013",
    },
    {
      _id: "sadcxv9",
      title: "Work in USA",
      company: "WhoKnows",
      companyWebsite: "www.google.com",
      location: "USA, Montana",
      jobTitle: "Housekeeping",
      description: "So much responsibility....Overloaaaaaad",
      startDate: "01/01/2010",
      endDate: "01/01/2011",
    },
  ],
};

app.prepare().then(() => {
  const server = express();

  // construct a schema, using GRAPHQL schema language
  // "!" means a property is NOT nullable
  const schema = buildSchema(`

    type Portfolio {
      _id: ID,
      title: String
      company: String
      companyWebsite: String
      location: String
      jobTitle: String
      description: String
      startDate: String
      endDate: String
    }

    type Query {
      hello: String
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }
  `);

  // root provides a resolver for each API endpoiint
  const root = {
    hello: () => {
      return "Hello World!";
    },
    portfolio: ({ id }) => {
      const portfolio = data.portfolios.find((p) => p._id === id);
      return portfolio;
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
