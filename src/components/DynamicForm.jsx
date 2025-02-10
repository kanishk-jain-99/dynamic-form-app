import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import formConfig from "../config/formConfig.json";
import { renderField, validate } from "../utils/formHelpers";
import "../index.css";

const validateWithPasswordCheck = (values) => {
  const errors = validate(values, formConfig);

  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
const DynamicForm = ({ handleSubmit, formValues }) => {
  const onSubmit = (values) => {
    console.log("Form Submitted", values);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Dynamic Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formConfig.map(
          (field) =>
            (!field.dependsOn || formValues?.[field.dependsOn]) && (
              <Field
                key={field.name}
                name={field.name}
                type={field.type}
                component={renderField}
                label={field.label}
                options={field.options || []}
              />
            )
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full mt-4 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  formValues: state.form.dynamicForm?.values || {},
});

const ConnectedDynamicForm = connect(mapStateToProps)(DynamicForm);

export default reduxForm({
  form: "dynamicForm",
  validate: validateWithPasswordCheck,
})(ConnectedDynamicForm);
