import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

// "onSubmit" is passed down from "new" component
// form data will become the argument of "onSubmit" function
const PortfolioForm = ({ onSubmit }) => {
  // combined solution of local state and react-hook-form
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // react-hook-form
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    // register name fields for setValue args
    register({ name: "startDate" });
    register({ name: "endDate" });
  }, [register]);

  // "date" arg comes from date picker
  const handleStartDate = (date) => {
    // startDate from datepicker will be combined with other form data as the arg for onSubmit
    setValue("startDate", date.toISOString());
    setStartDate(date);
  };

  // "date" arg comes from date picker
  const handleEndDate = (date) => {
    setValue("endDate", date.toISOString());
    setEndDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          ref={register}
          name="title"
          type="text"
          className="form-control"
          id="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company</label>
        <input
          ref={register}
          name="company"
          type="text"
          className="form-control"
          id="company"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
          ref={register}
          name="location"
          type="text"
          className="form-control"
          id="location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
          ref={register}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          ref={register}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="street">Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={startDate}
            onChange={handleStartDate}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="street">End Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={endDate}
            onChange={handleEndDate}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default PortfolioForm;
