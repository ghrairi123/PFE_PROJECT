import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AcceptOrganizer } from "../../../redux/actions/OrganizerAction";
const AcceptConfirmation = ({
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
        <Modal.Title>Confirmation d'acceptation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-success">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <a>
          {" "}
          <Button variant="default" onClick={hideModal}>
            Annuler
          </Button>
        </a>
        <a /* href="/invitations" */>
          <Button
            variant="success"
            onClick={() => {
              dispatch(AcceptOrganizer(id, history));
            }}
          >
            Accepter
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default AcceptConfirmation;
