import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrganizer } from "../../redux/actions/OrganizerAction";
import Modal from "./Modals/Deletemodal.js";
import AcceptModal from "./Modals/AcceptModal";
import { Link } from "react-router-dom";
import axios from "../../util/axios";
import ReactPaginate from "react-paginate";

function Invitations(props) {
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayConfirmModal, setDisplayConfirmModal] = useState(false);
  const [deletMessage, setdeletMessage] = useState(null);
  const [AcceptMessage, setAcceptMessage] = useState(null);
  const [AcceptationMessage, setAcceptationMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [SearchData, setSearchData] = useState("");
  const [offset, setoffset] = useState(0);
  const [tableData, settableData] = useState([]);
  const [orgtableData, setorgtableData] = useState([]);
  const [perPage, setperPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
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
  const dispatch = useDispatch();
  const organizer = useSelector((state) => state.Organizer.organizers);
  console.log(organizer);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(getAllOrganizer());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      axios.get(`/organizer`).then((res) => {
        var data = res.data;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data);
        settableData(slice);
      });
    };
    /* .then((response) => console.log(response))
            .then(({ totalPages, Event }) => {
              setEvent(Event);
              setNumberOfPages(totalPages);
            }); */
    evts();
  }, []);
  return (
    <div class="main-container" id="container">
      <br />

      <div id="content" class="main-content">
        <div class="layout-px-spacing">
          <div class="row layout-top-spacing" id="cancel-row">
            <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
              <br />
              <div
                class="widget-content widget-content-area br-6"
                style={{ backgroundColor: "#081847" }}
              >
                <div class="table-responsive mb-4 mt-4">
                  <div class="col-lg-9 mb-50 mb-lg-0">
                    <div class="filter-tab" style={{ width: "1200px" }}>
                      <div class="filter-area">
                        <div class="filter-main">
                          <div class="left w-100 justify-content-between">
                            <div class="item">
                              <span class="show">
                                Affichage: {organizer.length} Invitation(s)
                              </span>
                            </div>
                            <div class="item mr-0">
                              <input
                                type="text"
                                placeholder="Recherche:"
                                onChange={(evnt) => {
                                  setSearchData(evnt.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  {tableData && tableData.length > 0 ? (
                    <table
                      class="table table-striped table-bordered"
                      style={{
                        width: "1200px",
                        height: "120px",
                        marginLeft: "1em",
                        backgroundColor: "#081847",
                      }}
                    >
                      <thead>
                        <tr>
                          <th>id</th>
                          <th>Photo</th>
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Téléphone</th>
                          <th>email</th>
                          <th>adresse</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData
                          .filter((org) => {
                            if (SearchData == "") return org;
                            else if (
                              org.Name.toLowerCase().includes(
                                SearchData.toLowerCase()
                              )
                            ) {
                              return org;
                            } else if (
                              org.LastName.toLowerCase().includes(
                                SearchData.toLowerCase()
                              )
                            ) {
                              return org;
                            } else if (
                              org.email
                                .toLowerCase()
                                .includes(SearchData.toLowerCase())
                            ) {
                              return org;
                            }
                          })
                          .map((org, index) => {
                            return (
                              <>
                                {" "}
                                <tr>
                                  <td>{index}</td>
                                  <td>
                                    {org.Photo && org.Photo.length > 0 ? (
                                      org.Photo.map((Ph) => {
                                        return (
                                          <>
                                            <img
                                              src={
                                                Ph
                                                  ? `UsersInformation/${Ph.filename}`
                                                  : `uploads/noAvatar.png`
                                              }
                                              style={{
                                                height: "60px",
                                                width: "60px",
                                                textAlign: "center",
                                                margin: "auto",
                                                display: "flex",
                                              }}
                                            />
                                          </>
                                        );
                                      })
                                    ) : (
                                      <img
                                        src={`uploads/noAvatar.png`}
                                        style={{
                                          height: "60px",
                                          width: "60px",
                                          textAlign: "center",
                                          margin: "auto",
                                          display: "flex",
                                        }}
                                      />
                                    )}
                                  </td>
                                  <td>{org.Name}</td>
                                  <td>{org.LastName}</td>
                                  <td>{org.PhoneNumber}</td>
                                  <td>{org.email}</td>
                                  <td>{org.Adress}</td>
                                  <td>
                                    <Link
                                      to={{
                                        pathname: `/InvitationInfo`,
                                        state: { users: org },
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
                                          color: "white",
                                          width: "50px",
                                          height: "35px",
                                          textAlign: "center",
                                          textDecoration: "none",
                                          display: "inline-block",
                                        }}
                                      >
                                        <svg
                                          onClick={() =>
                                            showAcceptModal(org._id)
                                          }
                                          style={{ color: "#32CD32" }}
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          class="feather feather-user-check"
                                        >
                                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                          <circle
                                            cx="8.5"
                                            cy="7"
                                            r="4"
                                          ></circle>
                                          <polyline points="17 11 19 13 23 9"></polyline>
                                        </svg>
                                      </button>
                                    </a>
                                    <a>
                                      <button
                                        style={{
                                          backgroundColor: "transparent",
                                          border: "none",
                                          color: "white",
                                          width: "50px",
                                          height: "35px",
                                          textAlign: "center",
                                          textDecoration: "none",
                                          display: "inline-block",
                                        }}
                                      >
                                        <svg
                                          onClick={() =>
                                            showDeleteModal(org._id)
                                          }
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          class="feather feather-user-minus delete"
                                        >
                                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                          <circle
                                            cx="8.5"
                                            cy="7"
                                            r="4"
                                          ></circle>
                                          <line
                                            x1="23"
                                            y1="11"
                                            x2="17"
                                            y2="11"
                                          ></line>
                                        </svg>
                                      </button>
                                    </a>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </table>
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
                  )}
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
      </div>

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

export default Invitations;
