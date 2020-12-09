import { useRouter } from "next/router";
import { toast } from "react-toastify";
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

  const handlePortfolioUpdate = async (data) => {
    try {
      const response = await updatePortfolio({ variables: { id, ...data } });
      if (response.errors && response.errors.length > 0)
        return toast.error("Update failed", { autoClose: 3000 });
      toast.success("Portfolio has been updated", { autoClose: 3000 });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
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
                // argument "data" of handlePortfolioUpdate is the formData from react-hook-form
                onSubmit={handlePortfolioUpdate}
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
