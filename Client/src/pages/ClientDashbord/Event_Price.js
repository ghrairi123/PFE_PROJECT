import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Get_Events_Par_Category } from "../../redux/actions/EventsActions";
import { Link } from "react-router-dom";
import Player from "./Event/Modals/reactPlayer";
import axios from "../../util/axios";

function Event_Price() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const categoryEvents = useSelector((state) => state.event.events);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [Event, setEvent] = useState([]);
  const [SearchData, setSearchData] = useState("");
  const [Url, setUrl] = useState(null);
  const {
    account: { role },
    authenticated,
  } = useSelector((state) => state.auth);

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  console.log(state);
  const showPlayerModal = (url) => {
    setUrl(url);
    setDisplayConfirmationModal(true);
  };
  const submitPlayer = (url) => {
    setDisplayConfirmationModal(false);
  };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  useEffect(() => {
    const evts = () => {
      axios
        .get(`/api/Events_By_price/${state.PriceMin}/${state.PriceMax}`)
        .then((res) => {
          setEvent(res.data.Price);
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

  /*   useEffect(() => {
    // console.log(SearchData)
    const interval = setInterval(() => {
      dispatch(Get_Events_Par_Category(state.CategoryId));
    }, 1000);
    return () => clearInterval(interval);
  }, []); */
  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  return (
    <div>
      {Event && Event.length > 0 ? (
        <section class="event-section padding-top padding-bottom">
          <div class="container" style={{ maxWidth: "1920px" }}>
            <div class="row flex-wrap-reverse justify-content-center">
              <div class="col-lg-9 mb-50 mb-lg-0">
                <div class="filter-tab">
                  <div class="filter-area">
                    <div class="filter-main">
                      <div class="left w-100 justify-content-between">
                        <div class="item">
                          <span class="show">
                            Affichage: {Event.length} Événement(s)
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
                                        pathname: `/Details`,
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
                                      <a href="movie-details.html">
                                        {evt.Title}
                                      </a>
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
                                              pathname: `/Details`,
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
                                          {authenticated ? (
                                            <Link
                                              to={{
                                                pathname: `/Check_Out`,
                                                state: { events: evt },
                                              }}
                                            >
                                              <div class="thumb">
                                                <img
                                                  src="assets/images/icons/book.png"
                                                  alt="icons"
                                                />
                                              </div>
                                              <span>Réserver</span>
                                            </Link>
                                          ) : (
                                            <a href="/Login">
                                              <div class="thumb">
                                                <img
                                                  src="assets/images/icons/book.png"
                                                  alt="icons"
                                                />
                                              </div>
                                              <span>Réserver</span>
                                            </a>
                                          )}
                                        </div>

                                        <div class="react-item">
                                          {evt.vidéo && evt.vidéo.length > 0
                                            ? evt.vidéo.map((vid) => {
                                                return (
                                                  <>
                                                    <a
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
                      <span>Précédente</span>
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
                      <span>Prochaine</span>
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
      <Player
        showModal={displayConfirmationModal}
        confirmModal={submitPlayer}
        hideModal={hideConfirmationModal}
        Url={Url}
      />
    </div>
  );
}

export default Event_Price;
