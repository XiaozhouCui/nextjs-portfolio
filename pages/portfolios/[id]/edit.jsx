import { useRouter } from "next/router";
import PortfolioForm from "@/components/forms/PortfolioForm";
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import BaseLayout from "@/layouts/BaseLayout";
import { useGetPortfolio, useUpdatePortfolio } from "@/apollo/actions";

const PortfolioEdit = () => {
  const router = useRouter();
  const [updatePortfolio, { error }] = useUpdatePortfolio();
  const { id } = router.query;
  const { data } = useGetPortfolio({ variables: { id } });

  const errorMessage = (error) => {
    // console.log(JSON.stringify(error));
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "Oops, something went wrong..."
    );
  };

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Edit Portfolio</h1>
            {data && (
              <PortfolioForm
                initialData={data.portfolio}
                // argument "data" of onSubmit is the formData from react-hook-form
                onSubmit={(data) =>
                  updatePortfolio({ variables: { id, ...data } })
                }
              />
            )}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(PortfolioEdit, ["admin", "instructor"]));
