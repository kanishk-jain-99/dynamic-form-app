import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import formConfig from "../config/formConfig.json";
import "../index.css";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
  options,
}) => (
  <div className="mb-4">
    {type === "checkbox" ? (
      <label className="flex items-center space-x-2 text-gray-700 font-bold">
        <input {...input} type={type} className="w-4 h-4" />
        <span>{label}</span>
      </label>
    ) : type === "radio" ? (
      <fieldset>
        <legend className="block text-gray-700 font-bold mb-2">{label}</legend>
        {options.map((option, index) => (
          <label
            key={option}
            htmlFor={`${input.name}-${index}`}
            className="mr-4"
          >
            <input
              {...input}
              id={`${input.name}-${index}`}
              type="radio"
              value={option}
              className="mr-1"
            />
            {option}
          </label>
        ))}
      </fieldset>
    ) : type === "select" ? (
      <>
        <label
          htmlFor={input.name}
          className="block text-gray-700 font-bold mb-2"
        >
          {label}
        </label>
        <select
          {...input}
          id={input.name}
          className="border rounded p-2 w-full"
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </>
    ) : type === "textarea" ? (
      <>
        <label
          htmlFor={input.name}
          className="block text-gray-700 font-bold mb-2"
        >
          {label}
        </label>
        <textarea
          {...input}
          id={input.name}
          className="border rounded p-2 w-full"
        ></textarea>
      </>
    ) : type === "color" ? (
      <>
        <label
          htmlFor={input.name}
          className="block text-gray-700 font-bold mb-2"
        >
          {label}
        </label>
        <div className="flex items-center space-x-2">
          <input {...input} id={input.name} type={type} className="w-12 h-10" />
        </div>
      </>
    ) : (
      <>
        <label
          htmlFor={input.name}
          className="block text-gray-700 font-bold mb-2"
        >
          {label}
        </label>
        <input
          {...input}
          id={input.name}
          type={type}
          className="border rounded p-2 w-full"
        />
      </>
    )}
    {touched && error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const validate = (values) => {
  const errors = {};

  formConfig.forEach((field) => {
    const value = values[field.name];

    if (field.required && !value) {
      errors[field.name] = "Required";
    }

    if (
      field.validate === "email" &&
      value &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
    ) {
      errors[field.name] = "Invalid email address";
    }

    if (
      field.validate === "url" &&
      value &&
      !/^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/i.test(value)
    ) {
      errors[field.name] = "Invalid URL";
    }

    if (field.minLength && value && value.length < field.minLength) {
      errors[field.name] = `Must be at least ${field.minLength} characters`;
    }

    if (field.min && value && parseInt(value) < field.min) {
      errors[field.name] = `Must be at least ${field.min}`;
    }

    if (field.max && value && parseInt(value) > field.max) {
      errors[field.name] = `Cannot be greater than ${field.max}`;
    }

    if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
      errors[field.name] = "Invalid format";
    }
  });

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

export default reduxForm({ form: "dynamicForm", validate })(
  ConnectedDynamicForm
);
