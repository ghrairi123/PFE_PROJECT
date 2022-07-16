import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Player from "./Modal/reactPlayer";
import Modal from "./Modal/DeleteEvnt";
import DeleteModal from "./Modal/EventDelete";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Reactiv from "./Modal/Reactivate";
import ReactPaginate from "react-paginate";
import axios from "../../../util/axios";
import { MY_Events } from "../../../redux/actions/EventsActions";
import { fetchCategory } from "../../../redux/actions/CategoryActions";
const option = {
  cursor: "pointer",
  fontWeight: "400",
  lineHeight: "40px",
  background: "transparent",
  listStyle: "none",
  minHeight: "40px",
  outline: "none",
  paddingLeft: "18px",
  paddingRight: "29px",
  textAlign: "left",
  transition: " all 0.2s",
};
function Myevents({ MY_Events, MYEvent }) {
  const [id, setId] = useState(null);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [displayConfirmatDeleteModal, setDisplayConfirmatDeleteModal] =
    useState(false);
  const [desactvMessage, setdesactvMessage] = useState(null);
  const [displayConfirmatDesactivModal, setdisplayConfirmatDesactivModal] =
    useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const [SearchData, setSearchData] = useState("");
  const [Event, setEvent] = useState([]);
  const [Url, setUrl] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [ReactivatedMessage, setReactivatedMessage] = useState(null);
  const [ReactiveMessage, setReactiveMessage] = useState(null);
  const [displayConfirmatReactiveModal, setDisplayConfirmatReactiveModal] =
    useState(false);
  const [offset, setoffset] = useState(0);
  const [tableData, settableData] = useState([]);
  const [orgtableData, setorgtableData] = useState([]);
  const [perPage, setperPage] = useState(9);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const showPlayerModal = (url) => {
    setUrl(url);
    setDisplayConfirmationModal(true);
  };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  const submitPlayer = (url) => {
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
  const showReactivateModal = (id) => {
    setId(id);
    setReactivatedMessage(null);
    setReactiveMessage(`Voulez-vous vraiment Réactiver l'événement ?`);
    setDisplayConfirmatReactiveModal(true);
  };
  const hideConfirmationReactivateModal = () => {
    setDisplayConfirmatReactiveModal(false);
  };
  const submitReactivate = (id) => {
    setReactiveMessage(`The fruit was deleted successfully.`);

    setDisplayConfirmatDeleteModal(false);
  };
  const showDeleteModal = (id) => {
    setId(id);
    setdeletMessage(null);
    setdesactvMessage(`Voulez-vous vraiment désactiver l'événement ?`);
    setdisplayConfirmatDesactivModal(true);
  };

  const showDeleteEvntModal = (id) => {
    setId(id);
    setdeletMessage(null);
    setsuprimMessage(`Voulez-vous vraiment Supprimer l'événement ?`);
    setDisplayConfirmatDeleteModal(true);
  };
  const hideConfirmationDesactivModal = () => {
    setdisplayConfirmatDesactivModal(false);
  };
  const submitDesactive = (id) => {
    setdisplayConfirmatDesactivModal(false);
  };
  const hideConfirmationDeleteModal = () => {
    setDisplayConfirmatDeleteModal(false);
  };
  const submitDelete = (id) => {
    setsuprimMessage(`The fruit was deleted successfully.`);

    setDisplayConfirmatDeleteModal(false);
  };
  const dispatch = useDispatch();
  const catego = useSelector((state) => state.category.categories);
  console.log(catego);
  const cat = catego.categories;
  const [categ, setcateg] = useState([]);
  const [selectchange, setselectchange] = useState(2);
  const [bool, setbool] = useState(false);
  const Account = useSelector((state) => state.auth);
  console.log(Account);
  const { state } = useLocation();
  console.log(state);
  const userid = localStorage.getItem("idConnected");
  useEffect(() => {
    const evts = () => {
      axios.get(`/api/MyEvent/${userid}`).then((res) => {
        /* 
        setEvent(res.data.event); */
        setNumberOfPages(res.data.totalPages);
        var data = res.data.event;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.event);
        setEvent(slice);
      });
    };

    evts();
  }, [pageNumber]);
  useEffect(() => {
    MY_Events(userid);
  }, [MY_Events]);
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  var n;
  var day;
  var year;
  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  var date = new Date();
  MYEvent.map((evnt) => {
    const month = evnt.StartDate;
    n = month[date.getMonth()];
    day = month[date.getDay()];
    year = month[date.getFullYear()];
  });
  const handleselectChange = (event) => {
    /*    setbool({value: event.target.value}) */ setbool(true);
    //setcatid(event.target.value);
    axios.get(`/api/subparCategory/${event.target.value}`).then((res) => {
      setcateg(res.data.event);
    });
  };
  const handleSubChange = (event) => {
    axios
      .get(
        `/api/ShowEventsparCategorybyorganizer/${event.target.value}/${userid}`
      )
      .then((res) => {
        var data = res.data.event;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);
        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.event);
        setEvent(slice);
      });
  };
  const handleChange = (event) => {
    setselectchange(event.target.value);
    if (event.target.value == 1) {
      axios.get(`/api/organ_EVENT/${userid}`).then((res) => {
        var data = res.data.event;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.event);
        setEvent(slice);
      });
    } else if (event.target.value == 2) {
      axios.get(`/api/MyEvent/${userid}`).then((res) => {
        var data = res.data.event;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.event);
        setEvent(slice);
      });
    } else if (event.target.value == 0) {
      axios.get(`/api/PENDING_EVENTS/${userid}`).then((res) => {
        var data = res.data.event;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.event);
        setEvent(slice);
      });
    } else {
      axios.get(`/api/DRAFT_EVENTS/${userid}`).then((res) => {
        var data = res.data.event;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.event);
        setEvent(slice);
      });
    }
  };

  return (
    <div>
      <div
        class="table-responsive"
        style={{
          maxWidth: "95%",
          flex: "0 0 120%",
          paddingTop: "3em",
          marginLeft: "40px",
        }}
      >
        <div class="filter-tab">
          <div class="filter-area">
            <div class="filter-main">
              <div class="left w-100 justify-content-between">
                <div class="item">
                  <span class="show">
                    <select style={option} onChange={handleChange}>
                      <option
                        style={{ color: "blue" }}
                        selected="selected"
                        value={2}
                      >
                        tous les évènements
                      </option>
                      <option style={{ color: "blue" }} value={1}>
                        Validé
                      </option>
                      <option style={{ color: "blue" }} value={0}>
                        en attente
                      </option>
                      <option style={{ color: "blue" }} value={3}>
                        événement désactivé
                      </option>
                    </select>
                  </span>
                </div>
                <div class="item">
                  <span class="show">
                    <select style={option} onChange={handleselectChange}>
                      <option
                        style={{ color: "blue" }}
                        selected="selected"
                        value={2}
                      >
                        toutes catégories
                      </option>
                      {cat && cat.length > 0
                        ? cat.map((cate) => {
                            return (
                              <>
                                <option
                                  value={cate._id}
                                  style={{ color: "blue" }}
                                >
                                  {cate.name}
                                </option>
                              </>
                            );
                          })
                        : null}
                    </select>
                  </span>
                </div>

                {bool ? (
                  <div class="item">
                    <span class="show">
                      <select style={option} onChange={handleSubChange}>
                        {categ && categ.length > 0
                          ? categ.map((cate) => {
                              return (
                                <>
                                  <option
                                    value={cate._id}
                                    style={{ color: "blue" }}
                                  >
                                    {cate.name}
                                  </option>
                                </>
                              );
                            })
                          : null}
                      </select>
                    </span>
                  </div>
                ) : null}
                <div class="item mr-0">
                  <input
                    type="text"
                    placeholder="Recherche par titre:"
                    onChange={(evnt) => {
                      setSearchData(evnt.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {Event && Event.length > 0 ? (
          <table
            class="table table-responsive-md"
            style={{ backgroundColor: "#081847", fontFamily: "sans-serif" }}
          >
            <thead>
              <tr>
                <th>
                  <strong>Image</strong>
                </th>
                <th>
                  <strong>Titre</strong>
                </th>
                <th>
                  <strong>Date</strong>
                </th>
                <th>
                  <strong>description</strong>
                </th>
                <th>
                  <strong>STATUS</strong>
                </th>
                <th>
                  <strong>Actions</strong>
                </th>
              </tr>
            </thead>

            <tbody>
              {Event.filter((evt) => {
                if (SearchData == "") return evt;
                else if (
                  evt.Title.toLowerCase().includes(SearchData.toLowerCase())
                ) {
                  return evt;
                }
              }).map((evt) => {
                let date1 = new Date(evt.StartDate);
                let jourMois = date1.getDate();
                let mois = date1.getMonth();
                let annee = date1.getFullYear();
                let heures = date1.getHours();
                const evvt = new Date(
                  Date.UTC(annee, mois, jourMois, heures, 0, 0)
                );
                const Y = { month: "long" };
                const d = { day: "numeric" };
                return (
                  <>
                    <tr>
                      <td>
                        {" "}
                        <Link
                          to={{
                            pathname: `/DetailsEvents`,
                            state: { events: evt },
                          }}
                        >
                          {evt.images && evt.images.length > 0
                            ? evt.images.map((imgs) => {
                                return (
                                  <>
                                    <br />
                                    <img
                                      src={`Events/${imgs.filename}`}
                                      style={{
                                        height: "70px",
                                        width: "70px",
                                        textAlign: "center",
                                        margin: "auto",
                                        display: "flex",
                                      }}
                                      alt="event"
                                    />
                                  </>
                                );
                              })
                            : null}{" "}
                        </Link>
                      </td>
                      <td
                        style={{
                          maxWidth: "200px",
                        }}
                      >
                        {evt.Title}
                      </td>

                      <td>
                        {" "}
                        {evvt.toLocaleDateString(undefined, d)} -{" "}
                        {evvt.toLocaleDateString(undefined, Y)},{annee}
                      </td>
                      <td
                        style={{
                          maxWidth: "400px",
                        }}
                      >
                        {evt.Description}
                      </td>
                      <td>
                        {evt.Validate == 0 && evt.Status == 1 ? (
                          <span class="badge light badge-warning">
                            en attente
                          </span>
                        ) : evt.Validate == 1 && evt.Status == 1 ? (
                          <span class="badge light badge-success">Validé</span>
                        ) : (
                          <span class="badge light badge-danger">
                            Désactivé
                          </span>
                        )}
                      </td>
                      <td>
                        {evt.Validate == 0 && evt.Status == 1 ? (
                          <>
                            <Link
                              to={{
                                pathname: `/EventsDetails`,
                                state: { events: evt },
                              }}
                            >
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
                                <i
                                  class="fas fa-eye "
                                  style={{
                                    color: "blueviolet",
                                  }}
                                ></i>
                              </button>
                            </Link>

                            <Link
                              className="edit-link"
                              to={`/UpdateEvnt/${evt._id}/`}
                            >
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
                                <i
                                  class="fas fa-edit "
                                  style={{
                                    color: "blueviolet",
                                  }}
                                ></i>
                              </button>
                            </Link>

                            <a>
                              <button
                                onClick={() => showDeleteModal(evt._id)}
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
                                <i
                                  class="fas fa-eye-slash"
                                  style={{ color: "red" }}
                                ></i>
                              </button>
                            </a>
                          </>
                        ) : evt.Validate == 1 && evt.Status == 1 ? (
                          <ul class="table-controls">
                            <Link
                              to={{
                                pathname: `/Historique`,
                                state: { events: evt },
                              }}
                            >
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "white",
                                  width: "35px",
                                  height: "35px",
                                  textAlign: "center",
                                  textDecoration: "none",
                                  display: "inline-block",
                                }}
                              >
                                <i class="fas fa-shopping-cart"></i>
                              </button>
                            </Link>
                            &nbsp; &nbsp; &nbsp;
                            <Link
                              to={{
                                pathname: `/EventsDetails`,
                                state: { events: evt },
                              }}
                            >
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "white",
                                  width: "35px",
                                  height: "35px",
                                  textAlign: "center",
                                  textDecoration: "none",
                                  display: "inline-block",
                                }}
                              >
                                <i
                                  class="fas fa-eye"
                                  style={{ color: "rgb(180, 180, 180)" }}
                                ></i>
                              </button>
                            </Link>
                            <li>
                              <Link
                                className="edit-link"
                                to={`/UpdateEvnt/${evt._id}/`}
                              >
                                <button
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "white",
                                    width: "35px",
                                    height: "35px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    display: "inline-block",
                                  }}
                                >
                                  <i
                                    class="fas fa-edit"
                                    style={{ color: "blueviolet" }}
                                  ></i>
                                </button>
                              </Link>
                            </li>
                            <li>
                              <a
                                href="javascript:void(0);"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Delete"
                              >
                                <button
                                  onClick={() => showDeleteModal(evt._id)}
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "white",
                                    width: "35px",
                                    height: "35px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    color: "red",
                                    display: "inline-block",
                                  }}
                                >
                                  <i
                                    class="fas fa-eye-slash"
                                    style={{ color: "red" }}
                                  ></i>
                                </button>
                              </a>
                            </li>
                          </ul>
                        ) : (
                          <ul class="table-controls">
                            <Link
                              to={{
                                pathname: `/EventsDetails`,
                                state: { events: evt },
                              }}
                            >
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "white",
                                  width: "35px",
                                  height: "35px",
                                  textAlign: "center",
                                  textDecoration: "none",
                                  display: "inline-block",
                                }}
                              >
                                <i
                                  class="fas fa-eye"
                                  style={{ color: "rgb(180, 180, 180)" }}
                                ></i>
                              </button>
                            </Link>
                            <li>
                              <a
                                href="javascript:void(0);"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Delete"
                              >
                                {" "}
                                <button
                                  onClick={() => showReactivateModal(evt._id)}
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "white",
                                    width: "50px",
                                    height: "35px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    color: "red",
                                    display: "inline-block",
                                  }}
                                >
                                  <i
                                    class="fas fa-toggle-on"
                                    style={{ color: "green" }}
                                  ></i>{" "}
                                </button>
                              </a>
                            </li>
                            <li>
                              <Link
                                className="edit-link"
                                to={`/UpdateEvnt/${evt._id}/`}
                              >
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
                                  <i
                                    class="fas fa-edit"
                                    style={{ color: "blueviolet" }}
                                  ></i>
                                </button>
                              </Link>
                            </li>
                            <li>
                              <a
                                href="javascript:void(0);"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Delete"
                              >
                                <svg
                                  onClick={() => showDeleteEvntModal(evt._id)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-x-circle text-danger"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="15" y1="9" x2="9" y2="15"></line>
                                  <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                              </a>
                            </li>
                          </ul>
                        )}
                      </td>
                    </tr>{" "}
                  </>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>
            <h5
              style={{
                textAlign: "center",
              }}
            >
              pas d'évènement
            </h5>
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

      {/*    {Event && Event.length > 0 ? (
        <section
          class="movie-section padding-top padding-bottom"
          style={{ paddingTop: "50px" }}
        >
          <div class="container" style={{ maxWidth: "1920px" }}>
            <div class="row flex-wrap-reverse justify-content-center">
              <div class="col-lg-9 mb-50 mb-lg-0">
                <div class="filter-tab">
                  <div class="filter-area">
                    <div class="filter-main">
                      <div class="left w-100 justify-content-between">
                        <div class="item">
                          <span class="show">
                            Affichage: {MYEvent.length} Événement(s)
                          </span>
                        </div>
                        <div class="item mr-0">
                          <input
                            type="text"
                            placeholder="Recherche par titre:"
                            onChange={(evnt) => {
                              setSearchData(evnt.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-10 justify-content-center">
                    {Event.filter((evt) => {
                      if (SearchData == "") return evt;
                      else if (
                        evt.Title.toLowerCase().includes(
                          SearchData.toLowerCase()
                        )
                      ) {
                        return evt;
                      }
                    }).map((evt) => {
                      let date1 = new Date(evt.StartDate);
                      let jourMois = date1.getDate();
                      let mois = date1.getMonth();
                      let annee = date1.getFullYear();
                      let heures = date1.getHours();
                      const evvt = new Date(
                        Date.UTC(annee, mois, jourMois, heures, 0, 0)
                      );
                      const Y = { month: "long" };
                      const d = { day: "numeric" };
                      return (
                        <>
                          <div class="tab-area">
                            <div class="tab-item active">
                              <div class="movie-area mb-10">
                                <div class="movie-list">
                                  <div class="movie-thumb c-thumb">
                                    <Link
                                      to={{
                                        pathname: `/EventsDetails`,
                                        state: { events: evt },
                                      }}
                                    >
                                      {evt.images && evt.images.length > 0
                                        ? evt.images.map((imgs) => {
                                            return (
                                              <>
                                                <br />

                                                <img
                                                  src={`Events/${imgs.filename}`}
                                                  style={{ height: "370px" }}
                                                  alt="event"
                                                />
                                              </>
                                            );
                                          })
                                        : null}{" "}
                                    </Link>
                                  </div>
                                  <div class="movie-content bg-one">
                                    <h5 class="title">
                                      <Link
                                        to={{
                                          pathname: `/EventsDetails`,
                                          state: { events: evt },
                                        }}
                                      >
                                        {evt.Title}
                                      </Link>
                                    </h5>
                                    <p class="duration">{evt.StartTime} min</p>

                                    <div class="release">
                                      <span>Date : </span>{" "}
                                      <a href="#0">
                                        {" "}
                                        {evvt.toLocaleDateString(
                                          undefined,
                                          d
                                        )}{" "}
                                        -{" "}
                                        {evvt.toLocaleDateString(undefined, Y)},
                                        {annee}
                                      </a>
                                    </div>
                                    <ul class="movie-rating-percent">
                                      <li>
                                        <div class="thumb">
                                          <i class="fas fa-map-marker-alt"></i>{" "}
                                        </div>
                                        <span class="content">
                                          {evt.Location} , {evt.city}
                                        </span>
                                      </li>
                                      <li>
                                        <div class="thumb">
                                          <i class="fas fa-audio-description"></i>
                                        </div>{" "}
                                        <span class="content">
                                          {evt.Description}
                                        </span>
                                      </li>
                                    </ul>
                                    <div class="book-area">
                                      <div class="book-ticket">
                                        <div class="react-item">
                                          <Link
                                            to={{
                                              pathname: `/EventsDetails`,
                                              state: { events: evt },
                                            }}
                                          >
                                            <div class="thumb">
                                              <i class="fas fa-plus"></i>{" "}
                                            </div>
                                            <span> Plus de détails </span>
                                          </Link>
                                        </div>

                                        <div class="react-item mr-auto">
                                          <Link
                                            className="edit-link"
                                            to={`/UpdateEvnt/${evt._id}/`}
                                          >
                                            <div class="thumb">
                                              <i class="fas fa-edit"></i>
                                            </div>
                                            <span>Modifier</span>
                                          </Link>
                                        </div>
                                        <div class="react-item mr-auto">
                                          <a
                                            onClick={() =>
                                              showDeleteModal(evt._id)
                                            }
                                          >
                                            <div class="thumb">
                                              <i class="fas fa-trash-alt"></i>{" "}
                                            </div>
                                            <span> Désactiver</span>
                                          </a>
                                        </div>
                                        <div class="react-item">
                                          {evt.vidéo && evt.vidéo.length > 0
                                            ? evt.vidéo.map((vid) => {
                                                return (
                                                  <>
                                                    <a
                                                      href="#0"
                                                      onClick={() =>
                                                        showPlayerModal(
                                                          `Events/${vid.filename}`
                                                        )
                                                      }
                                                      class="popup-video"
                                                    >
                                                      <div class="thumb">
                                                        <img
                                                          src="assets/images/icons/play-button.png"
                                                          alt="icons"
                                                        />
                                                      </div>
                                                      <span>Bande-annonce</span>
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
                        </>
                      );
                    })}
                  </div>
                  <div class="pagination-area text-center">
                    <a onClick={gotoPrevious}>
                      <i
                        onClick={gotoPrevious}
                        class="fas fa-angle-double-left"
                      ></i>
                      <span>Précédent</span>
                    </a>

                    {pages.map((pageIndex) => (
                      <a
                        key={pageIndex}
                        class="active"
                        onClick={() => setPageNumber(pageIndex)}
                      >
                        {pageIndex + 1}
                      </a>
                    ))}
                    <a onClick={gotoNext}>
                      {" "}
                      <span>Suivant</span>
                      <i
                        onClick={gotoNext}
                        class="fas fa-angle-double-right"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div>
          <br />
          <br />
          <br />
          <br />
          <h2 style={{ textAlign: "center" }}>pas d'évènement</h2>
        </div>
      )} */}
      <Player
        showModal={displayConfirmationModal}
        confirmModal={submitPlayer}
        hideModal={hideConfirmationModal}
        Url={Url}
      />
      <Modal
        showModal={displayConfirmatDesactivModal}
        confirmModal={submitDesactive}
        hideModal={hideConfirmationDesactivModal}
        id={id}
        message={desactvMessage}
      />
      <Reactiv
        showModal={displayConfirmatReactiveModal}
        confirmModal={submitReactivate}
        hideModal={hideConfirmationReactivateModal}
        id={id}
        message={ReactiveMessage}
      />
      <DeleteModal
        showModal={displayConfirmatDeleteModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationDeleteModal}
        id={id}
        message={suprimMessage}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    MYEvent: state.event.MyEvents,
  };
};

export default connect(mapStateToProps, { MY_Events })(Myevents);
