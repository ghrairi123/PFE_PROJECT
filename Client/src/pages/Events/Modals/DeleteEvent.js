import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
import { deleteEvent } from "../../../redux/actions/EventsActions";
const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  message,
  title,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [socket, setsocket] = useState(null);

  const [is_notify, set_is_notify] = useState(false);
  useEffect(() => {
    setsocket(io("http://localhost:8900"));
  }, []);

  useEffect(() => {
    if (socket != null) {
      if (is_notify === true) {
        socket.emit("notification", {
          id,
          idOrganizer: "60e6d114960e4337a43cd9ff",
          message: `${title}  a été refusé `,
        });
        set_is_notify(false);
      }
    }
  }, [socket, is_notify]);

  const handleNotification = (type) => {
    set_is_notify(true);
  };
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
              handleNotification();
              dispatch(deleteEvent(id, history));
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
