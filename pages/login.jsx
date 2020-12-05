import LoginForm from "../components/forms/LoginForm";
import withApollo from "../hoc/withApollo";
import { useSignIn } from "../apollo/actions";
import Redirect from "../components/shared/Redirect";

const Login = () => {
  // useSignIn: apollo's useMutation(SIGN_IN)
  const [signIn, { data, error }] = useSignIn();
  // once signed in successfully, cookie will be saved
  const errorMessage = (error) => {
    // console.log(JSON.stringify(error));
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "Oops, something went wrong..."
    );
  };

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            <LoginForm
              onSubmit={(signInData) => signIn({ variables: signInData })}
            />
            {data && data.signIn && <Redirect to="/" />}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(Login);
