import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Get_Events_Par_Category } from "../../redux/actions/EventsActions";
import { fetchCategory } from "../../redux/actions/CategoryActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "./Modals/DeleteEvent";
import AcceptModal from "./Modals/Acceptation";
import axios from "../../util/axios";
import ReactPaginate from "react-paginate";
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
const Events = ({ Get_Events_Par_Category, categoryEvents }) => {
  const [id, setId] = useState(null);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [Event, setEvent] = useState([]);
  const [bool, setbool] = useState(false);

  const showDeleteModal = (id) => {
    setId(id);
    setdeletMessage(null);
    setsuprimMessage(`Voulez-vous vraiment supprimer l'événement ?`);
    setDisplayConfirmationModal(true);
  };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  const submitDelete = (id) => {
    setsuprimMessage(`The fruit was deleted successfully.`);

    setDisplayConfirmationModal(false);
  };

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const [SearchData, setSearchData] = useState("");
  const [offset, setoffset] = useState(0);
  const [tableData, settableData] = useState([]);
  const [orgtableData, setorgtableData] = useState([]);
  const [perPage, setperPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [selectchange, setselectchange] = useState(2);
  const [pageCount, setpageCount] = useState(0);
  const [categ, setcateg] = useState([]);
  const [displayConfirmModal, setDisplayConfirmModal] = useState(false);
  const [AcceptMessage, setAcceptMessage] = useState(null);
  const [AcceptationMessage, setAcceptationMessage] = useState(null);
  const [idOrganizer, setidOrganizer] = useState(null);
  const [title, setiTitle] = useState(null);
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
    setEvent(slice);
  };
  useEffect(() => {
    const evts = () => {
      if (selectchange == 2) {
        axios.get(`/api/getEventstt/`).then((res) => {
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
    evts();
  }, []);
  const showAcceptModal = (id, idorganizer, title) => {
    setId(id);
    setidOrganizer(idorganizer);
    setiTitle(title);
    //alert(idOrganizer);
    setAcceptMessage(null);

    setAcceptationMessage(`Êtes-vous sûr de vouloir Accepter l'invitation ?`);

    setDisplayConfirmModal(true);
  };

  const hideConfirmModal = () => {
    setDisplayConfirmModal(false);
  };
  const submitAccept = () => {
    setAcceptationMessage(`The organizer was deleted successfully.`);

    setDisplayConfirmModal(false);
  };
  var date = new Date();
  var day;
  var month;
  var n;

  const dispatch = useDispatch();
  const catego = useSelector((state) => state.category.categories);
  const cat = catego.categories;

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const handleChange = (event) => {
    setselectchange(event.target.value);
    if (event.target.value == 1) {
      axios.get(`/api/AllEvents/`).then((res) => {
        var data = res.data.Event;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.Event);
        setEvent(slice);
      });
    } else if (event.target.value == 2) {
      axios.get(`/api/getEventstt/`).then((res) => {
        var data = res.data.event;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.event);
        setEvent(slice);
      });
    } else if (event.target.value == 0) {
      axios.get(`/api/RequestEvents/`).then((res) => {
        var data = res.data.data;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.data);
        setEvent(slice);
      });
    }
  };

  const handleselectChange = (event) => {
    /*    setbool({value: event.target.value}) */ setbool(true);
    //setcatid(event.target.value);
    axios.get(`/api/subparCategory/${event.target.value}`).then((res) => {
      setcateg(res.data.event);
    });
  };

  const handleSubChange = (event) => {
    axios
      .get(`/api/ShowAllEventsparCategory/${event.target.value}`)
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
  return (
    <div>
      {Event && Event.length > 0 ? (
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
          </div>
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
                  <strong>Action</strong>
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
                console.log(evt.Validate);
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
                        {evt.Validate == 1 ? (
                          <span class="badge light badge-success">Validé</span>
                        ) : (
                          <span class="badge light badge-danger">
                            en attente
                          </span>
                        )}
                      </td>
                      <td>
                        {evt.Validate == 1 ? (
                          <>
                            <Link
                              to={{
                                pathname: `/DetailsEvents`,
                                state: {
                                  events: evt,
                                  user: evt.createdBy,
                                },
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
                            &nbsp;&nbsp; &nbsp;&nbsp;
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
                                <svg
                                  color="#7d1313"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-x-octagon"
                                >
                                  <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                                  <line x1="15" y1="9" x2="9" y2="15"></line>
                                  <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                              </button>
                            </a>
                          </>
                        ) : (
                          <ul class="table-controls">
                            <Link
                              to={{
                                pathname: `/DetailsEvents`,
                                state: {
                                  events: evt,
                                  user: evt.createdBy,
                                },
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
                              </button>{" "}
                            </Link>
                            &nbsp; &nbsp;
                            <li>
                              <a
                                href="javascript:void(0);"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Edit"
                              >
                                <svg
                                  onClick={() =>
                                    showAcceptModal(
                                      evt._id,
                                      evt.createdBy,
                                      evt.Title
                                    )
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
                                  class="feather feather-check-circle text-primary"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                              </a>
                            </li>
                            &nbsp; &nbsp;
                            <li>
                              <a
                                href="javascript:void(0);"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Delete"
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
          </table>{" "}
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
      ) : (
        <div>
          <img
            src="assets/Spinner-1s-200px.gif"
            style={{
              width: "150px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "200px",
            }}
          />
        </div>
      )}
      {/*      {Event && Event.length > 0 ? (
        <section
          class="event-section padding-top padding-bottom"
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
                            Affichage: {categoryEvents.length} Événement(s)
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
                                                  style={{ height: "370px" }}
                                                  alt="event"
                                                />
                                              </>
                                            );
                                          })
                                        : null}{" "}
                                    </Link>
                                  </div>
                                  <div
                                    class="movie-content bg-one"
                                    style={{ width: "720px", height: "370px" }}
                                  >
                                    <h5 class="title">
                                      <Link
                                        to={{
                                          pathname: `/evt`,
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
                                              pathname: `/DetailsEvents`,
                                              state: { events: evt },
                                            }}
                                          >
                                            <div class="thumb">
                                              <i class="fas fa-plus"></i>
                                            </div>
                                            <span> Plus de détails </span>
                                          </Link>
                                        </div>
                                        <div class="react-item mr-auto">
                                          <div
                                            class="thumb"
                                            style={{ color: "red" }}
                                          >
                                            <svg
                                              onClick={() =>
                                                showDeleteModal(evt._id)
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
                                              class="feather feather-trash-2"
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
                                          </div>
                                          <span>Supprimer</span>
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
      {/* <Player showModal={displayConfirmationModal} confirmModal={submitPlayer} hideModal={hideConfirmationModal}  Url={Url} />
       */}

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
        idorganizer={idOrganizer}
        title={title}
        message={AcceptationMessage}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    // categoryEvents: state.event.events,
  };
};

export default connect(mapStateToProps, { Get_Events_Par_Category })(Events);
