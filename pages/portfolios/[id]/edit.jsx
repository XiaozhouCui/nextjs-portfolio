import { useRouter } from "next/router";
import PortfolioForm from "@/components/forms/PortfolioForm";
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import BaseLayout from "@/layouts/BaseLayout";
import { useGetPortfolio } from "@/apollo/actions";

const PortfolioEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetPortfolio({ variables: { id } });

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
                onSubmit={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(PortfolioEdit, ["admin", "instructor"]));
