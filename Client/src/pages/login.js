import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { showErrorMsg, showSuccessMsg } from "../helpers/message";
//custom-hook
import useForm from "../hooks/forms";
import { loginAction } from "../redux/actions/authActions";

export default function Login() {
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading, serverError, errors } = useSelector((state) => state.UI);

  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandle = (props) => {
    const userData = {
      email: inputs.email,
      password: inputs.password,
    };
    dispatch(loginAction(userData, history));
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    loginHandle
  );

  let incorrectCredentialsError = null;
  let verifyEmailError = null;
  if (errors) {
    if (errors.includes("Invalid email/password"))
      incorrectCredentialsError = errors;
    if (errors.includes("Verify your email")) verifyEmailError = errors;
  }

  return (
    <section
      class="account-section bg_img"
      data-background="assets/images/account/account-bg.jpg"
    >
      <div class="container">
        <div class="padding-top padding-bottom">
          <div
            class="account-area"
            style={{
              padding: "11px 45px",
              maxWidth: "450px",
            }}
          >
            <div class="section-header-3">
              {" "}
              <br />
              <img src="assets/images/logo/logo.png" alt="logo" />
            </div>
            <form class="account-form" noValidate onSubmit={handleSubmit}>
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}
              <div class="form-group">
                <label for="email2">
                  E_mail<span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="E_mail"
                  name="email"
                  onChange={handleInputChange}
                  value={inputs.email}
                  required
                />
              </div>
              <div class="form-group">
                <label for="pass3">
                  Mot de passe<span>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  onChange={handleInputChange}
                  value={inputs.password}
                  required
                />
              </div>
              <Link to="/forgot_password" style={{ float: "right" }}>
                Mot de passe oublié?
              </Link>{" "}
              <br />
              <br />
              <div class="form-group text-center">
                {" "}
                <input type="submit" value="Connexion" />
              </div>
            </form>
            <div class="option">
              Pas encore inscrit?{" "}
              <a href="/AccountType">s'inscrire maintenant</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
