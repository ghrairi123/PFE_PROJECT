import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Trach_Events } from "../../../../redux/actions/EventsActions";
const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  message,
}) => {
  const history = useHistory();
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
              dispatch(Trach_Events(id, history));
            }}
          >
            Désactiver
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
