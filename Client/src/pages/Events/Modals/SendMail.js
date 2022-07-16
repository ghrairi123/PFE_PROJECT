import emailjs from "emailjs-com";
import React from "react";

import { Modal, Button } from "react-bootstrap";
const AcceptConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  name,
  email,
}) => {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_o9zsnwo",
        "template_lygs8ao",
        e.target,
        "user_Ec4VaRgEZvzg8U6M0wpwq"
      )
      .then(
        (result) => {
          alert("Message envoyé avec succès");
          /*        hideModal; */
        },
        (error) => {
          alert(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>envoyer un e-mail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <form onSubmit={sendEmail}>
            <div class="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={name}
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email"
                value={email}
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Sujet"
                name="subject"
              />
            </div>
            <div class="form-group">
              <textarea
                className="form-control"
                id=""
                cols="30"
                rows="8"
                placeholder="Votre message"
                name="message"
              ></textarea>
            </div>
            <Modal.Footer>
              <a>
                {" "}
                <Button variant="default" onClick={hideModal}>
                  Annuler
                </Button>
              </a>
              <a>
                <Button variant="success" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>{" "}
                  Envoyer
                </Button>
              </a>
            </Modal.Footer>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AcceptConfirmation;
