import PortfolioCard from "@/components/portfolios/PortfolioCard";
import Link from "next/link";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import {
  GET_PORTFOLIOS,
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
} from "@/apollo/queries";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";

const Portfolios = () => {
  // Apollo Client hooks
  // const [getPortfolios, { loading, data }] = useLazyQuery(GET_PORTFOLIOS); // lazyquery to be used with useEffect.
  const { data } = useQuery(GET_PORTFOLIOS);

  // no need to pass in portfolio ID here, apollo can figure it out
  const [updatePortfolio] = useMutation(UPDATE_PORTFOLIO);

  const [deletePortfolio] = useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      const newPortfolios = portfolios.filter((p) => p._id !== deletePortfolio);
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: newPortfolios },
      });
    },
  });

  const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      // get old portfolios from cache
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      // add newly created portfolio into cache
      cache.writeQuery({
        query: GET_PORTFOLIOS, // re-run getPortfolios query
        data: { portfolios: [...portfolios, createPortfolio] },
      });
    },
  });

  const portfolios = (data && data.portfolios) || [];

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
                onClick={() =>
                  updatePortfolio({ variables: { id: portfolio._id } })
                }
              >
                Update Portfolio
              </button>
              <button
                className="btn btn-danger m-3"
                onClick={() =>
                  deletePortfolio({ variables: { id: portfolio._id } })
                }
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

export default withApollo(Portfolios, { getDataFromTree });
