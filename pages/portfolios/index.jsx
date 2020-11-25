import { useState } from "react";
import axios from "axios";
import PortfolioCard from "@/components/portfolios/PortfolioCard";
import Link from "next/link";

const Portfolios = ({ data }) => {
  const [portfolios, setPortfolios] = useState(data.portfolios);

  const createPortfolio = async () => {
    const newPortfolio = await graphCreatePortfolio();
    const newPortfolios = [...portfolios, newPortfolio];
    setPortfolios(newPortfolios);
  };

  const updatePortfolio = async (id) => {
    const newPortfolio = await graphUpdatePortfolio(id);
    const newPortfolios = [...portfolios];
    const index = newPortfolios.findIndex((p) => p._id === id);
    if (index === -1) return alert("ID not found");
    newPortfolios[index] = newPortfolio;
    setPortfolios(newPortfolios);
  };

  const deletePortfolio = async (id) => {
    const deletedId = await graphDeletePortfolio(id);
    const newPortfolios = [...portfolios];
    const index = newPortfolios.findIndex((p) => p._id === deletedId);
    if (index === -1) return alert("ID not found");
    newPortfolios.splice(index, 1);
    setPortfolios(newPortfolios);
  };

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button onClick={createPortfolio} className="btn btn-primary m-3">
          Create Portfolio
        </button>
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
              <button
                className="btn btn-warning m-3"
                onClick={() => updatePortfolio(portfolio._id)}
              >
                Update Portfolio
              </button>
              <button
                className="btn btn-danger m-3"
                onClick={() => deletePortfolio(portfolio._id)}
              >
                Delete Portfolio
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
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
    .then((data) => data.portfolios); // return an array of portfolios
};

const graphCreatePortfolio = () => {
  const query = `
    mutation CreatePortfolio {
      createPortfolio(input: {
        title: "New Job",
        company: "New Company",
        companyWebsite: "New Website",
        location: "New Location",
        jobTitle: "New Job Title",
        description: "New Desc",
        startDate: "12/12/2012",
        endDate: "14/11/2013",
      }) {
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
    .then((data) => data.createPortfolio); // return created portfolio
};

const graphUpdatePortfolio = (id) => {
  const query = `
    mutation UpdatePortfolio {
      updatePortfolio(id: "${id}",input: {
        title: "Updated Job"
        endDate: "Present"
      }) {
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
    .then((data) => data.updatePortfolio); // return updated portfolio
};

const graphDeletePortfolio = (id) => {
  const query = `
    mutation DeletePortfolio {
      deletePortfolio(id: "${id}")
    }`;
  // GQL uses POST request, passing in query as payload
  return axios
    .post("http://localhost:3000/graphql", { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.deletePortfolio); // return the ID of deleted portfolio
};

Portfolios.getInitialProps = async () => {
  console.log("GET INITIAL PROPS PORTFOLIOS");
  // page won't be rendered until fetchPortfolios() is resolved/rejected
  const portfolios = await fetchPortfolios();
  return { data: { portfolios } };
};

export default Portfolios;
