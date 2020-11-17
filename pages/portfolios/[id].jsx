import React, { Component } from "react";
import { useRouter } from "next/router";

// // HOOKS
// const PortfolioDetail = () => {
//   // with Hooks, we no longer need "getInitialProps"
//   const router = useRouter();
//   // "id" in router.query.id comes from filename [id].jsx
//   const { id } = router.query;
//   return (
//     <div>
//       <h1>I am Detail Page with ID: {id}</h1>
//     </div>
//   );
// };

const PortfolioDetail = ({ query }) => {
  // "id" in router.query.id comes from filename [id].jsx
  const { id } = query;
  return (
    <div>
      <h1>I am Detail Page with ID: {id}</h1>
    </div>
  );
};
// getInitialProps will pass query into props
PortfolioDetail.getInitialProps = ({ query }) => {
  return { query };
};

export default PortfolioDetail;

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
