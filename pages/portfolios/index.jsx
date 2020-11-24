import axios from "axios";
import PortfolioCard from "@/components/portfolios/PortfolioCard";
import Link from "next/link";

const Portfolios = ({ portfolios }) => {
  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="col-md-4">
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const apiCall = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ testingData: "Just some testing data" });
    }, 2000);
  });
};

// once resolved, this function will return an array of portfolios
const fetchPortfolios = () => {
  // GQL query syntax
  const query = `
    query Portfolios {
      portfolios {
        _id
        title
        company
        companyWebsite
        location
        jobTitle
        description
        startDate
        endDate
      }
    }`;
  // GQL uses POST request, passing in query as payload
  return axios
    .post("http://localhost:3000/graphql", { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.portfolios);
};

Portfolios.getInitialProps = async () => {
  console.log("GET INITIAL PROPS PORTFOLIOS");
  // page won't be rendered until fetchPortfolios() is resolved/rejected
  const portfolios = await fetchPortfolios();
  return { portfolios };
};

export default Portfolios;
