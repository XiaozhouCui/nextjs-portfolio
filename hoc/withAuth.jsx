import Redirect from "../components/shared/Redirect";
import { useGetUser } from "../apollo/actions";

const WithAuth = (WrappedComponent) => (props) => {
  // get user
  const { data: { user } = {}, loading, error } = useGetUser({
    // request will always be executed, not checking cache
    fetchPolicy: "network-only",
  });

  // if we don't have a user, do the following
  if (!loading && (!user || error) && typeof window !== "undefined") {
    return <Redirect to="/login" />;
  }

  // if we have a user, return this HOC
  if (user) return <WrappedComponent {...props} />;

  // else, do this
  return <p>Authenticating...</p>;
};

export default WithAuth;
