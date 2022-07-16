import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
import { AcceptEvents } from "../../../redux/actions/EventsActions";
const AcceptConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  idorganizer,
  title,
  message,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.Name);
  const [socket, setsocket] = useState(null);

  const [is_notify, set_is_notify] = useState(false);
  //  alert(idorganizer);
  const {
    account: { role },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    setsocket(io("http://localhost:8900"));
  }, []);

  useEffect(() => {
    if (socket != null) {
      if (is_notify === true) {
        socket.emit("notification", {
          id,
          idOrganizer: "60e6d114960e4337a43cd9ff",
          message: `${title}  a été accepté `,
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
        <a>
          <Button
            variant="success"
            onClick={() => {
              dispatch(AcceptEvents(id, history));
              handleNotification();
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
