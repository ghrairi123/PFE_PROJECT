import React, { useState } from "react";
import axios from "../util/axios";

import { useParams } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";

import { isLength, isMatch } from "./Validation";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
const style = {
  marginTop: "70px",
};
function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async (evt) => {
    evt.preventDefault();

    if (isLength(password))
      return setData({
        ...data,
        err: "Le mot de passe doit être au moins de 6 caractères.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: "Le mot de passe ne correspond pas.",
        success: "",
      });

    try {
      const res = await axios.post(
        "/auth/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

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
                  <h3>Réinitialisez votre mot de passe </h3>
                </div>
                <form class="account-form" onSubmit={handleResetPass}>
                  {err && showErrorMsg(err)}
                  {success && showSuccessMsg(success)}
                  <div class="form-group">
                    <div class="form-group text-center">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="mot de passe"
                        value={password}
                        onChange={handleChangeInput}
                      />
                    </div>{" "}
                    <div class="form-group text-center">
                      <input
                        type="password"
                        name="cf_password"
                        id="cf_password"
                        value={cf_password}
                        onChange={handleChangeInput}
                        placeholder="Confirmez le mot de passe"
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

export default ResetPassword;
