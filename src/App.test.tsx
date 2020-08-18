import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe(":App", () => {
  describe(":render", () => {
    describe("first page of form", () => {
      it("Should display the correct input labels", () => {
        const { getByText } = render(<App />);
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
        const { getByPlaceholderText } = render(<App />);
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
        const { getByText } = render(<App />);
        const submitElement = getByText(/Submit/i);
        expect(submitElement).toBeInTheDocument();
      });
    });
  });

  describe(":Form progression", () => {
    describe(":Given correct inputs", () => {
      it("Should move from User to Privacy section of the form", () => {
        const { getByText, getByLabelText } = render(<App />);
        const nameInput = getByLabelText("name-input");
        const emailInput = getByLabelText("email-input");
        const passwordInput = getByLabelText("password-input");
        fireEvent.change(nameInput, { target: { value: "testname" } });
        fireEvent.change(emailInput, {
          target: { value: "testname@test.com" },
        });
        fireEvent.change(passwordInput, { target: { value: "Testpassword1" } });
        const submitButton = getByText(/Submit/);

        fireEvent.click(submitButton);

        const checkbox1Text = getByText(
          /Recieve updates about Tray.io product by email/
        );
        expect(checkbox1Text).toBeInTheDocument();
      });

      it("Should move from User to Privacy to Done section of the form", () => {
        const { getByText, getByLabelText } = render(<App />);
        const nameInput = getByLabelText("name-input");
        const emailInput = getByLabelText("email-input");
        const passwordInput = getByLabelText("password-input");
        fireEvent.change(nameInput, { target: { value: "testname" } });
        fireEvent.change(emailInput, {
          target: { value: "testname@test.com" },
        });
        fireEvent.change(passwordInput, { target: { value: "Testpassword1" } });
        const submitButton1 = getByText(/Submit/);
        fireEvent.click(submitButton1);


        const checkTrayElement = getByLabelText('tray-product-input');
        fireEvent.click(checkTrayElement);

        const submitButton2 = getByText(/Submit/);
        fireEvent.click(submitButton2);

        const doneText = getByText(
          /Please verify your email address, you should have recieved an email from us already/
        );

        expect(doneText).toBeInTheDocument();
      });
    });
    describe(":Given bad inputs", () => {
      it("Should not move from User to Privacy section of the form", () => {
        const { getByText, getByLabelText } = render(<App />);

        const nameInput = getByLabelText("name-input");
        const emailInput = getByLabelText("email-input");
        const passwordInput = getByLabelText("password-input");
        fireEvent.change(nameInput, { target: { value: "" } });
        fireEvent.change(emailInput, { target: { value: "bademail" } });
        fireEvent.change(passwordInput, { target: { value: "badpass" } });
        const submitButton = getByText(/Submit/);
        fireEvent.click(submitButton);

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
      });
    });
  });
});
