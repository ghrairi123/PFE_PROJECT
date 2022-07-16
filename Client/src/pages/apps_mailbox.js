import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  GET_THREE_MESSAGE,
  GET_MESSAGES,
} from "../redux/actions/Contact_Us_Action";
import axios from "../util/axios";
import ReactPaginate from "react-paginate";

import Modal from "./Deletemodal";

function Apps_mailbox() {
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayConfirmModal, setDisplayConfirmModal] = useState(false);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [offset, setoffset] = useState(0);
  const [tableData, settableData] = useState([]);
  const [orgtableData, setorgtableData] = useState([]);
  const [perPage, setperPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);

  const dispatch = useDispatch();
  const MESSAGE = useSelector((state) => state.Contact.messages);
  // Handle the displaying of the modal based on type and id
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
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setcurrentPage(selectedPage);
    setoffset(offset);
    loadMoreData();
  };
  const loadMoreData = () => {
    const data = orgtableData;

    const slice = data.slice(offset, offset + perPage);
    setpageCount(Math.ceil(data.length / perPage));
    settableData(slice);
  };
  useEffect(() => {
    const evts = () => {
      axios.get(`/api/message`).then((res) => {
        var data = res.data.messag;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.messag);
        settableData(slice);
      });
    };
    const interval = setInterval(() => {
      // console.log("salut")
      evts();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div class="alt-menu sidebar-noneoverflow">
      <div class="main-container" id="container">
        <br />

        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="row layout-spacing layout-top-spacing" id="cancel-row">
              <div class="col-lg-12">
                <div class="widget-content searchable-container list">
                  <div class="row">
                    <div class="col-xl-4 col-lg-5 col-md-5 col-sm-7 filtered-list-search layout-spacing align-self-center">
                      <form class="form-inline my-2 my-lg-0">
                        <div class="">
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
                            class="feather feather-search"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                          <input
                            type="text"
                            class="form-control product-search"
                            id="input-search"
                            placeholder="Rechercher..."
                          />
                        </div>
                      </form>
                    </div>

                    <div class="col-xl-8 col-lg-7 col-md-7 col-sm-5 text-sm-right text-center layout-spacing align-self-center">
                      <div class="d-flex justify-content-sm-end justify-content-center">
                        <div class="switch align-self-center">
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
                            class="feather feather-list view-list active-view "
                          >
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3" y2="6"></line>
                            <line x1="3" y1="12" x2="3" y2="12"></line>
                            <line x1="3" y1="18" x2="3" y2="18"></line>
                          </svg>
                          &nbsp;&nbsp;
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
                            class="feather feather-grid view-grid "
                          >
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                          </svg>
                        </div>
                      </div>

                      <div
                        class="modal fade"
                        id="addContactModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="addContactModalTitle"
                        aria-hidden="true"
                      >
                        <div
                          class="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div class="modal-content">
                            <div class="modal-body">
                              <i
                                class="flaticon-cancel-12 close"
                                data-dismiss="modal"
                              ></i>
                              <div class="add-contact-box">
                                <div class="add-contact-content">
                                  <form id="addContactModalTitle">
                                    <div class="row">
                                      <div class="col-md-6">
                                        <div class="contact-name">
                                          <i class="flaticon-user-11"></i>
                                          <input
                                            type="text"
                                            id="c-name"
                                            class="form-control"
                                            placeholder="Name"
                                          />
                                          <span class="validation-text"></span>
                                        </div>
                                      </div>
                                      <div class="col-md-6">
                                        <div class="contact-email">
                                          <i class="flaticon-mail-26"></i>
                                          <input
                                            type="text"
                                            id="c-email"
                                            class="form-control"
                                            placeholder="Email"
                                          />
                                          <span class="validation-text"></span>
                                        </div>
                                      </div>
                                    </div>

                                    <div class="row">
                                      <div class="col-md-6">
                                        <div class="contact-occupation">
                                          <i class="flaticon-fill-area"></i>
                                          <input
                                            type="text"
                                            id="c-occupation"
                                            class="form-control"
                                            placeholder="Occupation"
                                          />
                                        </div>
                                      </div>

                                      <div class="col-md-6">
                                        <div class="contact-phone">
                                          <i class="flaticon-telephone"></i>
                                          <input
                                            type="text"
                                            id="c-phone"
                                            class="form-control"
                                            placeholder="Phone"
                                          />
                                          <span class="validation-text"></span>
                                        </div>
                                      </div>
                                    </div>

                                    <div class="row">
                                      <div class="col-md-12">
                                        <div class="contact-location">
                                          <i class="flaticon-location-1"></i>
                                          <input
                                            type="text"
                                            id="c-location"
                                            class="form-control"
                                            placeholder="Location"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="searchable-items list">
                    <div class="items items-header-section">
                      <div class="item-content">
                        <div class="">
                          <h4></h4>
                        </div>

                        <div class="user-email">
                          <h4>Nom</h4>
                        </div>
                        <div class="user-location">
                          <h4 style={{ marginLeft: "0px" }}>Sujet</h4>
                        </div>
                        <div class="user-phone">
                          <h4 style={{ marginLeft: "3px" }}>Date</h4>
                        </div>
                        <div class="action-btn">
                          <h4> Action </h4>{" "}
                        </div>
                      </div>
                    </div>
                    {tableData && tableData.length > 0 ? (
                      tableData.map((msg) => {
                        let date1 = new Date(msg.createdAt);
                        console.log(date1);
                        let jourSemaine = date1.getDay();
                        let jourMois = date1.getDate();
                        let mois = date1.getMonth();
                        let annee = date1.getFullYear();
                        let heures = date1.getHours();
                        let minutes = date1.getMinutes();
                        console.log(jourSemaine);
                        console.log(jourMois);
                        console.log(mois);
                        console.log(annee);
                        const evt = new Date(
                          Date.UTC(annee, mois, jourMois, heures, minutes, 0)
                        );

                        const Y = { heures: "numeric", minutes: "numeric" };

                        console.log(evt.toLocaleDateString(undefined, Y));

                        return (
                          <>
                            <div class="items">
                              <div class="item-content">
                                <div class="user-profile">
                                  <div class="user-meta-info">
                                    <p class="user-name" data-name="Alan Green">
                                      {msg.Username}
                                    </p>
                                  </div>
                                </div>

                                <div class="user-email">
                                  <p class="info-title">Nom: </p>
                                  <p
                                    class="usr-email-addr"
                                    data-email="alan@mail.com"
                                  >
                                    {msg.Username}
                                  </p>
                                </div>
                                <div class="user-location">
                                  <p class="info-title">Sujet: </p>
                                  <p
                                    class="usr-location"
                                    data-location="Boston, USA"
                                  >
                                    {msg.Subject}
                                  </p>
                                </div>
                                <div class="user-phone">
                                  <p class="info-title">Date: </p>
                                  <p
                                    class="usr-ph-no"
                                    data-phone="+1 (070) 123-4567"
                                  >
                                    {" "}
                                    {evt.toLocaleDateString(undefined, Y)}
                                  </p>
                                </div>
                                <div class="action-btn">
                                  <Link
                                    to={{
                                      pathname: `/MessageDetails`,
                                      state: { message: msg },
                                    }}
                                  >
                                    <button
                                      style={{
                                        backgroundColor: "#009688",
                                        border: "none",
                                        color: "white",
                                        width: "50px",
                                        height: "35px",
                                        textAlign: "center",
                                        textDecoration: "none",
                                        display: "inline-block",
                                      }}
                                    >
                                      Détail
                                    </button>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <a>
                                    <button
                                      style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        color: "red",
                                        width: "50px",
                                        height: "35px",
                                        textAlign: "center",
                                        textDecoration: "none",
                                        display: "inline-block",
                                      }}
                                    >
                                      <svg
                                        onClick={() => showDeleteModal(msg._id)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-trash-2  delete-multiple"
                                      >
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line
                                          x1="10"
                                          y1="11"
                                          x2="10"
                                          y2="17"
                                        ></line>
                                        <line
                                          x1="14"
                                          y1="11"
                                          x2="14"
                                          y2="17"
                                        ></line>
                                      </svg>
                                    </button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div>
                        <img
                          src="assets/Spinner-1s-200px.gif"
                          style={{
                            width: "100px",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "200px",
                          }}
                        />
                      </div>
                    )}{" "}
                  </div>
                  <ReactPaginate
                    previousLabel={"Préc"}
                    nextLabel={"Suiv"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          showModal={displayConfirmationModal}
          confirmModal={submitDelete}
          hideModal={hideConfirmationModal}
          id={id}
          message={suprimMessage}
        />
      </div>
    </div>
  );
}

export default Apps_mailbox;
