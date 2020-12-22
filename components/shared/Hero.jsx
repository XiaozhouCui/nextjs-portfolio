const Hero = () => {
  return (
    <section className="jc-hero">
      <div className="jc-hero-wrapper row">
        <div className="hero-left col-md-6">
          <h1 className="white hero-title">
            Hey I'm Joe. Experienced full stack developer
          </h1>
          <h2 className="white hero-subtitle">
            Check my portfolio and video tutorials
          </h2>
          <div className="button-container">
            <a
              href="https://joesdemosite.com"
              target="_blank"
              className="btn btn-main bg-blue ttu"
            >
              See my work
            </a>
          </div>
        </div>
        <div className="hero-right col-md-6">
          <div className="hero-image-container">
            <a className="grow hero-link">
              <img className="hero-image" src="/portrait.jpg"></img>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
