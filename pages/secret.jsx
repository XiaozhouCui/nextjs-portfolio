import withApollo from "../hoc/withApollo";
import withAuth from "../hoc/withAuth";
import BaseLayout from "@/layouts/BaseLayout";

const Secret = () => {
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">SECRET</h1>
            <h2>SECRET PAGE, ONLY AUTHENTICATED USERS ALLOWED</h2>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

// 2 layers of wrapper HOC
// only logged in "admin" user can view this page
export default withApollo(withAuth(Secret, ["admin"]));
