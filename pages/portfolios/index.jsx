import axios from "axios";

const Portfolios = (props) => {
  const fetchPortfolios = () => {
    const query =
      "query Portfolios {portfolios {_id title company companyWebsite location jobTitle description}}";
    return axios.post("http://localhost:3000/graphql", { query });
  };

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button onClick={fetchPortfolios} className="btn btn-primary">
          Fetch Data
        </button>
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
    </>
  );
};

const apiCall = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ testingData: "Just some testing data" });
    }, 200);
  });
};

// Portfolios.getInitialProps = async () => {
//   console.log("GET INITIAL PROPS PORTFOLIO");
//   // page won't be rendered until apiCall() is resolved/rejected
//   const data = await apiCall();
//   return { ...data };
// };

export default Portfolios;
