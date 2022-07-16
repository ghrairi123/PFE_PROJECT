import React from "react";
import { Modal, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/actions/OrganizerAction";
const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  message,
}) => {
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
        <a>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(deleteUser(id));
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
