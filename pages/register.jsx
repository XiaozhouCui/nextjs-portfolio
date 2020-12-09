import RegisterForm from "@/components/forms/RegisterForm";
import withApollo from "../hoc/withApollo";
import { useSignUp } from "../apollo/actions";
import Redirect from "../components/shared/Redirect";
import BaseLayout from "@/layouts/BaseLayout";

const Register = () => {
  // useSignUp: apollo's useMutation(SIGN_UP)
  const [signUp, { data, error }] = useSignUp();

  const errorMessage = (error) => {
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
            <h1 className="page-title">Register</h1>
            <RegisterForm
              onSubmit={(signUpData) => signUp({ variables: signUpData })}
            />
            {data && data.signUp && (
              // .../login?message=NOT_AUTHORISED
              <Redirect to="/login" query={{ message: "REGISTERED" }} />
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

export default withApollo(Register);
