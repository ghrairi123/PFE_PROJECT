import React, { useEffect, useState } from "react";
import { POST_MESSAGE } from "../redux/actions/Contact_Us_Action";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import isEmpty from "validator/lib/isEmpty";
import { useHistory } from "react-router";

import useForm from "../hooks/forms";
import {
  TypeStat,
  getNewOrganizer,
  ShowEventsparCategory,
  EVENTS_Pert,
} from "../redux/actions/Static";
function Contact() {
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const [clientSideError, setClientSideError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const [messageData, setmessageData] = useState({
    Username: "",
    email_User: "",
    Subject: "",
    Messg: "",
  });
  const OrganAccount = useSelector((state) => state.Static.OrganAccount);
  const ClientAccount = useSelector((state) => state.Static.ClientAccount);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(TypeStat());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const { Username, email_User, Subject, Messg } = messageData;

  const MessageHandle = (props) => {
    const newMessageData = {
      Username: inputs.Username,
      email_User: inputs.email_User,
      Subject: inputs.Subject,
      Messg: inputs.Messg,
    };
    dispatch(POST_MESSAGE(newMessageData, history));
  };
  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      Username: "",
      email_User: "",
      Subject: "",
      Messg: "",
    },
    MessageHandle
  );

  return (
    <div>
      <section class="contact-section padding-top">
        <div class="contact-container">
          <div
            class="bg-thumb bg_img"
            data-background="assets/images/contact/contact.jpg"
          ></div>
          <div class="container">
            <div class="row justify-content-between">
              <div class="col-md-7 col-lg-6 col-xl-5">
                <div class="section-header-3 left-style">
                  <span class="cate">Contacter Nous</span>
                  <h3 class="title">entrer en contact</h3>
                  <p>
                    Nous aimerions parler de la façon dont nous pouvons
                    travailler ensemble. Envoyez-nous un message ci-dessous et
                    nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
                <form
                  class="contact-form"
                  id="contact_form_submit"
                  onSubmit={MessageHandle}
                >
                  {clientSideError && showErrorMsg(clientSideError)}

                  {errorMsg && showErrorMsg(errorMsg)}
                  {successMsg && showSuccessMsg(successMsg)}

                  <div class="form-group">
                    <label for="name">
                      Nom Complet <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Entrez votre nom complet"
                      value={inputs.Username}
                      onChange={handleInputChange}
                      name="Username"
                      id="Username"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">
                      E-mail <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Entrer votre Email"
                      value={inputs.email_User}
                      onChange={handleInputChange}
                      name="email_User"
                      id="email_User"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="subject">
                      Sujet <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Entrez votre sujet"
                      value={inputs.Subject}
                      onChange={handleInputChange}
                      id="Subject"
                      name="Subject"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="message">
                      Message <span>*</span>
                    </label>
                    <textarea
                      placeholder="Entrez votre message"
                      value={inputs.Messg}
                      onChange={handleInputChange}
                      name="Messg"
                      id="Messg"
                      required
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <input
                      type="submit"
                      value="Envoyer le message"
                      /* onClick={() => window.location.reload(false)} */
                    />
                  </div>
                </form>
              </div>
              <div class="col-md-5 col-lg-6">
                <div class="padding-top padding-bottom contact-info">
                  <div class="info-area">
                    <div class="info-item">
                      <div class="info-thumb">
                        <img
                          src="assets/images/contact/contact01.png"
                          alt="contact"
                        />
                      </div>
                      <div class="info-content">
                        <h6 class="title"> TÉLÉPHONE</h6>
                        <a href="Tel:82828282034">+1234 56789</a>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-thumb">
                        <img
                          src="assets/images/contact/contact02.png"
                          alt="contact"
                        />
                      </div>
                      <div class="info-content">
                        <h6 class="title">E-mail</h6>
                        <a href="Mailto:info@gmail.com">info@Boleto .com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="contact-counter padding-top padding-bottom">
        <div class="container">
          <div class="row justify-content-center mb-30-none">
            <div class="col-sm-6 col-md-3">
              <div class="contact-counter-item">
                <div class="contact-counter-thumb">
                  <i class="fas fa-users"></i>
                </div>
                <div class="contact-counter-content">
                  <div class="counter-item">
                    <h5
                      class="title odometer"
                      data-odometer-final={OrganAccount}
                    >
                      {OrganAccount}
                    </h5>
                  </div>
                  <p>Organisateurs</p>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="contact-counter-item active">
                <div class="contact-counter-thumb">
                  <i class="fas fa-users"></i>
                </div>
                <div class="contact-counter-content">
                  <div class="counter-item">
                    <h5
                      class="title odometer"
                      data-odometer-final={ClientAccount}
                    >
                      {ClientAccount}
                    </h5>
                  </div>
                  <p>clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
