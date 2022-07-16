import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Modal from "./Modals/DeleteOrganizerModal";
import profile3 from "../../components/img/profile-3.jpg";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import axios from "../../util/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFileDownloader from "./useFileDownloader";
function OrganizerInfo() {
  const { state } = useLocation();

  const [type, setType] = useState(null);
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const saveFile = () => {
    if (state.users.CV && state.users.CV.length > 0) {
      state.users.CV.map((Ph) => {
        const url = window.URL.createObjectURL(new Blob([Ph.filename]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
      });
    }
  };

  const [downloadFile, downloaderComponentUI] = useFileDownloader();

  const download = (file) => downloadFile(file);

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setType();
    setId(id);
    setdeletMessage(null);

    setsuprimMessage(`Voulez-vous vraiment supprimer l'organisateur  ?`);

    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual deletion of the item
  const submitDelete = (id) => {
    setsuprimMessage(`The fruit was deleted successfully.`);

    setDisplayConfirmationModal(false);
  };

  return (
    <div class="main-container" id="container">
      <div id="content" class="main-content">
        <div class="layout-px-spacing">
          <div class="row layout-spacing">
            <div class="col-xl-4 col-lg-6 col-md-5 col-sm-12 layout-top-spacing">
              <div class="user-profile layout-spacing">
                <div class="widget-content widget-content-area">
                  <div class="d-flex justify-content-between">
                    <h3 class="">Info</h3>
                    <a class="mt-2 edit-profile">
                      {" "}
                      <svg
                        onClick={() => showDeleteModal(state.users.Account_id)}
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
                                    href={`/UsersInformation/${Ph.filename}`}
                                    class="img-pop"
                                  >
                                    <i class="fas fa-search"></i>
                                  </a>
                                  <img
                                    src={`/UsersInformation/${Ph.filename}`}
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
                            class="feather feather-map-pin"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>{" "}
                          {state.users.Adress}
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
                            </svg>{" "}
                            {state.users.accountname}
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
                          </svg>{" "}
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
              style={{ backgroundColor: "#081847", maxHeight: "729px" }}
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
    </div>
  );
}

export default OrganizerInfo;
