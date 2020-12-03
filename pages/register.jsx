import RegisterForm from "@/components/forms/RegisterForm";
import Redirect from "../components/shared/Redirect";

const Register = () => {
  const register = (registerData) => {
    alert(JSON.stringify(registerData));
  };

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>
            <RegisterForm onSubmit={register} />
            {/* <Redirect to="/login" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
