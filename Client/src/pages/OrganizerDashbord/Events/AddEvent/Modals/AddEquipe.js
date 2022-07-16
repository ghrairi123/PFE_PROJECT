import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../../../../helpers/message";
import { ADD_Equipe_Member } from "../../../../../redux/actions/EventsActions";
import ADDModal from "./AddSponsor";

import { useHistory } from "react-router-dom";
const AcceptConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  idEvent,
  message,
}) => {
  const dispatch = useDispatch();
  const [clientSideError, setClientSideError] = useState("");
  const email = useSelector((state) => state.auth);
  console.log(email._id, idEvent);
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const [idEvents, setIdEvent] = useState(null);

  const [DisplayConfirmationAddModal, setDisplayConfirmationAddModal] =
    useState(false);
  const [ADDMessage, setADDMessage] = useState(null);
  const [ADDedMessage, setADDedMessage] = useState(null);

  const history = useHistory();
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

  const [EquipeData, setEquipeData] = useState({
    FirstName: "",
    Lastname: "",
    JobName: "",
    Description: "",
    Photo: null,
  });
  const { FirstName, Lastname, JobName, Description, Photo } = EquipeData;
  const handlefileName = (evt) => {
    console.log(evt.target.files[0]);
    for (let i = 0; i < evt.target.files.length; i++) {
      setEquipeData({
        ...EquipeData,
        [evt.target.name]: evt.target.files[i],
      });
    }
  };
  const handleEquipeChange = (evt) => {
    setEquipeData({
      ...EquipeData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleEventSubmit = (evt) => {
    evt.preventDefault();

    let formData = new FormData();
    formData.append("FirstName", FirstName);
    formData.append("Lastname", Lastname);
    formData.append("JobName", JobName);
    formData.append("Description", Description);
    formData.append("Photo", Photo);

    dispatch(ADD_Equipe_Member(idEvent, formData, history));
    alert("Membre ajouté avec succés");
    history.push({
      pathname: "/Myevents",
    });

    setEquipeData({
      FirstName: "",
      Lastname: "",
      JobName: "",
      Description: "",
      Photo: null,
    });
  };
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Détails de l'équipe </Modal.Title>
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
            <libel>Nom </libel>
            <input
              type="text"
              class="form-control"
              onChange={handleEquipeChange}
              value={FirstName}
              id="FirstName"
              name="FirstName"
            />
          </div>
          <div class="form-group">
            <libel>Prénom </libel>
            <input
              type="text"
              class="form-control"
              onChange={handleEquipeChange}
              value={Lastname}
              id="Lastname"
              name="Lastname"
            />
          </div>
          <div class="form-group">
            <libel>Nom d'emploi</libel>
            <input
              type="text"
              class="form-control"
              onChange={handleEquipeChange}
              value={JobName}
              name="JobName"
            />
          </div>
          <div class="form-group">
            <libel>Description</libel>
            <input
              type="text"
              class="form-control"
              onChange={handleEquipeChange}
              value={Description}
              name="Description"
            />
          </div>
          <div class="form-group">
            <libel>Photo</libel>
            <input
              type="file"
              class="form-control"
              onChange={handlefileName}
              id="Photo"
              accept="image/*"
              name="Photo"
            />
          </div>
          <br />
          <a>
            {" "}
            <Button variant="default" onClick={hideModal}>
              Annuler
            </Button>
          </a>{" "}
          &nbsp;
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
        idEvents={idEvent}
        message={ADDedMessage}
      />
    </Modal>
  );
};

export default AcceptConfirmation;
