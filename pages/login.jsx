import { useRouter } from "next/router";
import LoginForm from "@/components/forms/LoginForm";
import withApollo from "@/hoc/withApollo";
import { useSignIn } from "@/apollo/actions";
import Redirect from "@/components/shared/Redirect";
import BaseLayout from "@/layouts/BaseLayout";
import messages from "@/variables/messages";

const Login = () => {
  // useSignIn: apollo's useMutation(SIGN_IN)
  const [signIn, { data, loading, error }] = useSignIn();

  // user might be redirected from other page with a message
  const router = useRouter();
  // get the message from URL query string
  const { message } = router.query;

  // once signed in successfully, cookie will be saved
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
            <h1 className="page-title">Login</h1>
            {message && (
              <div className={`alert alert-${messages[message].status}`}>
                {messages[message].value}
              </div>
            )}
            <LoginForm
              loading={loading}
              onSubmit={(signInData) => signIn({ variables: signInData })}
            />
            {data && data.signIn && <Redirect to="/" />}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Login);
