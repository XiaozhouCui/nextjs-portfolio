import PortfolioForm from "@/components/forms/PortfolioForm";
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import { useCreatePortfolio } from "@/apollo/actions";
import { useRouter } from "next/router";

const PortfolioNew = () => {
  const [createPortfolio, { error }] = useCreatePortfolio();
  const router = useRouter();

  const errorMessage = (error) => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "Oops, something went wrong..."
    );
  };

  // argument "data" is the form data from react-hook-form
  const handleCreatePortfolio = async (data) => {
    await createPortfolio({ variables: data });
    router.push("/portfolios");
  };

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Create New Portfolio</h1>
            <PortfolioForm
              // argument "data" is the form input data from react-hook-form
              onSubmit={handleCreatePortfolio}
            />
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(withAuth(PortfolioNew, ["admin", "instructor"]));
