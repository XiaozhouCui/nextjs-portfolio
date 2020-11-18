import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.scss";

import NavBar from "../components/shared/NavBar";
import Hero from "../components/shared/Hero";

// all route request will go through this page
function MyApp({ Component, pageProps }) {
  // console.log(Component); // show requested component in backend terminal
  return (
    <div className="portfolio-app">
      <NavBar />
      {Component.name === "Home" && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
