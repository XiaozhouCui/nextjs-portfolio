import NavBar from "@/components/shared/NavBar";

const ForumCategories = () => {
  return (
    <>
      <NavBar />

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
