import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Rating from "../pages/OrganizerDashbord/Avis/Rating";
import Player from "../pages/ClientDashbord/Event/Modals/reactPlayer";
import { Link } from "react-router-dom";

function Details() {
  const { state } = useLocation();
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
  var date = new Date();
  const month = state.events.StartDate,
    n = month[date.getMonth()],
    day = month[date.getDay()];
  //let heures = month[date.getHours()];
  const Year = month[date.getFullYear()];
  console.log(Year);

  let date1 = new Date(state.events.StartDate);
  console.log(date1);
  let jourSemaine = date1.getDay();
  let jourMois = date1.getDate();
  let mois = date1.getMonth();
  let annee = date1.getFullYear();
  let heures = date1.getHours();
  const evt = new Date(Date.UTC(annee, mois, jourMois, heures, 0, 0));
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const Y = { year: "numeric" };
  console.log(evt.toLocaleDateString(undefined, options));
  console.log(evt.toLocaleDateString(undefined, Y));

  var date2 = new Date();
  var date3 = new Date(state.events.StartDate);
  var diff = new Date(date3.getTime() - date2.getTime());
  var years;
  var months;
  var days;
  let heuresUTCx;
  let minutesx;
  if (diff.getUTCFullYear() - 1970 != 0) {
    years = diff.getUTCFullYear() - 1970;
  } else {
    years = "00";
  }

  if (diff.getUTCMonth() != 0) {
    months = diff.getUTCMonth();
  } else {
    months = "00";
  }

  if (diff.getUTCDate() != 0) {
    days = diff.getUTCDate() - 1;
  } else {
    days = "00";
  }
  if (diff.getUTCHours() != 0) {
    heuresUTCx = diff.getUTCHours();
  } else {
    heuresUTCx = "00";
  }
  if (diff.getMinutes() != 0) {
    minutesx = diff.getMinutes();
  } else {
    minutesx = "00";
  }

  console.log(years);
  console.log(months);
  console.log(days);

  return (
    <div>
      {state.events.images && state.events.images.length > 0
        ? state.events.images.map((imgs) => {
            return (
              <>
                <section
                  class="details-banner bg_img"
                  data-background={`Events/${imgs.filename}`}
                >
                  <div class="container">
                    <div class="details-banner-wrapper">
                      <div class="details-banner-thumb">
                        {state.events.images && state.events.images.length > 0
                          ? state.events.images.map((imgs) => {
                              return (
                                <>
                                  <img
                                    src={`Events/${imgs.filename}`}
                                    alt="movie"
                                  />{" "}
                                </>
                              );
                            })
                          : null}
                        {state.events.vidéo && state.events.vidéo.length > 0
                          ? state.events.vidéo.map((vid) => {
                              return (
                                <>
                                  <a
                                    class="video-popup"
                                    onClick={() =>
                                      showPlayerModal(`Events/${vid.filename}`)
                                    }
                                  >
                                    {state.events.images &&
                                    state.events.images.length > 0
                                      ? state.events.images.map((imgs) => {
                                          return (
                                            <>
                                              <img
                                                src={`Events/${imgs.filename}`}
                                                alt="movie"
                                              />{" "}
                                            </>
                                          );
                                        })
                                      : null}
                                  </a>
                                </>
                              );
                            })
                          : null}
                      </div>
                      <div class="details-banner-content offset-lg-3">
                        <h3 class="title">{state.events.Title}</h3>
                        <div class="tags">
                          <a>{state.events.Location}</a>
                          <a>{state.events.Location}</a>
                        </div>

                        <div class="social-and-duration">
                          <div class="duration-area">
                            <div class="item">
                              <i class="fas fa-calendar-alt"></i>
                              <span>
                                {" "}
                                {evt.toLocaleDateString(undefined, options)}
                              </span>
                            </div>
                            <div class="item">
                              <i class="far fa-clock"></i>
                              <span>{state.events.StartTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>{" "}
              </>
            );
          })
        : null}{" "}
      <section class="book-section bg-one">
        <div class="container">
          <div class="book-wrapper offset-lg-3">
            <div class="left-side">
              <div class="item">
                <div class="item-header">
                  <h5 class="title">{state.events.numReviews}</h5>
                </div>
                <p> Évaluez-le</p>
              </div>
              <div class="item">
                <div class="item-header">
                  <div class="rated rate-it">
                    <Rating value={state.events.rating} text={``} />
                  </div>
                </div>
                <p>
                  <a>évaluation des utilisateurs</a>
                </p>
              </div>
            </div>
            <a href="/login" class="custom-button">
              Réserver des billets
            </a>
          </div>
        </div>
      </section>
      <section class="movie-details-section padding-top padding-bottom">
        <div class="container">
          <div class="row justify-content-center flex-wrap-reverse mb--50">
            <div class="col-lg-9 mb-50">
              <div class="movie-details">
                <div class="tab summery-review">
                  <ul class="tab-menu">
                    <li class="active">Détails</li>
                    <li>
                      AVIS D'UTILISATEUR <span>{state.events.numReviews}</span>
                    </li>
                  </ul>
                  <div class="tab-area">
                    <div class="tab-item active">
                      <div class="item">
                        <h5 class="sub-title">Description</h5>
                        <p>{state.events.Description}</p>
                      </div>
                      <div class="item">
                        <div class="header">
                          <h5 class="sub-title">Equipe d'organisation</h5>
                          <div class="navigation">
                            <div class="cast-prev-2">
                              <i class="fa fa-angle-double-right"></i>
                            </div>
                            <div class="cast-next-2">
                              <i class="fa fa-angle-double-right "></i>
                            </div>
                          </div>
                        </div>
                        <div class="casting-slider owl-carousel">
                          {state.events.Equipes.map((EquipeEvent) => {
                            return (
                              <>
                                <div class="cast-item">
                                  <div class="cast-thumb">
                                    {EquipeEvent.Photo &&
                                    EquipeEvent.Photo.length > 0
                                      ? EquipeEvent.Photo.map((Photo) => {
                                          return (
                                            <>
                                              <Link
                                                to={{
                                                  pathname: `/EquipeDetail`,
                                                  state: {
                                                    Equipe: EquipeEvent,
                                                  },
                                                }}
                                              >
                                                <img
                                                  src={`Events/${Photo.filename}`}
                                                  style={{
                                                    height: "110px",
                                                    verticalAlign: "middle",

                                                    borderRadius: "50%",
                                                  }}
                                                  alt="speaker"
                                                />
                                              </Link>
                                            </>
                                          );
                                        })
                                      : null}
                                  </div>
                                  <div class="cast-content">
                                    <h6 class="cast-title">
                                      <a href="#0">
                                        {EquipeEvent.FirstName}{" "}
                                        {EquipeEvent.Lastname}
                                      </a>
                                    </h6>
                                    <span class="cate">
                                      {EquipeEvent.JobName}
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div class="tab-item">
                      <div class="movie-review-item">
                        <p>
                          {state.events.reviews.length === 0 && (
                            <p>Aucun avis</p>
                          )}
                          {state.events.reviews.slice(0, 2).map((review) => (
                            <>
                              {" "}
                              <div class="movie-review-item">
                                <div class="author">
                                  <div class="movie-review-info">
                                    <h6 class="subtitle">
                                      <a>{review.name}</a>
                                    </h6>
                                  </div>
                                </div>
                                <div class="movie-review-content">
                                  <div class="review">
                                    <Rating value={review.rating} />{" "}
                                  </div>
                                  <h6 class="cont-title">commentaire</h6>
                                  <p>{review.comment}</p>
                                  <div class="review-meta">
                                    <a> {review.createdAt.substring(0, 10)} </a>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Player
        showModal={displayConfirmationModal}
        confirmModal={submitPlayer}
        hideModal={hideConfirmationModal}
        Url={Url}
      />{" "}
    </div>
  );
}

export default Details;
