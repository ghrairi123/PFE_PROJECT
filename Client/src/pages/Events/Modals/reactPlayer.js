import React, { Component } from "react";
import ReactPlayer from "react-player";

import { Modal, Button } from "react-bootstrap";

const Modalvideo = ({ showModal, hideModal,Url, confirmModal }) => {
 console.log(Url)
    return (
        <Modal show={showModal} onHide={hideModal}   styles={{
            modal: {
              maxWidth: "unset",
              width: "100%",
              padding: "unset"
            },
            overlay: {
              background: "rgba(0, 0, 0, 0.5)"
            },
            closeButton: {
              background: "yellow"
            }
          }}>
        <ReactPlayer  
          url={Url}
          width="100%"
          height="calc(100vh - 100px)"
        />
     </Modal>
    )
}
export default Modalvideo;
