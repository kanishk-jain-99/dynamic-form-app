import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import DynamicForm from "./DynamicForm";
import formConfig from "../config/formConfig.json";

const rootReducer = combineReducers({
  form: formReducer,
});
const store = createStore(rootReducer);

const renderWithProviders = (ui) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

test("validates required fields", async () => {
  renderWithProviders(<DynamicForm />);
  fireEvent.click(screen.getByText(/submit/i));

  await waitFor(() => {
    const requiredMessages = screen.getAllByText(/required/i);
    expect(requiredMessages.length).toBeGreaterThan(0); // ✅ Ensures at least one validation error
  });
});

test("validates email format", async () => {
  renderWithProviders(<DynamicForm />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: "invalidemail" } });
  fireEvent.blur(emailInput);
  fireEvent.click(screen.getByText(/submit/i));
  const errorMessage = await screen.findByText("Invalid email address");
  expect(errorMessage).toBeInTheDocument();
});

test("validates minimum length", async () => {
  renderWithProviders(<DynamicForm />);
  const usernameInput = screen.getByLabelText(/username/i);
  fireEvent.change(usernameInput, { target: { value: "ab" } });
  fireEvent.click(screen.getByText(/submit/i));
  await waitFor(() => {
    expect(
      screen.getByText(/must be at least 3 characters/i)
    ).toBeInTheDocument();
  });
});

test("displays conditional field when checkbox is checked", () => {
  renderWithProviders(<DynamicForm />);
  const checkbox = screen.getByLabelText(/subscribe to newsletter/i);
  fireEvent.click(checkbox);
  expect(screen.getByLabelText(/newsletter type/i)).toBeInTheDocument();
});
