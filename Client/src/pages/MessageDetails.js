import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Email from "./Events/Modals/SendMail";
import Modal from "./Deletemodal";

function MessageDetails(props) {
  const [id, setId] = useState(null);

  const { state } = useLocation();
  const [displayConfirmationmailModal, setdisplayConfirmationmailModal] =
    useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayConfirmModal, setDisplayConfirmModal] = useState(false);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);

  const showDeleteModal = (id) => {
    setId(id);
    setdeletMessage(null);

    setsuprimMessage(`Êtes-vous sûr de vouloir supprimer le message ?`);

    setDisplayConfirmationModal(true);
  };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  // Handle the actual deletion of the item
  const submitDelete = (id) => {
    setsuprimMessage(`The organizer was deleted successfully.`);

    setDisplayConfirmationModal(false);
  };
  const submitMail = () => {
    setdisplayConfirmationmailModal(false);
  };

  const showMailModal = () => {
    setdisplayConfirmationmailModal(true);
  };
  const hideConfirmationMailModal = () => {
    setdisplayConfirmationmailModal(false);
  };
  return (
    <div class="main-container" id="container">
      <div id="content" class="main-content">
        <div
          class="layout-px-spacing"
          style={{ marginLeft: "338px", marginRight: "-572px" }}
        >
          <div class="row layout-spacing">
            <div class="col-xl-4 col-lg-6 col-md-5 col-sm-12 layout-top-spacing">
              <div class="user-profile layout-spacing">
                <div
                  class="widget-content widget-content-area"
                  style={{ backgroundColor: "#081847" }}
                >
                  <div class="d-flex justify-content-between">
                    <h3 class="">Info</h3>
                    <a>
                      <button
                        class="mt-2 edit-profile"
                        onClick={() => showDeleteModal(state.message._id)}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-trash-2"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </a>
                    <a>
                      {" "}
                      <button
                        class="mt-2 edit-profile"
                        onClick={() => showMailModal()}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-envelope"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                        </svg>
                      </button>
                    </a>
                  </div>
                  <div class="text-center user-info">
                    <div class="col-md-6 p-0"></div>
                    <p class=""> {state.message.Subject} </p>
                  </div>
                  <div class="user-info-list">
                    <div class="">
                      <ul class="contacts-block list-unstyled">
                        <li class="contacts-block__item">
                          <b>Nom:</b> &nbsp; &nbsp; &nbsp;
                          {state.message.Username}
                        </li>
                        <li class="contacts-block__item">
                          <b>Email:</b>&nbsp; &nbsp; &nbsp;
                          {state.message.email_User}
                        </li>
                      </ul>
                      <div class="widget-content widget-content-area">
                        <h3 class="">Message</h3>

                        <p>{state.message.Messg}</p>

                        <div class="bio-skill-box">
                          <div class="row"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Email
        showModal={displayConfirmationmailModal}
        confirmModal={submitMail}
        hideModal={hideConfirmationMailModal}
        name={state.message.Username}
        email={state.message.email_User}
      />
      <Modal
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        id={id}
        message={suprimMessage}
      />
    </div>
  );
}

export default MessageDetails;
