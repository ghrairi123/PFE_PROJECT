import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AcceptConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  message,
  Name,
  LastName,
}) => {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div class="form-group">
            <label for="name">Nom:</label>
            <p>{LastName}</p>
          </div>
          <div class="form-group">
            <label for="email">Image:</label>
            <input
              type="file"
              class="form-control"
              accept="image/*"
              id="file"
              name="fileName"
              required
              maxlength="50"
            />
          </div>
          <br />
          <a>
            {" "}
            <Button variant="default">Annuler</Button>
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
      </Modal.Body>
    </Modal>
  );
};

export default AcceptConfirmation;
