import { useEffect } from "react";
import { useRouter } from "next/router";
import withApollo from "../hoc/withApollo";
import { useSignOut } from "@/apollo/actions";

// "apollo" props comes from the withApollo wrapper (next-with-apollo)
const Logout = ({ apollo }) => {
  // useSignOut: useMutation(SIGN_OUT) from @apollo/client
  const [signOut] = useSignOut();
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      // after signout, remove the apollo store (cache)
      apollo.resetStore().then(() => router.push("/login"));
    });
  }, []);

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Logout</h1>
            <p>Signing out...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(Logout);
