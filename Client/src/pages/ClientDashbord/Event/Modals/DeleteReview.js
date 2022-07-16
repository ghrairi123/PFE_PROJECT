import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Delete_Reviews } from "../../../../redux/actions/EventsActions";
import axios from "../../../../util/axios";

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
        <Modal.Title>Confirmation </Modal.Title>
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
              dispatch(Delete_Reviews(id));
              window.location.reload(false);
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
