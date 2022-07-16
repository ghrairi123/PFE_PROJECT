import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../../../../helpers/message";
import { ADD_Classe } from "../../../../../redux/actions/EventsActions";
import ADDModal from "./AddEquipe";
import { useHistory } from "react-router-dom";
const AcceptConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  idEvents,
  message,
}) => {
  const dispatch = useDispatch();
  const [idEvent, setIdEvent] = useState(null);

  const [DisplayConfirmationAddModal, setDisplayConfirmationAddModal] =
    useState(false);
  const [ADDMessage, setADDMessage] = useState(null);
  const [ADDedMessage, setADDedMessage] = useState(null);
  const [clientSideError, setClientSideError] = useState("");
  const email = useSelector((state) => state.auth);
  console.log(email._id, idEvents);
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const [ClassData, setClassData] = useState({
    ClassName: "",
    Price: "",
    NumbrePlace: "",
  });
  const { ClassName, Price, NumbrePlace } = ClassData;

  const showADDModal = (id) => {
    setIdEvent(id);
    setADDMessage(null);
    setADDedMessage(`Partagez les détails de votre événement  :D`);
    setDisplayConfirmationAddModal(true);
  };
  const hideConfirmationADDModal = () => {
    setDisplayConfirmationAddModal(false);
  };
  const submitADD = () => {
    setADDedMessage(` added successfully.`);
    setDisplayConfirmationAddModal(false);
  };
  const handleClassChange = (evt) => {
    setClassData({
      ...ClassData,
      [evt.target.name]: evt.target.value,
    });
  };
  const history = useHistory();

  const handleEventSubmit = (evt) => {
    evt.preventDefault();

    let formData = new FormData();
    formData.append("ClassName", ClassName);
    formData.append("Price", Price);
    formData.append("NumbrePlace", NumbrePlace);
    dispatch(ADD_Classe(idEvents, formData));
    alert("Classe d'événement ajoutée");
    history.push({
      pathname: "/Myevents",
    });

    setClassData({
      ClassName: "",
      Price: "",
      NumbrePlace: "",
    });
  };
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Détails de classe</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundImage: `url("assets/images/account/account-bg.jpg")`,
        }}
      >
        <form onSubmit={handleEventSubmit}>
          {clientSideError && showErrorMsg(clientSideError)}

          {errorMsg && showErrorMsg(errorMsg)}
          {successMsg && showSuccessMsg(successMsg)}

          <div class="form-group">
            <libel>Nom du classe </libel>
            <input
              type="text"
              class="form-control"
              onChange={handleClassChange}
              value={ClassName}
              id="ClassName"
              name="ClassName"
            />
          </div>
          <div class="form-group">
            <label for="Prix">Prix</label>
            <input
              type="text"
              onChange={handleClassChange}
              class="form-control"
              value={Price}
              name="Price"
            />
          </div>
          <div class="form-group">
            <label for="card3">Nombre de places</label>
            <input
              required
              value={NumbrePlace}
              onChange={handleClassChange}
              type="Number"
              id="NumbrePlace"
              name="NumbrePlace"
            />
          </div>

          <br />

          <a>
            <input
              style={{ width: "120px" }}
              type="submit"
              class="btn btn-lg btn-success btn-block"
              variant="success"
              value="Ajouter"
            />
          </a>
        </form>
        <br />
        <br />
      </Modal.Body>
      <ADDModal
        showModal={DisplayConfirmationAddModal}
        confirmModal={submitADD}
        hideModal={hideConfirmationADDModal}
        idEvent={idEvents}
        message={ADDedMessage}
      />
    </Modal>
  );
};

export default AcceptConfirmation;
