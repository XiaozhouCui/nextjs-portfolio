const ForumCategories = () => {
  return (
    <>
      {/* NAVBAR START */}
      <div className="navbar-wrapper">
        <nav className="navbar navbar-expand-lg navbar-dark jc-mw9">
          <a className="navbar-brand mr-3 font-weight-bold" href="#">
            Joe Cui
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item mr-3">
                <a className="nav-link" href="#">
                  Portfolio
                </a>
              </li>
              <li className="nav-item mr-3">
                <a className="nav-link" href="#">
                  Courses
                </a>
              </li>
              <li className="nav-item mr-3">
                <a className="nav-link" href="#">
                  Cv
                </a>
              </li>
              <li className="nav-item mr-3">
                <a className="nav-link" href="#">
                  Ask me
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-3">
                <a className="nav-link" href="#">
                  Sign Up
                </a>
              </li>
              <li className="nav-item mr-3">
                <a
                  className="nav-link btn btn-success bg-green-2 bright"
                  href="#"
                >
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* NAVBAR ENDS */}
      <div className="container">
        {/* FORUM CATEGORIES START */}
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>Categories</h1>
            </div>
          </div>
        </section>
        <section className="jc-category-list">
          <div className="row">
            <div className="col-md-4">
              <div className="jc-category-container">
                <a className="jc-category subtle-shadow no-border" href="#">
                  {
                    // <div className="category-icon">
                    //   <img src="images/pen.png" />
                    // </div>
                  }
                  <div className="category-information">
                    <div className="heading gray-90">General Discussion</div>
                    <div className="description">Just general question</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="jc-category-container">
                <a className="jc-category subtle-shadow no-border" href="#">
                  {
                    // <div className="category-icon">
                    //   <img src="images/pen.png" />
                    // </div>
                  }
                  <div className="category-information">
                    <div className="heading gray-90">Other Discussion</div>
                    <div className="description">Just general question</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="jc-category-container">
                <a className="jc-category subtle-shadow no-border" href="#">
                  {
                    // <div className="category-icon">
                    //   <img src="images/pen.png" />
                    // </div>
                  }
                  <div className="category-information">
                    <div className="heading gray-90">Some Discussion</div>
                    <div className="description">Just general question</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* FORUM CATEGORIES ENDS */}
      </div>
    </>
  );
};

export default ForumCategories;
