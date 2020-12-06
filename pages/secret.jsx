import withApollo from "../hoc/withApollo";
import withAuth from "../hoc/withAuth";

const Secret = () => {
  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">SECRET</h1>
            <h2>SECRET PAGE, ONLY AUTHENTICATED USERS ALLOWED</h2>
          </div>
        </div>
      </div>
    </>
  );
};

// 2 layers of wrapper HOC
// only logged in "admin" user can view this page
export default withApollo(withAuth(Secret, ["admin"]));
