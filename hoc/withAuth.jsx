import Redirect from "../components/shared/Redirect";
import { useGetUser } from "../apollo/actions";

const WithAuth = (WrappedComponent, role) => (props) => {
  // get user
  const { data: { user } = {}, loading, error } = useGetUser({
    // request will always be executed, not checking cache
    fetchPolicy: "network-only",
  });

  // if we don't have a user, do the following
  if (!loading && (!user || error) && typeof window !== "undefined") {
    return <Redirect to="/login" />;
  }

  if (user) {
    // if we have a user, check if the user's role is the same as the allowed role
    if (role && user.role !== role) {
      return <Redirect to="/login" />;
    }
    // if the role matches, display the child component
    return <WrappedComponent {...props} />;
  }

  // else, do this
  return <p>Authenticating...</p>;
};

export default WithAuth;
