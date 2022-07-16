import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import profile3 from "../../components/img/profile-3.jpg";
import Modal from "./Modals/Deletemodal.js";
import AcceptModal from "./Modals/AcceptModal";
import useFileDownloader from "./useFileDownloader";
function InvitationInfo(props) {
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayConfirmModal, setDisplayConfirmModal] = useState(false);
  const [deletMessage, setdeletMessage] = useState(null);
  const [AcceptMessage, setAcceptMessage] = useState(null);
  const [AcceptationMessage, setAcceptationMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setdeletMessage(null);

    setsuprimMessage(`Êtes-vous sûr de vouloir supprimer l'invitation ?`);

    setDisplayConfirmationModal(true);
  };

  const showAcceptModal = (id) => {
    setId(id);
    setAcceptMessage(null);

    setAcceptationMessage(`Êtes-vous sûr de vouloir Accepter l'invitation ?`);

    setDisplayConfirmModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const hideConfirmModal = () => {
    setDisplayConfirmModal(false);
  };

  // Handle the actual deletion of the item
  const submitDelete = (id) => {
    setsuprimMessage(`The organizer was deleted successfully.`);

    setDisplayConfirmationModal(false);
  };

  const submitAccept = (id) => {
    setAcceptationMessage(`The organizer was deleted successfully.`);

    setDisplayConfirmModal(false);
  };
  const [downloadFile, downloaderComponentUI] = useFileDownloader();

  const download = (file) => downloadFile(file);
  const { state } = useLocation();
  console.log(state.users.Photo);
  return (
    <div class="main-container" id="container">
      <div id="content" class="main-content">
        <div class="layout-px-spacing">
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
                        onClick={() => showDeleteModal(state.users._id)}
                        class="mt-2 edit-profile"
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
                      <button
                        onClick={() => showAcceptModal(state.users._id)}
                        class="mt-2 edit-profile"
                      >
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
                          class="feather feather-check"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>{" "}
                    </a>
                  </div>
                  <div class="text-center user-info">
                    <div class="col-md-6 p-0">
                      <div
                        class="gallery-item"
                        style={{ height: "300px", width: "300px" }}
                      >
                        <div
                          class="gallery-thumb"
                          style={{ height: "300px", width: "300px" }}
                        >
                          {state.users.Photo && state.users.Photo.length > 0 ? (
                            state.users.Photo.map((Ph) => {
                              return (
                                <>
                                  <a
                                    href={`UsersInformation/${Ph.filename}`}
                                    class="img-pop"
                                  >
                                    <i class="fas fa-search"></i>
                                  </a>
                                  <img
                                    src={`UsersInformation/${Ph.filename}`}
                                    style={{
                                      height: "300px",
                                      width: "300px",
                                      textAlign: "center",
                                    }}
                                  />
                                </>
                              );
                            })
                          ) : (
                            <img src={`uploads/noAvatar.png`} />
                          )}
                        </div>
                      </div>
                    </div>
                    <p class="">
                      {" "}
                      {state.users.Name} {state.users.LastName}
                    </p>
                  </div>
                  <div class="user-info-list">
                    <div class="">
                      <ul
                        class="contacts-block list-unstyled"
                        style={{ maxWidth: "329px" }}
                      >
                        <li class="contacts-block__item">
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
                            class="feather feather-coffee"
                          >
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                            <line x1="6" y1="1" x2="6" y2="4"></line>
                            <line x1="10" y1="1" x2="10" y2="4"></line>
                            <line x1="14" y1="1" x2="14" y2="4"></line>
                          </svg>{" "}
                          {state.users.work_station}
                        </li>
                        <li class="contacts-block__item">
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
                            class="feather feather-calendar"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          Jan 20, 1989
                        </li>
                        <li class="contacts-block__item">
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
                            class="feather feather-map-pin"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {state.users.Adress}{" "}
                        </li>
                        <li class="contacts-block__item">
                          <a href="mailto:example@mail.com">
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
                              class="feather feather-mail"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            {state.users.email}
                          </a>
                        </li>
                        <li class="contacts-block__item">
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
                            class="feather feather-phone"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          {state.users.PhoneNumber}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing"
              style={{ backgroundColor: "#081847", maxHeight: "780px" }}
            >
              <div class="bio layout-spacing ">
                <div class="widget-content widget-content-area">
                  <h3 class="">Bio</h3>

                  <p>{state.users.Descriptions}</p>

                  <div class="bio-skill-box">
                    <div class="row">
                      <div
                        class="col-12 col-xl-6 col-lg-12 mb-xl-5 mb-5 "
                        style={{ backgroundColor: "transparent" }}
                      >
                        <div class="d-flex b-skills">
                          <div></div>
                          <div class="">
                            <h3>Société</h3>
                            <div class="timeline-alter">
                              <div class="item-timeline">
                                <div class="t-meta-date">
                                  <p class="">
                                    <b> Nom: </b>&nbsp; &nbsp;{" "}
                                    {state.users.Nom_Society}{" "}
                                  </p>
                                </div>
                              </div>
                              <div class="item-timeline">
                                <div class="t-meta-date">
                                  <p class="">
                                    <b>Email: </b>&nbsp; &nbsp;{" "}
                                    {state.users.Email_Society}
                                  </p>
                                </div>
                              </div>
                              <div class="item-timeline">
                                <div class="t-meta-date">
                                  <p class="">
                                    <b>Téléphone:</b> &nbsp; &nbsp;
                                    {state.users.Telphn_Society}{" "}
                                  </p>
                                </div>
                              </div>

                              <div class="item-timeline">
                                <div class="t-meta-date">
                                  <p class="">
                                    <b>Adresse:</b>&nbsp; &nbsp;
                                    {state.users.adresse_Society}{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-xl-6 col-lg-12 mb-xl-5 mb-5 ">
                        <div class="d-flex b-skills">
                          <div></div>
                          <div class="">
                            <h3>CV</h3>
                            {state.users.CV && state.users.CV.length > 0
                              ? state.users.CV.map((Ph) => {
                                  return (
                                    <>
                                      <a
                                        className="btn btn-primary cursor-pointer text-white"
                                        onClick={() =>
                                          download({
                                            name: Ph.fieldname,
                                            thumb: `/UsersInformation/${Ph.filename}`,
                                            file: `/UsersInformation/${Ph.filename}`,
                                            filename: `cv ${state.users.LastName}`,
                                          })
                                        }
                                      >
                                        Télécharger{" "}
                                        <i
                                          class="fa fa-download"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                      {/*           <button
                                        class="btn btn-danger mb-2 mr-2"
                                        onClick={() =>
                                          download(
                                            "https://images.unsplash.com/photo-1604264849633-67b1ea2ce0a4?rnd="
                                          )
                                        }
                                      >
                                        Télécharger &nbsp;&nbsp;
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
                                          class="feather feather-download"
                                        >
                                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                          <polyline points="7 10 12 15 17 10"></polyline>
                                          <line
                                            x1="12"
                                            y1="15"
                                            x2="12"
                                            y2="3"
                                          ></line>
                                        </svg>{" "}
                                      </button> */}
                                    </>
                                  );
                                })
                              : null}
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
      </div>
      {downloaderComponentUI}
      <Modal
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        id={id}
        message={suprimMessage}
      />

      <AcceptModal
        showModal={displayConfirmModal}
        confirmModal={submitAccept}
        hideModal={hideConfirmModal}
        id={id}
        message={AcceptationMessage}
      />
    </div>
  );
}

export default InvitationInfo;
