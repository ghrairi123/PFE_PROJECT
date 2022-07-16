import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/authActions";
import axios from "../util/axios";
import ReCAPTCHA from "react-google-recaptcha";
import { isEmpty, isEmail, isLength, isMatch } from "./Validation";
const SignUp = () => {
  const { loading, serverError, errors } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const history = useHistory();
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const [verified, setverfied] = useState(false);
  const [UserData, setUserData] = useState({
    Name: "",
    err: "",
    success: "",
    LastName: "",
    PhoneNumber: "",
    Adress: "",
    zipCode: "",
    email: "",
    password: "",
    txtConfirmPassword: "",
    City: "",
    Photo: null,
    cf_password: "",
    errName: "",
    errpassword: "",
  });
  const {
    Name,
    LastName,
    PhoneNumber,
    Adress,
    zipCode,
    email,
    password,
    City,
    Photo,
    err,
    errpassword,
    errName,
    success,
    cf_password,
  } = UserData;
  const handlefileName = (evt) => {
    console.log(evt.target.files[0]);
    for (let i = 0; i < evt.target.files.length; i++) {
      setUserData({
        ...UserData,
        [evt.target.name]: evt.target.files[i],
      });
    }
  };
  const onChange = (value) => {
    setverfied(true);
  };

  const handleUserChange = (evt) => {
    setUserData({
      ...UserData,
      [evt.target.name]: evt.target.value,
      err: "",
      success: "",
    });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (
      isEmpty(Name) ||
      isEmpty(password) ||
      isEmpty(LastName) ||
      isEmpty(PhoneNumber) ||
      isEmpty(Adress) ||
      isEmpty(zipCode) ||
      isEmpty(City)
    )
      return setUserData({
        ...UserData,
        err: "Merci de remplir tous les champs",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUserData({
        ...UserData,
        errpassword: "Le mot de passe ne correspond pas.",
        success: "",
      });

    if (!isEmail(email))
      return setUserData({
        ...UserData,
        err: "E-mails invalides.",
        success: "",
      });

    if (isLength(password))
      return setUserData({
        ...UserData,
        err: "Le mot de passe doit être au moins de 6 caractères.",
        success: "",
      });
    /*   await axios.post("/auth/emailexist", { email }).then((res) => {
      if (res.status === 200) {
        alert("Vous êtes déjà inscrit.");
        window.location.reload(false);
        /* return setUserData({
          ...UserData,
          errName: "Vous êtes déjà inscrit.",
          success: "",
          email: "",
        });
      }
    }); */
    let formData = new FormData();
    formData.append("Name", Name);
    formData.append("LastName", LastName);
    formData.append("PhoneNumber", PhoneNumber);
    formData.append("Adress", Adress);
    formData.append("zipCode", zipCode.toString());
    formData.append("email", email);
    formData.append("password", password);
    formData.append("Photo", Photo);
    formData.append("City", City);
    console.log(formData, history);

    await axios.post("/auth/signup-Client", formData).then((res) => {
      if (res.status === 200) {
        alert("votre compte a été créé avec succès");
        history.push("/login");
      } else if (res.status === 401) {
        alert(res.data.errorMessage);
        return setUserData({
          ...UserData,
          err: res.data.errorMessage,
          success: "",
        });
      }
    });
    //dispatch(signupUser(formData, history));
    // history.push("/login");
  };

  return (
    <section
      class="account-section bg_img"
      data-background="assets/images/account/account-bg.jpg"
    >
      <div class="container">
        <div class="padding-top padding-bottom">
          <div class="account-area" style={{ maxWidth: "712px" }}>
            <div class="section-header-3">
              <span class="cate">BIENVENUE</span>
              <h5>Créez votre compte Client</h5>
            </div>
            <form class="account-form" onSubmit={handleSubmit}>
              {err && showErrorMsg(err)}
              {successMsg && showSuccessMsg(successMsg)}
              <div class="form-group">
                <label for="Photo">
                  Photo<span>*</span>
                </label>

                <input
                  id="Photo"
                  name="Photo"
                  label="Photo"
                  accept="image/*"
                  onChange={handlefileName}
                  type="file"
                  fullWidth
                />
              </div>
              <div class="form-group">
                <label for="name">
                  nom<span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nom"
                  id="Name"
                  name="Name"
                  value={Name}
                  onChange={handleUserChange}
                ></input>
              </div>
              <div class="form-group">
                <label for="Prénom">
                  Prénom<span>*</span>
                </label>
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  value={LastName}
                  onChange={handleUserChange}
                  placeholder="Prénom"
                ></input>
              </div>
              <div class="form-group">
                <label for="Téléphone">
                  Téléphone<span>*</span>
                </label>
                <input
                  type="Number"
                  id="PhoneNumber"
                  name="PhoneNumber"
                  value={PhoneNumber}
                  onChange={handleUserChange}
                  placeholder="Téléphone"
                ></input>
              </div>
              <div class="form-group">
                <label for="adresse">
                  adresse<span>*</span>
                </label>
                <input
                  type="text"
                  id="Adress"
                  name="Adress"
                  value={Adress}
                  onChange={handleUserChange}
                  placeholder="Adresse"
                ></input>
              </div>
              <div class="form-group">
                {/*    { <label for="ville">Ville<span>*</span></label>
                            <select style={background} onChange={onChangeSelect} slected={user.ville}>
                                        {villes.map(ville =>
                                        <option style={option} value={ville.Libelle}>{ville.Libelle}</option>)}
                                </select>} */}
              </div>
              <div class="form-group">
                <label for="CodePostale">
                  Ville<span>*</span>
                </label>
                <input
                  type="text"
                  id="City"
                  name="City"
                  value={City}
                  onChange={handleUserChange}
                  placeholder="Ville"
                ></input>
              </div>
              <div class="form-group">
                <label for="CodePostale">
                  Code Postale<span>*</span>
                </label>
                <input
                  type="Number"
                  id="zipCode"
                  name="zipCode"
                  value={zipCode}
                  onChange={handleUserChange}
                  placeholder="Code Postale"
                ></input>
              </div>
              <div class="form-group">
                <label for="email">
                  E_mail<span>*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleUserChange}
                  placeholder="Enterer votre Email"
                ></input>
                <p style={{ color: "red" }}>{errName}</p>
              </div>
              <div class="form-group">
                <label for="password">
                  mot de passe<span>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleUserChange}
                  placeholder="mot de passe"
                  name="password"
                  id="txtPassword"
                />
              </div>
              <div class="form-group">
                <label htmlFor="cf_password">
                  Confirmez le mot de passe <span>*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="cf_password"
                  value={cf_password}
                  name="cf_password"
                  onChange={handleUserChange}
                />
                <p style={{ color: "red" }}>{errpassword}</p>
              </div>{" "}
              <br />
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
              />
              <br />
              <div>
                <input
                  type="submit"
                  value="S'inscrire"
                  //disabled={!verified}
                  disabled={verified === false ? true : false}
                />
              </div>
            </form>
            <br />
            <div class="option">
              Vous avez déjà un compte? <a href="/login">Connexion</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
