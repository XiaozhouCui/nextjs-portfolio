import withApollo from "next-with-apollo";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import moment from "moment";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: "include",
          },
          headers,
        });
      },
      uri: "http://localhost:3000/graphql",
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Portfolio: {
          // define custom fields on client side
          daysOfExperience(data, args, { cache }) {
            // "data" arg is the fetched data from server
            const { startDate, endDate } = data;
            let now = moment().unix();
            if (endDate) now = endDate / 1000;
            return moment.unix(now).diff(moment.unix(startDate / 1000), "days");
          },
        },
      },
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
