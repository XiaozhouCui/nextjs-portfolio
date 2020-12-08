import PortfolioForm from "@/components/forms/PortfolioForm";
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import { useCreatePortfolio } from "@/apollo/actions";
import { useRouter } from "next/router";
import BaseLayout from "@/layouts/BaseLayout";

const PortfolioNew = () => {
  // useMutation
  const [createPortfolio, { error }] = useCreatePortfolio();
  const router = useRouter();

  const errorMessage = (apolloError) => {
    return (
      (apolloError.graphQLErrors && apolloError.graphQLErrors[0].message) ||
      "Oops, something went wrong..."
    );
  };

  // argument "data" is the form data from react-hook-form
  const handleCreatePortfolio = async (data) => {
    // try/catch block will NOT catch GraphQL errors (always 200 OK)
    const response = await createPortfolio({ variables: data });
    if (response.errors) return console.log(response.errors[0]);
    router.push("/portfolios");
  };

  return (
    <BaseLayout>
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
    </BaseLayout>
  );
};

export default withApollo(withAuth(PortfolioNew, ["admin", "instructor"]));
