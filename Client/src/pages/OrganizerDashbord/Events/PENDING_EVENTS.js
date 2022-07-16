import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Player from "./Modal/reactPlayer";
import Modal from "./Modal/DeleteEvnt";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../../util/axios";
import { PENDING_EVENTS } from "../../../redux/actions/EventsActions";
import { fetchCategory } from "../../../redux/actions/CategoryActions";
function PENDING_EVENT({ PENDING_EVENTS, PENDING_EVt }) {
  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    PENDING_EVENTS(state.IdEvents);
  }, [PENDING_EVENTS]);
  const [id, setId] = useState(null);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [displayConfirmatDeleteModal, setDisplayConfirmatDeleteModal] =
    useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const [SearchData, setSearchData] = useState("");
  const [Event, setEvent] = useState([]);

  const [Url, setUrl] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
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

  useEffect(() => {
    const evts = () => {
      axios
        .get(`/api/PENDING_EVENTS/${state.IdEvents}?page=${pageNumber}`)
        .then((res) => {
          setEvent(res.data.event);
          setNumberOfPages(res.data.totalPages);
        });
    };
    /* .then((response) => console.log(response))
          .then(({ totalPages, Event }) => {
            setEvent(Event);
            setNumberOfPages(totalPages);
          }); */
    const interval = setInterval(() => {
      evts();
    }, 1000);
    return () => clearInterval(interval);
  }, [pageNumber]);
  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  const showDeleteModal = (id) => {
    setId(id);
    setdeletMessage(null);
    setsuprimMessage(`Voulez-vous vraiment désactiver l'événement ?`);
    setDisplayConfirmatDeleteModal(true);
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

  const {
    account: { role },
    account: { email },
    account: { password },
    authenticated,
    Name,
    _id,
  } = useSelector((state) => state.auth);
  console.log(_id);
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  var n;
  var day;
  var year;

  var date = new Date();
  PENDING_EVt.map((evnt) => {
    const month = evnt.StartDate;
    n = month[date.getMonth()];
    day = month[date.getDay()];
    year = month[date.getFullYear()];
  });
  return (
    <div>
      {Event && Event.length > 0 ? (
        <section
          class="event-section padding-top padding-bottom"
          style={{ paddingTop: "50px" }}
        >
          <div class="container" style={{ flex: "0 0 100%", maxWidth: "100%" }}>
            <div
              class="row flex-wrap-reverse justify-content-center"
              style={{ flex: "0 0 100%", maxWidth: "100%" }}
            >
              <div class="col-lg-9 mb-50 mb-lg-0">
                <div class="filter-tab">
                  <div class="filter-area">
                    <div class="filter-main">
                      <div class="left w-100 justify-content-between">
                        <div class="item">
                          <span class="show">
                            Affichage: {PENDING_EVt.length} Événement(s)
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
                                  <div
                                    class="movie-content bg-one"
                                    style={{ width: "720px", height: "370px" }}
                                  >
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
                                          <a href="#0">
                                            <div class="thumb">
                                              <i class="fas fa-edit"></i>
                                            </div>
                                            <span>Modifier</span>
                                          </a>
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
      )}
      <Player
        showModal={displayConfirmationModal}
        confirmModal={submitPlayer}
        hideModal={hideConfirmationModal}
        Url={Url}
      />
      <Modal
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
    PENDING_EVt: state.event.PENDING_EVENTS,
  };
};

export default connect(mapStateToProps, { PENDING_EVENTS })(PENDING_EVENT);
