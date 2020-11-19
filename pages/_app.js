import App from "next/app";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.scss";

import NavBar from "../components/shared/NavBar";
import Hero from "../components/shared/Hero";

// _app.js is responsible of rendering all other pages
// _app.js will get initial props to all other pages
// all route request will go through this file
function MyApp({ Component, pageProps }) {
  // console.log(Component); // show requested component in backend terminal

  const isHomePage = () => Component.name === "Home";

  return (
    <div className="portfolio-app">
      <NavBar />
      {isHomePage() && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>
      {isHomePage() && (
        <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
          <div className="container text-center">
            <small>Copyright &copy; Your Website</small>
          </div>
        </footer>
      )}
    </div>
  );
}

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
