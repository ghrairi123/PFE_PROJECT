import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "../util/axios";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { signupORGANIZER } from "../redux/actions/authActions";

import ReCAPTCHA from "react-google-recaptcha";
import { isEmpty, isEmail, isLength, isMatch } from "./Validation";
const background = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #23334f",
};
const option = {
  cursor: "pointer",
  fontWeight: "400",
  lineHeight: "40px",
  background: "transparent",
  listStyle: "none",
  minHeight: "40px",
  outline: "none",
  paddingLeft: "18px",
  paddingRight: "29px",
  textAlign: "left",
  color: "blue",
  transition: " all 0.2s",
};
const textarea = {
  color: "white",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #23334f",
};

function SignUpOrganizer() {
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading, serverError, errors } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const history = useHistory();
  const [verified, setverfied] = useState(false);
  const [tableData, settableData] = useState([]);

  const [UserData, setUserData] = useState({
    Name: "",
    LastName: "",
    PhoneNumber: "",
    Adress: "",
    Descriptions: "",
    zipCode: "",
    err: "",
    success: "",
    errpassword: "",
    email: "",
    password: "",
    txtConfirmPassword: "",
    Nom_Society: "",
    Email_Society: "",
    City: "",
    Telphn_Society: "",
    adresse_Society: "",
    Photo: null,
    CV: null,
  });
  const {
    Name,
    LastName,
    PhoneNumber,
    Adress,
    zipCode,
    email,
    Descriptions,
    password,
    City,
    txtConfirmPassword,
    Nom_Society,
    Email_Society,
    Telphn_Society,
    adresse_Society,
    Photo,
    CV,
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
  const handleUserChange = (evt) => {
    setUserData({
      ...UserData,
      [evt.target.name]: evt.target.value,
    });
  };
  const onChange = (value) => {
    setverfied(true);
  };
  useEffect(() => {
    const evts = () => {
      axios
        .get(
          `https://raw.githubusercontent.com/high54/Communes-France-JSON/master/france.json`
        )
        .then((res) => {
          var data = res.data;
          console.log(data);
          settableData(data);
        });
    };
    /* .then((response) => console.log(response))
      .then(({ totalPages, Event }) => {
        setEvent(Event);
        setNumberOfPages(totalPages);
      }); */
    const interval = setInterval(() => {
      evts();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (
      isEmpty(Name) ||
      isEmpty(password) ||
      isEmpty(LastName) ||
      isEmpty(PhoneNumber) ||
      isEmpty(Adress) ||
      isEmpty(zipCode) ||
      isEmpty(City) ||
      isEmpty(Descriptions)
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

    let formData = new FormData();
    formData.append("Name", Name);
    formData.append("LastName", LastName);
    formData.append("PhoneNumber", PhoneNumber);
    formData.append("Adress", Adress);
    formData.append("zipCode", zipCode.toString());
    formData.append("email", email);
    formData.append("password", password);
    formData.append("Descriptions", Descriptions);
    formData.append("Nom_Society", Nom_Society);
    formData.append("Email_Society", Email_Society);
    formData.append("Telphn_Society", Telphn_Society);
    formData.append("adresse_Society", adresse_Society);
    formData.append("Photo", Photo);
    formData.append("CV", CV);
    formData.append("City", City);
    //dispatch(signupORGANIZER(formData, history));
    await axios.post("/auth/signup-organizer", formData).then((res) => {
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
  };

  return (
    <div>
      <section
        class="account-section bg_img"
        data-background="assets/images/account/account-bg.jpg"
      >
        <div class="container">
          <div class="padding-top padding-bottom">
            <div class="account-area" style={{ maxWidth: "712px" }}>
              <div class="section-header-3">
                <span class="cate">BIENVENUE</span>
                <h5>Créez votre profil Organisateur</h5>
              </div>
              {err && showErrorMsg(err)}
              {successMsg && showSuccessMsg(successMsg)}
              <form class="account-form" onSubmit={handleSubmit}>
                <ul class="nav nav-tabs  mb-3" id="animateLine" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="animated-underline-home-tab"
                      data-toggle="tab"
                      href="#animated-underline-home"
                      role="tab"
                      aria-controls="animated-underline-home"
                      aria-selected="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      au propos de vous
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="animated-underline-profile-tab"
                      data-toggle="tab"
                      href="#animated-underline-profile"
                      role="tab"
                      aria-controls="animated-underline-profile"
                      aria-selected="false"
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-trello"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <rect x="7" y="7" width="3" height="9"></rect>
                        <rect x="14" y="7" width="3" height="5"></rect>
                      </svg>
                      société
                    </a>
                  </li>
                </ul>

                <div class="tab-content" id="animateLineContent-4">
                  <div
                    class="tab-pane fade show active"
                    id="animated-underline-home"
                    role="tabpanel"
                    aria-labelledby="animated-underline-home-tab"
                  >
                    <div class="form-group">
                      <label for="Photo">
                        Photo<span>*</span>
                      </label>

                      <input
                        accept="image/*"
                        onChange={handlefileName}
                        name="Photo"
                        type="file"
                        fullWidth
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="CV">
                        CV<span>*</span>
                      </label>

                      <input
                        id="CV"
                        name="CV"
                        label="CV"
                        accept=".pdf"
                        onChange={handlefileName}
                        type="file"
                        fullWidth
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="name">
                        nom<span>*</span>
                      </label>
                      <input
                        id="Name"
                        name="Name"
                        label="nom"
                        placeholder="nom"
                        onChange={handleUserChange}
                        value={Name}
                        fullWidth
                      />
                    </div>
                    <div class="form-group">
                      <label for="Prénom">
                        Prénom<span>*</span>
                      </label>
                      <input
                        id="LastName"
                        name="LastName"
                        label="Prénom"
                        placeholder="Prénom"
                        onChange={handleUserChange}
                        value={LastName}
                        fullWidth
                      />
                    </div>
                    <div class="form-group">
                      <label for="Téléphone">
                        Téléphone<span>*</span>
                      </label>
                      <input
                        id="PhoneNumber"
                        name="PhoneNumber"
                        label="Téléphone"
                        placeholder="Téléphone"
                        onChange={handleUserChange}
                        value={PhoneNumber}
                        fullWidth
                      />
                    </div>
                    <div class="form-group">
                      <label for="adresse">
                        Ville<span>*</span>
                      </label>
                      <input
                        style={background}
                        value={City}
                        id="City"
                        name="City"
                        fullWidth
                        onChange={handleUserChange}
                      />
                    </div>
                    <div class="form-group">
                      <label for="adresse">
                        adresse<span>*</span>
                      </label>

                      <input
                        id="Adress"
                        name="Adress"
                        label="adresse"
                        placeholder="adresse"
                        onChange={handleUserChange}
                        value={Adress}
                        fullWidth
                      />
                    </div>
                    <div class="form-group">
                      <label for="ZipCode">
                        Code Postale<span>*</span>
                      </label>

                      <input
                        style={background}
                        id="zipCode"
                        name="zipCode"
                        label="Code Postale"
                        placeholder="Code Postale"
                        onChange={handleUserChange}
                        value={zipCode}
                        fullWidth
                      />
                    </div>
                    <div class="form-group">
                      <label for="Description">
                        Description<span>*</span>
                      </label>
                      <textarea
                        style={textarea}
                        name="Descriptions"
                        onChange={handleUserChange}
                        value={Descriptions}
                      />
                    </div>
                    <div class="form-group">
                      <label for="E_mail">
                        E_mail<span>*</span>
                      </label>

                      <input
                        id="email"
                        name="email"
                        placeholder="E_mail"
                        label="E_mail"
                        onChange={handleUserChange}
                        value={email}
                        fullWidth
                      />
                    </div>
                    <div class="form-group">
                      <label for="password">
                        mot de passe<span>*</span>
                      </label>

                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="mot de passe"
                        label="mot de passe"
                        onChange={handleUserChange}
                        value={password}
                        fullWidth
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
                  </div>
                  <div
                    class="tab-pane fade"
                    id="animated-underline-profile"
                    role="tabpanel"
                    aria-labelledby="animated-underline-profile-tab"
                  >
                    <div class="form-group">
                      <label for="Nom_Society">Nom</label>

                      <input
                        id="Nom_Society"
                        name="Nom_Society"
                        label="Nom"
                        placeholder="Nom"
                        onChange={handleUserChange}
                        value={Nom_Society}
                        fullWidth
                      />
                    </div>
                    <div class="form-group">
                      <label for="Email_Society">email</label>

                      <input
                        id="Email_Society"
                        name="Email_Society"
                        label="email"
                        placeholder="email"
                        onChange={handleUserChange}
                        value={Email_Society}
                        fullWidth
                      />
                    </div>
                    <div class="form-group">
                      <label for="PhoneNumber">Téléphone</label>

                      <input
                        id="Telphn_Society"
                        name="Telphn_Society"
                        label="PhoneNumber"
                        placeholder="PhoneNumber"
                        onChange={handleUserChange}
                        value={Telphn_Society}
                        fullWidth
                      />
                    </div>
                    <div class="form-group">
                      <label for="Adresse">Adresse</label>

                      <input
                        id="adresse_Society"
                        name="adresse_Society"
                        label="Adresse"
                        placeholder="Adresse"
                        onChange={handleUserChange}
                        value={adresse_Society}
                        fullWidth
                      />
                    </div>

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
                    <div class="option">
                      Vous avez déjà un compte? <a href="/login">Connexion</a>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="animated-underline-contact"
                    role="tabpanel"
                    aria-labelledby="animated-underline-contact-tab"
                  ></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUpOrganizer;
