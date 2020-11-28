import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_PORTFOLIO } from "@/apollo/queries";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";

// HOOKS
const PortfolioDetail = ({ query }) => {
  // // with Hooks, we no longer need "getInitialProps" to get query.id
  // const router = useRouter();
  // // "id" in router.query.id comes from filename [id].jsx
  // const { id } = router.query;

  const [portfolio, setPortfolio] = useState(null);

  // const { loading, error, data } = useQuery(GET_PORTFOLIO, {
  //   variables: { id: query.id },
  // });

  const [getPortfolio, { loading, data }] = useLazyQuery(GET_PORTFOLIO);

  useEffect(() => {
    getPortfolio({ variables: { id: query.id } });
  }, []);

  if (data && !portfolio) {
    setPortfolio(data.portfolio);
  }

  if (loading || !portfolio) return "Loading...";

  // const portfolio = (data && data.portfolio) || {};

  return (
    <div className="portfolio-detail">
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">{portfolio.title}</h1>
          <p className="lead">{portfolio.jobTitle}</p>
          <p>
            <a
              className="btn btn-lg btn-success"
              href={portfolio.companyWebsite}
              role="button"
              target="_blank"
            >
              See Company
            </a>
          </p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Location</h4>
            <p className="text">{portfolio.location}</p>

            <h4 className="title">Start Date</h4>
            <p className="text">{portfolio.startDate}</p>
          </div>

          <div className="col-lg-6">
            {/* TODO: days later... */}
            <h4 className="title">Days</h4>
            <p className="text">88</p>

            <h4 className="title">End Date</h4>
            <p className="text">{portfolio.endDate}</p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{portfolio.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// const fetchPortfolioById = (id) => {
//   // gql variable $id
//   const query = `
//     query Portfolio ($id: ID) {
//       portfolio(id: $id) {
//         title
//         company
//         companyWebsite
//         location
//         jobTitle
//         description
//         startDate
//         endDate
//       }
//     }`;
//   // binding gql variable $id to the function's argument "id"
//   const variables = { id: id };
//   // GQL uses POST request, passing in query as payload
//   return axios
//     .post("http://localhost:3000/graphql", { query, variables })
//     .then(({ data: graph }) => graph.data.portfolio);
// };

PortfolioDetail.getInitialProps = async ({ query }) => {
  // const portfolio = await fetchPortfolioById(query.id);
  return { query };
};

export default withApollo(PortfolioDetail, { getDataFromTree });

// // CLASS COMPONENT
// export class PortfolioDetail extends Component {
//   // Called on the server
//   static getInitialProps({ query }) {
//     // What you return here will get into this.props
//     return { query, test: "Hello World", num: 4 + 4 };
//   }
//   render() {
//     const { query, test, num } = this.props;
//     return (
//       <div>
//         <h1>
//           I am Detail Page with ID: {query.id} {test} {num}
//         </h1>
//       </div>
//     );
//   }
// }
