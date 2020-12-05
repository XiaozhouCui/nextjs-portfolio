import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit, loading }) => {
  // handleSubmit will take in all form data and pass them onto "onSubmit" props as args
  // register is the named export, DO NOT change to "login"
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register}
          name="email"
          type="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      {loading ? (
        "Signing in..."
      ) : (
        <button type="submit" className="btn btn-main bg-blue py-2 ttu">
          Submit
        </button>
      )}
    </form>
  );
};

export default LoginForm;
