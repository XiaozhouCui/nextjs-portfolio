import { useGetUser } from "@/apollo/actions";
import Redirect from "@/components/shared/Redirect";
import Loader from "@/components/shared/Loader";

const Auth = (WrappedComponent, role, options = { ssr: false }) => {
  function WithAuth(props) {
    const { data: { user } = {}, loading, error } = useGetUser({
      // request will always be executed, not checking cache
      fetchPolicy: "network-only",
    });

    // if we don't have a user, do the following
    if (!loading && (!user || error) && typeof window !== "undefined") {
      return (
        <Redirect
          to="/login"
          // redirection message will be added as query string by next/router
          query={{ message: "NOT_AUTHENTICATED" }} // .../login?message=NOT_AUTHENTICATED
        />
      );
    }

    if (user) {
      if (role && !role.includes(user.role)) {
        return (
          <Redirect
            to="/login"
            // redirection message will be added as query string by next/router
            query={{ message: "NOT_AUTHORISED" }} // .../login?message=NOT_AUTHORISED
          />
        );
      }
      // if the role matches, display the child component
      return <WrappedComponent {...props} />;
    }

    return (
      <div className="spinner-container">
        <Loader variant="large" />
      </div>
    );
  }

  if (options.ssr) {
    const serverRedirect = (res, to) => {
      res.redirect(to);
      res.end();
      return {};
    };

    WithAuth.getInitialProps = async (context) => {
      // use server redirect, we no longer load WrappedComponent before redirection
      const { req, res } = context;
      if (req) {
        const { user } = req;

        if (!user) {
          return serverRedirect(res, "/login?message=NOT_AUTHENTICATED");
        }

        if (role && !role.includes(user.role)) {
          return serverRedirect(res, "/login?message=NOT_AUTHORISED");
        }
      }

      const pageProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(context));
      return { ...pageProps };
    };
  }

  return WithAuth;
};

export default Auth;
