// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/index.scss";

// this client is no longer needed as we use next-with-apollo
// const client = new ApolloClient({
//   uri: "http://localhost:3000/graphql",
//   cache: new InMemoryCache(),
// });

// _app.js is responsible of rendering all other pages
// _app.js will get initial props to all other pages
// all route request will go through this file
const MyApp = ({ Component, pageProps }) => {
  return (
    // <ApolloProvider client={client}>
    <Component {...pageProps} />
    // </ApolloProvider>
  );
};

// // getInitialProps is called on the server
// // if getInitialProps is added in _app.js, "static optimisation" is disabled for all pages
// MyApp.getInitialProps = async (context) => {
//   console.log("GET INITIAL PROPS _APP");
//   // App.getInitialProps() is an async func
//   const initialProps =
//     App.getInitialProps && (await App.getInitialProps(context));
//   // console.log(initialProps); // { pageProps: { (initial props of each page) } }
//   return {
//     pageProps: { appData: "Hello _App Component", ...initialProps.pageProps },
//   };
// };

export default MyApp;
