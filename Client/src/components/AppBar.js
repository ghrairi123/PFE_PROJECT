import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Badge, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getThreeOrganizer,
  getAllOrganizer,
} from "../redux/actions/OrganizerAction";
import { getUserData } from "../redux/actions/authActions";
import { io } from "socket.io-client";
import {
  getThreeEvents,
  Get_Request_Events,
} from "../redux/actions/EventsActions";
import { getEventReview } from "../redux/actions/EventsActions";

import { getNotifications } from "../redux/actions/Notification";
import axios from "../util/axios";

import {
  GET_THREE_MESSAGE,
  GET_MESSAGES,
} from "../redux/actions/Contact_Us_Action";
import { useHistory } from "react-router";
import { logoutAction } from "../redux/actions/authActions";
// core components
import myImg from "./img/logo.svg";
import AcceptModal from "../pages/Organizer/Modals/AcceptModal";
import Modal from "../pages/Organizer/Modals/Deletemodal";
import { fetchCategory } from "../redux/actions/CategoryActions";
function AppBarPrimary() {
  const [id, setId] = useState(null);
  const [idOrganizer, setidOrganizer] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayConfirmModal, setDisplayConfirmModal] = useState(false);
  const [deletMessage, setdeletMessage] = useState(null);
  const [AcceptMessage, setAcceptMessage] = useState(null);
  const [AcceptationMessage, setAcceptationMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [EventReview, setEventReview] = useState([]);

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
  const changeComps = (e) => {
    alert(e);
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

  //const NotificationCount=0;
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.category.categories.categories
  );
  console.log(categories);
  const organizer = useSelector((state) => state.Organizer.threeorganizers);
  console.log(organizer);
  const Allorganizer = useSelector((state) => state.Organizer.organizers);
  const Events = useSelector((state) => state.event.threeEvents);
  const MESSAGE = useSelector((state) => state.Contact.messages);
  const threeMessage = useSelector((state) => state.Contact.three_messages);
  const Notification = useSelector((state) => state.Notification.notifyevent);
  const request_evnts = useSelector((state) => state.event.RequestEvt);
  const [name, Setname] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const user = useSelector((state) => state.auth.Name);
  const [socket, setsocket] = useState(null);

  const userid = localStorage.getItem("idConnected");
  useEffect(() => {
    const evts = () => {
      axios.get(`/api/Event_user/${userid}`).then((res) => {
        setEventReview(res.data.event);
      });
    };
    const interval = setInterval(() => {
      evts();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const {
    account: { role },
    _id,
    authenticated,
    Photo,
    LastName,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    setsocket(io("http://localhost:8900"));
  }, []);
  useEffect(() => {
    if (socket != null) socket.emit("newUser", LastName);
  }, [socket, LastName]);
  /*   useEffect(() => {
    socket.current.emit("addUser", user.account.email);
  }, [socket, user]); */

  const [n_data, setn_data] = useState({});

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  useEffect(() => {
    if (Object.keys(n_data).length > 0) {
      if (n_data.idOrganizer == _id) {
        setn_data({});
        dispatch(getNotifications(_id));

        alert(n_data.message);
      }
    }
  }, [n_data]);

  useEffect(() => {
    if (socket != null) {
      socket.on("getNotification", (data) => {
        setn_data(data);
        //setNotifications((prev) => [...prev, data]);
        // setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  console.log(notifications);
  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "accept Events";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };
  console.log(Notification);
  // NotificationCount=Events.length;
  //console.log(NotificationCount)
  console.log(threeMessage);
  console.log(Events);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(getThreeOrganizer());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getNotifications(_id));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(GET_THREE_MESSAGE());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleSEARCHChange = (evt) => {
    Setname(evt.target.value);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(GET_MESSAGES());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(getAllOrganizer());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(getThreeEvents());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(Get_Request_Events());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutAction(history));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(getNotifications(userid));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  console.log(name);
  return (
    <div>
      {authenticated ? (
        role === "admin" ? (
          <div class="alt-menu sidebar-noneoverflow">
            <div class="header-container">
              <header class="header navbar navbar-expand-sm">
                <a
                  href="javascript:void(0);"
                  class="sidebarCollapse"
                  data-placement="bottom"
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
                    class="feather feather-menu"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </a>

                <div class="logo">
                  <a href="index.html">
                    <img src="assets/images/logo/logo.png" alt="logo" />
                  </a>
                </div>

                <ul class="navbar-item flex-row mr-auto">
                  <li class="nav-item align-self-center search-animated">
                    <form
                      class="form-inline search-full form-inline search"
                      role="search"
                    >
                      <Link
                        to={{
                          pathname: `/SearchPage`,
                          state: { name: name },
                        }}
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
                          class="feather feather-search toggle-search"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </Link>
                      <div class="search-bar">
                        <input
                          onChange={handleSEARCHChange}
                          type="text"
                          class="form-control search-form-control  ml-lg-auto"
                          placeholder="trouver un organisateur ..."
                        />
                      </div>
                    </form>
                  </li>
                </ul>

                <ul class="navbar-item flex-row nav-dropdowns">
                  <li class="nav-item dropdown notification-dropdown">
                    <a
                      href="javascript:void(0);"
                      class="nav-link dropdown-toggle"
                      id="notificationDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <Badge
                        count={request_evnts.length}
                        showZero
                        style={{
                          position: "absolute",
                          right: "-10px",
                          top: "-10px",
                          minWidth: "10px",
                          minHeight: "10px",
                          lineHeight: "10px",
                          padding: "5px",
                          color: "#fff",
                          backgroundColor: "#bf1f1f",
                          fontSize: "10px",
                          borderRadius: "20px",
                          border: "solid 1px #c93a3a",
                        }}
                      >
                        <i
                          class="fas fa-calendar-plus"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </Badge>
                    </a>
                    <div
                      class="dropdown-menu position-absolute animated fadeInUp"
                      aria-labelledby="notificationDropdown"
                    >
                      <div class="notification-scroll">
                        {Events && Events.length > 0
                          ? Events.slice(0, 3).map((events, index) => {
                              return (
                                <>
                                  <div class="dropdown-item">
                                    <div class="media server-log">
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
                                        class="feather feather-youtube"
                                      >
                                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                      </svg>
                                      <div class="media-body">
                                        <div class="data-info">
                                          <Link
                                            to={{
                                              pathname: `/DetailsEvents`,
                                              state: { events: events },
                                            }}
                                          >
                                            <h6 class="">{events.Title}</h6>
                                            <p class="">{events.StartDate}</p>
                                          </Link>{" "}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })
                          : null}{" "}
                      </div>{" "}
                      <br />
                      {Events && Events.length > 0 ? (
                        <div class="dropdown-item">
                          <div class="media server-log">
                            <a href="/RequestEvent">
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "white",
                                  width: "200px",
                                  textAlign: "center",
                                  textDecoration: "none",
                                  display: "inline-block",
                                }}
                              >
                                <b
                                  style={{
                                    color: "#009688",
                                    fontSize: "20px",
                                  }}
                                >
                                  Voir plus
                                </b>
                              </button>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <h6>Aucune nouvelle Evénement</h6>
                      )}
                    </div>
                  </li>
                  <li class="nav-item dropdown notification-dropdown">
                    <a
                      href="javascript:void(0);"
                      class="nav-link dropdown-toggle"
                      id="notificationDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <Badge
                        count={MESSAGE.length}
                        showZero
                        style={{
                          position: "absolute",
                          right: "-10px",

                          top: "-10px",
                          minWidth: "10px",
                          minHeight: "10px",
                          lineHeight: "10px",
                          padding: "5px",
                          color: "#fff",
                          backgroundColor: "#bf1f1f",
                          fontSize: "10px",
                          borderRadius: "20px",
                          border: "solid 1px #c93a3a",
                        }}
                      >
                        <i
                          class="fas fa-comment-dots"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </Badge>
                    </a>
                    <div
                      class="dropdown-menu position-absolute animated fadeInUp"
                      aria-labelledby="notificationDropdown"
                    >
                      <div class="notification-scroll">
                        {threeMessage && threeMessage.length > 0
                          ? threeMessage.map((msg) => {
                              return (
                                <>
                                  <div class="dropdown-item">
                                    <div class="media server-log">
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
                                        class="feather feather-corner-down-left"
                                      >
                                        <polyline points="9 10 4 15 9 20"></polyline>
                                        <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                                      </svg>
                                      <div class="media-body">
                                        <div class="data-info">
                                          <h6 class="">{msg.Username}</h6>
                                          <p class="">{msg.Subject}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })
                          : null}
                        {threeMessage && threeMessage.length > 0 ? (
                          <div class="dropdown-item">
                            <div class="media server-log">
                              <a href="/apps_mailbox">
                                <button
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "white",
                                    width: "200px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    display: "inline-block",
                                  }}
                                >
                                  <b
                                    style={{
                                      color: "#009688",
                                      fontSize: "20px",
                                    }}
                                  >
                                    Voir plus
                                  </b>
                                </button>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <h6>Aucun Message</h6>
                        )}
                      </div>
                    </div>
                  </li>
                  <li class="nav-item dropdown notification-dropdown">
                    <a
                      href="javascript:void(0);"
                      class="nav-link dropdown-toggle"
                      id="notificationDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <Badge
                        count={Allorganizer.length}
                        showZero
                        style={{
                          position: "absolute",
                          right: "-10px",
                          top: "-10px",
                          minWidth: "10px",
                          minHeight: "10px",
                          lineHeight: "10px",
                          padding: "5px",
                          color: "#fff",
                          backgroundColor: "#bf1f1f",
                          fontSize: "10px",
                          borderRadius: "20px",
                          border: "solid 1px #c93a3a",
                        }}
                      >
                        <i style={{ fontSize: "20px" }} class="fas fa-bell"></i>
                      </Badge>{" "}
                    </a>
                    <div
                      class="dropdown-menu position-absolute animated fadeInUp"
                      aria-labelledby="notificationDropdown"
                    >
                      <div class="notification-scroll">
                        {organizer && organizer.length > 0
                          ? organizer.map((org) => {
                              return (
                                <>
                                  <div class="dropdown-item">
                                    <div class="media server-log">
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
                                        class="feather feather-user-x"
                                      >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <line
                                          x1="18"
                                          y1="8"
                                          x2="23"
                                          y2="13"
                                        ></line>
                                        <line
                                          x1="23"
                                          y1="8"
                                          x2="18"
                                          y2="13"
                                        ></line>
                                      </svg>{" "}
                                      <div class="media-body">
                                        <div class="data-info">
                                          <Link
                                            to={{
                                              pathname: `/InvitationInfo`,
                                              state: { users: org },
                                            }}
                                          >
                                            <h6 class="">
                                              {org.Name} {org.LastName}
                                            </h6>
                                          </Link>
                                        </div>
                                        <div class="icon-status">
                                          <svg
                                            onClick={() =>
                                              showAcceptModal(org._id)
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
                                            class="feather feather-check"
                                          >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                          </svg>
                                        </div>
                                        &nbsp;&nbsp;
                                        <div class="icon-status">
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
                                            class="feather feather-x"
                                          >
                                            <line
                                              x1="18"
                                              y1="6"
                                              x2="6"
                                              y2="18"
                                            ></line>
                                            <line
                                              x1="6"
                                              y1="6"
                                              x2="18"
                                              y2="18"
                                            ></line>
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })
                          : null}
                        {organizer && organizer.length > 0 ? (
                          <div class="dropdown-item">
                            <div class="media server-log">
                              <a href="/Invitations">
                                <button
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "white",
                                    width: "200px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    display: "inline-block",
                                  }}
                                >
                                  <b
                                    style={{
                                      color: "#009688",
                                      fontSize: "20px",
                                    }}
                                  >
                                    Voir plus
                                  </b>
                                </button>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <h6>Aucune Notification</h6>
                        )}
                      </div>
                    </div>
                  </li>
                  <li class="nav-item dropdown user-profile-dropdown order-lg-0 order-1">
                    <a
                      href="javascript:void(0);"
                      class="nav-link dropdown-toggle user"
                      id="user-profile-dropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <div class="media">
                        <div class="user-img">
                          <div class="avatar avatar-xl">
                            {Photo && Photo.length > 0 ? (
                              Photo.map((Ph) => {
                                return (
                                  <>
                                    <img
                                      src={`UsersInformation/${Ph.filename}`}
                                    />
                                  </>
                                );
                              })
                            ) : (
                              <img src={`uploads/noAvatar.png`} />
                            )}
                          </div>
                        </div>
                        <div class="media-body align-self-center">
                          <h6>
                            <span>BIENVENUE,</span> {LastName}
                          </h6>
                        </div>
                      </div>
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
                        class="feather feather-chevron-down"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </a>
                    <div
                      class="dropdown-menu position-absolute animated fadeInUp"
                      aria-labelledby="user-profile-dropdown"
                    >
                      <div class="">
                        <div class="dropdown-item">
                          <a class="" href="/Account">
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
                              class="feather feather-user"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Mon profil
                          </a>
                        </div>
                        <div class="dropdown-item">
                          <a class="" href="/apps_mailbox">
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
                              class="feather feather-inbox"
                            >
                              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                            </svg>{" "}
                            Boîte de réception
                          </a>
                        </div>

                        <div class="dropdown-item">
                          <a class="" onClick={handleLogout} variant="outlined">
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
                              class="feather feather-log-out"
                            >
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                              <polyline points="16 17 21 12 16 7"></polyline>
                              <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Déconnexion
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </header>
            </div>
            <div class="main-container" id="container">
              <div class="overlay"></div>
              <div class="search-overlay"></div>

              <div class="topbar-nav header navbar" role="banner">
                <nav id="topbar">
                  <ul class="navbar-nav theme-brand flex-row  text-center">
                    <li class="nav-item theme-logo">
                      <a href="index-2.html">
                        <img src={myImg} class="navbar-logo" alt="logo" />
                      </a>
                    </li>
                    <li class="nav-item theme-text">
                      <div class="logo">
                        <a href="index.html">
                          <img src="assets/images/logo/logo.png" alt="logo" />
                        </a>
                      </div>
                    </li>
                  </ul>

                  <ul class="list-unstyled menu-categories" id="topAccordion">
                    <li class="menu single-menu active">
                      <a href="/" aria-expanded="false" class="dropdown-toggle">
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
                            class="feather feather-home"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          <span>Tableau de bord</span>
                        </div>
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </a>
                    </li>

                    <li class="menu single-menu">
                      <a
                        href="/categories"
                        aria-expanded="false"
                        class="dropdown-toggle"
                      >
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
                            class="feather feather-clipboard"
                          >
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect
                              x="8"
                              y="2"
                              width="8"
                              height="4"
                              rx="1"
                              ry="1"
                            ></rect>
                          </svg>
                          <span>catégories</span>{" "}
                        </div>
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </a>
                    </li>

                    <li class="menu single-menu">
                      <a
                        href="/ListSubCategories"
                        aria-expanded="false"
                        class="dropdown-toggle"
                      >
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
                            class="feather feather-corner-down-right"
                          >
                            <polyline points="15 10 20 15 15 20"></polyline>
                            <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                          </svg>
                          <span>Sous_catégories</span>
                        </div>
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </a>
                    </li>
                    <li class="menu single-menu ">
                      <a
                        href="/ActiveEvents"
                        aria-expanded="false"
                        class="dropdown-toggle"
                      >
                        <div class="">
                          <svg
                            width="1em"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-box"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4v8z"
                            />
                          </svg>{" "}
                          <span>Événements</span>
                        </div>
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </a>
                    </li>
                    {/*     <li class="menu single-menu">
                      <a
                        href="#page"
                        data-toggle="collapse"
                        aria-expanded="false"
                        class="dropdown-toggle"
                        href="/categoList"
                      >
                        <div class="">
                          <svg
                            width="1em"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-box"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4v8z"
                            />
                          </svg>{" "}
                          <span>Événements</span>
                        </div>
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </a>
                      {/*               <ul
                        class="collapse submenu list-unstyled"
                        id="page"
                        data-parent="#topAccordion"
                      >
                        {categories && categories.length > 0
                          ? categories.map((cate) => {
                              const catt = cate.children;
                              console.log(catt);
                              return (
                                <>
                                  {catt && catt.length > 0 ? (
                                    <li class="sub-sub-submenu-list">
                                      <a
                                        data-toggle="collapse"
                                        aria-expanded="false"
                                        class="dropdown-toggle"
                                      >
                                        {" "}
                                        {cate.name}{" "}
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
                                          class="feather feather-chevron-right"
                                        >
                                          <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>{" "}
                                      </a>
                                      <ul
                                        class="collapse list-unstyled sub-submenu"
                                        id="pages-error"
                                        data-parent="#more"
                                      >
                                        {catt && catt.length > 0
                                          ? catt.map((cat) => {
                                              return (
                                                <>
                                                  <li>
                                                    <Link
                                                      to={{
                                                        pathname: `/ActiveEvents`,
                                                        state: { events: cat },
                                                      }}
                                                    >
                                                      {" "}
                                                      {cat.name}{" "}
                                                    </Link>
                                                  </li>
                                                </>
                                              );
                                            })
                                          : null}{" "}
                                      </ul>
                                    </li>
                                  ) : null}{" "}
                                </>
                              );
                            })
                          : null}{" "}
                      </ul> 
                    </li> */}

                    <li class="menu single-menu">
                      <a
                        href="/OrganizerList"
                        aria-expanded="false"
                        class="dropdown-toggle"
                      >
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
                            class="feather feather-users"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>Organisateurs</span>
                        </div>
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </a>
                    </li>
                    <li class="menu single-menu">
                      <a
                        href="/ClientList"
                        aria-expanded="false"
                        class="dropdown-toggle"
                      >
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
                            class="feather feather-users"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>Clients</span>
                        </div>
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>
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
            </div>{" "}
          </div>
        ) : role === "organisateur" ? (
          <div class="alt-menu sidebar-noneoverflow">
            <div class="header-container">
              <header class="header navbar navbar-expand-sm">
                <a
                  href="javascript:void(0);"
                  class="sidebarCollapse"
                  data-placement="bottom"
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
                    class="feather feather-menu"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </a>
                <div class="logo">
                  <a href="index.html">
                    <img src="assets/images/logo/logo.png" alt="logo" />
                  </a>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <ul class="navbar-item flex-row nav-dropdowns">
                  <li class="nav-item dropdown language-dropdown more-dropdown">
                    <a href="/AddEvents">
                      <button
                        style={{
                          border: "none",
                          color: "white",
                          padding: "15px 32px",
                          textAlign: "center",
                          textDecoration: "none",
                          display: "inline-block",
                          fontSize: "16px",
                        }}
                        class="btn btn-danger"
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
                          class="feather feather-calendar mr-2"
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
                        ajouter un évènement
                      </button>
                    </a>
                  </li>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <li class="nav-item dropdown notification-dropdown">
                    <a
                      href="javascript:void(0);"
                      class="nav-link dropdown-toggle"
                      id="notificationDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <Badge
                        count={Notification.length}
                        showZero
                        style={{
                          position: "absolute",
                          right: "-10px",
                          top: "-10px",
                          minWidth: "20px",
                          minHeight: "10px",
                          lineHeight: "10px",
                          padding: "5px",
                          color: "#fff",
                          backgroundColor: "#bf1f1f",
                          fontSize: "10px",
                          borderRadius: "20px",
                          border: "solid 1px #c93a3a",
                        }}
                      >
                        <i class="fas fa-bell fa-2x"></i>
                      </Badge>{" "}
                    </a>
                    <div
                      class="dropdown-menu position-absolute animated fadeInUp"
                      aria-labelledby="notificationDropdown"
                    >
                      <div class="notification-scroll">
                        {Notification && Notification.length > 0
                          ? Notification.slice(0, 3).map((org) => {
                              return (
                                <>
                                  <div class="dropdown-item">
                                    <div class="media server-log">
                                      {org.type == true ? (
                                        <i
                                          class="fas fa-check fa-2x"
                                          style={{ color: "green" }}
                                        ></i>
                                      ) : (
                                        <i
                                          class="fa fa-times fa-2x"
                                          style={{ color: "red" }}
                                          aria-hidden="true"
                                        ></i>
                                      )}{" "}
                                      &nbsp;
                                      <div class="media-body">
                                        <div class="data-info">
                                          <h6 class="">{org.Event_Name}</h6>
                                          <p class="">{org.message}</p>
                                        </div>
                                        &nbsp;&nbsp;
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })
                          : null}
                        {Notification && Notification.length > 0 ? (
                          <div class="dropdown-item">
                            <div class="media server-log">
                              <Link
                                to={{
                                  pathname: `/AllNotifications`,
                                  state: { userid: userid },
                                }}
                              >
                                <button
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "white",
                                    width: "200px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    display: "inline-block",
                                  }}
                                >
                                  <b
                                    style={{
                                      color: "#009688",
                                      fontSize: "20px",
                                    }}
                                  >
                                    Voir plus
                                  </b>
                                </button>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <h6>Aucune Notification</h6>
                        )}
                      </div>
                    </div>
                  </li>
                  <li class="nav-item dropdown user-profile-dropdown order-lg-0 order-1">
                    <a
                      href="javascript:void(0);"
                      class="nav-link dropdown-toggle user"
                      id="user-profile-dropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <div class="media">
                        {Photo && Photo.length > 0 ? (
                          Photo.map((Ph) => {
                            return (
                              <>
                                <img src={`UsersInformation/${Ph.filename}`} />
                              </>
                            );
                          })
                        ) : (
                          <img src={`uploads/noAvatar.png`} />
                        )}

                        <div class="media-body align-self-center">
                          <h6>
                            <span>BIENVENUE,</span> {LastName}
                          </h6>
                        </div>
                      </div>
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
                        class="feather feather-chevron-down"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </a>
                    <div
                      class="dropdown-menu position-absolute animated fadeInUp"
                      aria-labelledby="user-profile-dropdown"
                    >
                      <div class="">
                        <div class="dropdown-item">
                          <a class="" href="/OrganizerProfile">
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
                              class="feather feather-user"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Mon profil
                          </a>
                        </div>

                        <div class="dropdown-item">
                          <a class="" onClick={handleLogout} variant="outlined">
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
                              class="feather feather-log-out"
                            >
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                              <polyline points="16 17 21 12 16 7"></polyline>
                              <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>{" "}
                            Déconnexion
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </header>
            </div>
            <div class="main-container" id="container">
              <div class="overlay"></div>
              <div class="search-overlay"></div>

              <div class="topbar-nav header navbar" role="banner">
                <nav id="topbar">
                  <ul class="navbar-nav theme-brand flex-row  text-center">
                    <li class="nav-item theme-logo">
                      <a href="index-2.html">
                        <img src={myImg} class="navbar-logo" alt="logo" />
                      </a>
                    </li>
                    <li class="nav-item theme-text">
                      <div class="logo">
                        <a href="index.html">
                          <img src="assets/images/logo/logo.png" alt="logo" />
                        </a>
                      </div>
                    </li>
                  </ul>

                  <ul class="list-unstyled menu-categories" id="topAccordion">
                    <li class="menu single-menu active">
                      <a href="/" aria-expanded="false" class="dropdown-toggle">
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
                            class="feather feather-home"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          <span>Statistique</span>
                        </div>
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </a>
                    </li>
                    <li class="menu single-menu ">
                      <a
                        href="/Myevents"
                        aria-expanded="false"
                        class="dropdown-toggle"
                      >
                        <div class="">
                          <svg
                            width="1em"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-box"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4v8z"
                            />
                          </svg>{" "}
                          <span>Événements</span>
                        </div>
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </a>
                    </li>
                    <li class="menu single-menu">
                      <Link
                        to={{
                          pathname: `/Avis`,
                          state: { IdEvents: _id },
                        }}
                        aria-expanded="false"
                        class="dropdown-toggle"
                      >
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
                            class="feather feather-star"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span>Avis</span>{" "}
                        </div>
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
                          class="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </Link>
                    </li>{" "}
                  </ul>
                </nav>
              </div>
            </div>{" "}
          </div>
        ) : role === "client" ? (
          <>
            <header class="header-section">
              <div class="container">
                <div class="header-wrapper">
                  <div class="logo">
                    <a href="index.html">
                      <img src="assets/images/logo/logo.png" alt="logo" />
                    </a>
                  </div>

                  <ul class="menu">
                    <li>
                      <a href="/">Accueil</a>
                    </li>

                    <li>
                      <a>Categories</a>
                      <ul class="submenu">
                        {categories && categories.length > 0
                          ? categories.map((cate) => {
                              const catt = cate.children;
                              console.log(catt);
                              return (
                                <>
                                  {catt && catt.length > 0 ? (
                                    <li>
                                      <a>{cate.name}</a>
                                      <ul class="submenu">
                                        {catt && catt.length > 0
                                          ? catt.map((cat) => {
                                              return (
                                                <>
                                                  <li>
                                                    <Link
                                                      to={{
                                                        pathname: `/Events_Category`,
                                                        state: {
                                                          CategoryId: cat._id,
                                                        },
                                                      }}
                                                    >
                                                      {" "}
                                                      {cat.name}
                                                    </Link>
                                                  </li>{" "}
                                                </>
                                              );
                                            })
                                          : null}
                                      </ul>
                                    </li>
                                  ) : null}
                                </>
                              );
                            })
                          : null}
                      </ul>
                    </li>
                    {/*        <li>
                      {" "}
                      <a>
                        <svg
                          width="1em"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-box"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4v8z"
                          />
                        </svg>{" "}
                        <span>Événements</span>
                      </a>
                    </li> */}
                    {EventReview && EventReview.length > 0 ? (
                      <li>
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
                          class="feather feather-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <a href="/Evaluate">
                          <a>événement déjà vu</a>
                        </a>
                      </li>
                    ) : null}
                    {/*    <li>
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
                        class="feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <Link
                        to={{
                          pathname: `/Profile`,
                          state: { IdUser: _id },
                        }}
                      >
                        {" "}
                        <a> Profile</a>
                      </Link>
                    </li> */}
                    {/*     <Button
         onClick={handleLogout}
         variant="outlined"
       >
         Logout
       </Button> */}
                    <li>
                      <a>
                        <h6>
                          <span> BIENVENUE,</span> {LastName}
                          {/*    <div class="user-img">
                            <div class="avatar avatar-xl">
                              {Photo && Photo.length > 0 ? (
                                Photo.map((Ph) => {
                                  return (
                                    <>
                                      <img
                                        src={`UsersInformation/${Ph.filename}`}
                                        style={{
                                          borderRadius: " 50%",
                                          height: "50px",
                                          width: "50px",
                                        }}
                                      />
                                    </>
                                  );
                                })
                              ) : (
                                <img
                                  src={`uploads/noAvatar.png`}
                                  style={{
                                    borderRadius: " 50%",
                                    height: "50px",
                                    width: "50px",
                                  }}
                                />
                              )}
                            </div>
                          </div>{" "} */}
                        </h6>
                      </a>
                      <ul class="submenu">
                        <li>
                          <li>
                            <Link
                              to={{
                                pathname: `/Profile`,
                                state: { IdUser: _id },
                              }}
                            >
                              {" "}
                              <a>
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
                                  class="feather feather-user"
                                >
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                Profile
                              </a>
                            </Link>
                          </li>{" "}
                          <li>
                            {" "}
                            <a
                              class=""
                              onClick={handleLogout}
                              variant="outlined"
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
                                class="feather feather-log-out"
                              >
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                              </svg>
                              Déconnexion
                            </a>
                          </li>
                        </li>
                      </ul>
                    </li>
                    {/*         <li class="header-button pr-0">
                      <a class="" onClick={handleLogout} variant="outlined">
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
                          class="feather feather-log-out"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Déconnexion
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </header>
          </>
        ) : (
          <>
            <header class="header-section">
              <div class="container">
                <div class="header-wrapper">
                  <div class="logo">
                    <a href="index.html">
                      <img src="assets/images/logo/logo.png" alt="logo" />
                    </a>
                  </div>

                  <ul class="menu">
                    <li>
                      <a href="/">Accueil</a>
                    </li>

                    <li>
                      <a>Categories</a>
                      <ul class="submenu">
                        {categories && categories.length > 0
                          ? categories.map((cate, index) => {
                              return (
                                <>
                                  <li>
                                    <a href="sports.html">{cate.name}</a>
                                  </li>
                                </>
                              );
                            })
                          : null}
                      </ul>
                    </li>

                    <li>
                      <a href="/Propos">À propos</a>{" "}
                    </li>
                    <li>
                      <a href="/contact">contact</a>
                    </li>
                    {/*     <Button
onClick={handleLogout}
variant="outlined"
>
Logout
</Button> */}
                    <li class="header-button pr-0">
                      <a href="/login">Se connecter</a>
                    </li>
                  </ul>
                </div>
              </div>
            </header>
          </>
        )
      ) : (
        <>
          <header class="header-section">
            <div class="container">
              <div class="header-wrapper">
                <div class="logo">
                  <a href="index.html">
                    <img src="assets/images/logo/logo.png" alt="logo" />
                  </a>
                </div>

                <ul class="menu">
                  <li>
                    <a href="/">Accueil</a>
                  </li>

                  <li>
                    <a>Categories</a>
                    <ul class="submenu">
                      {categories && categories.length > 0
                        ? categories.map((cate) => {
                            const catt = cate.children;
                            console.log(catt);
                            return (
                              <>
                                {catt && catt.length > 0 ? (
                                  <li>
                                    <a>{cate.name}</a>
                                    <ul class="submenu">
                                      {catt && catt.length > 0
                                        ? catt.map((cat) => {
                                            return (
                                              <>
                                                <li>
                                                  <Link
                                                    to={{
                                                      pathname: `/categoEvt`,
                                                      state: {
                                                        CategoryId: cat._id,
                                                      },
                                                    }}
                                                  >
                                                    {" "}
                                                    {cat.name}
                                                  </Link>
                                                </li>{" "}
                                              </>
                                            );
                                          })
                                        : null}
                                    </ul>
                                  </li>
                                ) : null}
                              </>
                            );
                          })
                        : null}
                    </ul>
                  </li>

                  <li>
                    <a href="/Propos">À propos</a>{" "}
                  </li>
                  <li>
                    <a href="/contact">contact</a>
                  </li>
                  {/*     <Button
onClick={handleLogout}
variant="outlined"
>
Logout
</Button> */}
                  <li class="header-button pr-0">
                    <a href="/login">Se connecter</a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </>
      )}
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
}

export default AppBarPrimary;
