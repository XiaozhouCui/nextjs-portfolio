import BaseLayout from "@/layouts/BaseLayout";

const Home = () => (
  <BaseLayout page="Home">
    {/* HOME PAGE STARTS */}
    <section className="section-title">
      <div className="px-2">
        <div className="pt-5 pb-4">
          <h1>Portfolios</h1>
        </div>
      </div>
    </section>
    <section className="pb-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card subtle-shadow no-border">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text fs-2">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div className="card-footer no-border">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card subtle-shadow no-border">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text fs-2 ">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div className="card-footer no-border">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card subtle-shadow no-border">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text fs-2 ">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div className="card-footer no-border">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </div>
    </section>
    <a href="" className="btn btn-main bg-blue ttu">
      See More Portfolios
    </a>
    <section className="section-title">
      <div className="px-2">
        <div className="pt-5 pb-4">
          <h1>Ask Me</h1>
        </div>
      </div>
    </section>
    <section className="pb-5">
      <div className="list-group">
        <a
          href="#"
          className="list-group-item list-group-item-action flex-column align-items-start py-3 subtle-shadow no-border"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1 black">List group item heading</h5>
            <small>3 days ago</small>
          </div>
          <p className="mb-1">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
            eget risus varius blandit.
          </p>
          <div className="avatar-container my-2">
            <img
              src="https://via.placeholder.com/150"
              className="avatar-image mr-2"
            ></img>
            <span className="avatar-title">Joe Cui</span>
          </div>
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action flex-column align-items-start mt-3 py-3 subtle-shadow no-border"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1 black">List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="mb-1">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
            eget risus varius blandit.
          </p>
          <div className="avatar-container my-2">
            <img
              src="https://via.placeholder.com/150"
              className="avatar-image mr-2"
            ></img>
            <span className="avatar-title">Joe Cui</span>
          </div>
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action flex-column align-items-start mt-3 py-3 subtle-shadow no-border"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1 black">List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="mb-1">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
            eget risus varius blandit.
          </p>
          <div className="avatar-container my-2">
            <img
              src="https://via.placeholder.com/150"
              className="avatar-image mr-2"
            ></img>
            <span className="avatar-title">Joe Cui</span>
          </div>
        </a>
      </div>
    </section>
    <a href="" className="btn btn-main bg-blue ttu">
      See More Posts
    </a>
    {/* HOME PAGE ENDS */}
  </BaseLayout>
);

export default Home;
