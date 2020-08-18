import React from "react";
import { render, fireEvent } from "@testing-library/react";

import User from "./User";

describe(":User tests", () => {
  const submitMock = jest.fn();
  describe(":render", () => {
    it("Should display the user fields labels", () => {
      const { getByText } = render(<User onSubmit={submitMock} />);
      const nameElement = getByText(/name/i);
      const roleElement = getByText(/role/i);
      const emailElement = getByText(/email/i);
      const passwordlement = getByText(/password/i);
      expect(nameElement).toBeInTheDocument();
      expect(roleElement).toBeInTheDocument();
      expect(emailElement).toBeInTheDocument();
      expect(passwordlement).toBeInTheDocument();
    });
    it("Should display the correct input fields", () => {
      const { getByPlaceholderText } = render(<User onSubmit={submitMock} />);
      const nameInputElement = getByPlaceholderText("Name");
      const roleInputElement = getByPlaceholderText("Role");
      const emailInputElement = getByPlaceholderText("Email");
      const passwordInputElement = getByPlaceholderText("Password");
      expect(nameInputElement).toBeInTheDocument();
      expect(roleInputElement).toBeInTheDocument();
      expect(emailInputElement).toBeInTheDocument();
      expect(passwordInputElement).toBeInTheDocument();
    });
    it("Should display the submit button", () => {
      const { getByText } = render(<User onSubmit={submitMock} />);
      const submitElement = getByText(/Submit/i);
      expect(submitElement).toBeInTheDocument();
    });
  });

  describe(":validation", () => {
    describe(":name validation", () => {
      describe(":bad data", () => {
        it("Should show error when submitting empty name", () => {
          const { getByLabelText, getByText } = render(
            <User onSubmit={submitMock} />
          );

          const nameInput = getByLabelText("name-input");
          fireEvent.change(nameInput, { target: { value: "" } });
          const submitElement = getByText(/Submit/i);
          fireEvent.click(submitElement);
          const errorText = getByText(/Name must not be empty/);

          expect(errorText).toBeInTheDocument();
        });
      });
    });
    describe(":email validation", () => {
      describe(":bad data", () => {
        it("Should display specific message for empty email", () => {
          const { getByLabelText, getByText } = render(
            <User onSubmit={submitMock} />
          );

          const emailInput = getByLabelText("email-input");
          fireEvent.change(emailInput, { target: { value: "" } });
          const submitElement = getByText(/Submit/i);
          fireEvent.click(submitElement);
          const errorText = getByText(/Email must not be empty/);

          expect(errorText).toBeInTheDocument();
        });

        it("Should display specific message for invalid email", () => {
          const { getByLabelText, getByText } = render(
            <User onSubmit={submitMock} />
          );

          const emailInput = getByLabelText("email-input");
          fireEvent.change(emailInput, { target: { value: "notvalidemail" } });
          const submitElement = getByText(/Submit/i);
          fireEvent.click(submitElement);
          const errorText = getByText(/Email must be valid/);

          expect(errorText).toBeInTheDocument();
        });
      });
    });

    describe(":password validation", () => {
      describe(":bad data", () => {
        it("Should display a specific message if password field is empty ", () => {
          const { getByLabelText, getByText } = render(
            <User onSubmit={submitMock} />
          );

          const passwordInput = getByLabelText("password-input");
          fireEvent.change(passwordInput, { target: { value: "" } });
          const submitElement = getByText(/Submit/i);
          fireEvent.click(submitElement);
          const errorText = getByText(/Password must not be empty/);

          expect(errorText).toBeInTheDocument();
        });
        it("Should display a specific message if password is less than 9 characters", () => {
          const { getByLabelText, getByText } = render(
            <User onSubmit={submitMock} />
          );

          const passwordInput = getByLabelText("password-input");
          fireEvent.change(passwordInput, { target: { value: "12345678" } });
          const submitElement = getByText(/Submit/i);
          fireEvent.click(submitElement);
          const errorText = getByText(
            /Password must be atleast 9 characters long/
          );

          expect(errorText).toBeInTheDocument();
        });
        it("Should display a specific message if password field does not contain 1 uppercase letter, 1 lowercaser letter and a number", () => {
          const { getByLabelText, getByText } = render(
            <User onSubmit={submitMock} />
          );

          const passwordInput = getByLabelText("password-input");
          fireEvent.change(passwordInput, { target: { value: "123456789" } });
          const submitElement = getByText(/Submit/i);
          fireEvent.click(submitElement);
          const errorText = getByText(
            /Password must contain 1 uppercase letter, 1 lowercase letter and a number/
          );

          expect(errorText).toBeInTheDocument();
        });
      });
    });
  });
});
