import React from "react";

import { isEmailValid, isPasswordValid } from "../../Shared/utils";
import { FormData } from "../../Shared/types";


type Validation = string | boolean;
interface Props {
  onSubmit: (formData: FormData) => void;
}

interface State {
  name: string;

  role: string;
  email: string;
  password: string;
  nameError: Validation;
  emailError: Validation;
  passwordError: Validation;
}


function validateName(name: string) {
  if (name === "") {
    return "Name must not be empty";
  }

  return false;
}

function validateEmail(email: string) {
  if (email === "") {
    return "Email must not be empty";
  }

  if (!isEmailValid(email)) {
    return "Email must be valid";
  }

  return false;
}

function validatePassword(password: string) {
  if (password === "") {
    return "Password must not be empty";
  }

  if (password.length < 9) {
    return "Password must be atleast 9 characters long";
  }

  if (!isPasswordValid(password)) {
    return "Password must contain 1 uppercase letter, 1 lowercase letter and a number";
  }

  return false;
}


class User extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      role: '',
      email: '',
      password: '',
      nameError: false,
      emailError: false,
      passwordError: false,
    }
  }


  setName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({name: e.target.value});
  }
  setRole = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({role: e.target.value});
  }
  setEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({email: e.target.value});
  }
  setPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({password: e.target.value});
  }


  setNameError = (value: Validation) => {
    this.setState({nameError: value});
  }
  setEmailError = (value: Validation) => {
    this.setState({emailError: value});
  }
  setPasswordError = (value: Validation) => {
    this.setState({passwordError: value});
  }

  validateAndSubmitForm = () => {
    const { onSubmit } = this.props;
    const { name, email, password, role } = this.state;
    const nameValidation = validateName(name);
    this.setNameError(nameValidation);

    const emailValidation = validateEmail(email);
    this.setEmailError(emailValidation);

    const passwordValidation = validatePassword(password);
    this.setPasswordError(passwordValidation);

    if (
      nameValidation !== false ||
      nameValidation !== false ||
      passwordValidation !== false
    ) {
      return;
    } else {
      const formData: FormData = {
        section: "User",
        fields: { name: name, email: email, password: password, role: role },
      };
      onSubmit(formData);
    }
  }

  render() {
    const { nameError, emailError, passwordError, name, email, role, password } = this.state;
    return (
      <>
        <div className="user">
          <div className="user-field-container">
            <div>Name</div> {nameError && <span>{nameError}</span>}
            <input
              className="user-field-container__input"
              name="name"
              aria-label="name-input"
              placeholder="Name"
              type="text"
              onChange={this.setName}
              value={name}
            />
          </div>
          <div className="user-field-container">
            <div>Role</div>
            <input
              className="user-field-container__input"
              name="role"
              placeholder="Role"
              type="text"
              value={role}
              onChange={this.setRole}
            />
          </div>
          <div className="user-field-container">
            <div>Email</div> {emailError && <span>{emailError}</span>}
            <input
              className="user-field-container__input"
              name="email"
              placeholder="Email"
              type="text"
              aria-label="email-input"
              onChange={this.setEmail}
              value={email}
            />
          </div>
          <div className="user-field-container">
            <div>Password</div>
            {passwordError && <span>{passwordError}</span>}
            <input
              className="user-field-container__input"
              name="password"
              placeholder="Password"
              type="password"
              aria-label="password-input"
              onChange={this.setPassword}
              value={password}
            />
          </div>
          <button className="submit-button" onClick={this.validateAndSubmitForm}>
            Submit
          </button>
        </div>
      </>
    );
  }
}


export default User;
