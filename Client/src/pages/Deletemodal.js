import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "../util/axios";

import { useDispatch } from "react-redux";
import { deleteMessage } from "../redux/actions/Contact_Us_Action";
const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  message,
}) => {
  console.log(id);
  const dispatch = useDispatch();

  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Confirmation de suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <a>
          {" "}
          <Button variant="default" onClick={hideModal}>
            Annuler
          </Button>
        </a>
        <a href="/apps_mailbox">
          <Button
            variant="danger"
            onClick={() => {
              dispatch(deleteMessage(id));
            }}
          >
            Supprimer
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
