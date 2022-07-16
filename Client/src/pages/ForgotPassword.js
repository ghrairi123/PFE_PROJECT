import React, { useState } from "react";
import axios from "../util/axios";
import { isEmail } from "./Validation";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";

const initialState = {
  email: "",
  err: "",
  success: "",
};
const style = {
  marginTop: "70px",
};
function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async (evt) => {
    evt.preventDefault();

    if (!isEmail(email))
      return setData({ ...data, err: "Invalid emails.", success: "" });

    try {
      const res = await axios.post("/auth/forgot", { email });

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="fg_pass">
      <div>
        <section
          class="account-section bg_img"
          data-background="assets/images/account/account-bg.jpg"
        >
          <div class="container">
            <div class="padding-top padding-bottom">
              <div class="account-area" style={style}>
                <div class="section-header-3">
                  <span class="cate">Bienvenue!</span>
                  <h3> Mot de passe oublié? </h3>
                </div>
                <form class="account-form" onSubmit={forgotPassword}>
                  {err && showErrorMsg(err)}
                  {success && showSuccessMsg(success)}
                  <div class="form-group">
                    <div class="form-group text-center">
                      <label htmlFor="email">ENTREZ VOTRE ADRESSE EMAIL</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleChangeInput}
                      />
                    </div>{" "}
                    <div class="form-group text-center">
                      {" "}
                      <input type="submit" value="Vérifiez " />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ForgotPassword;
