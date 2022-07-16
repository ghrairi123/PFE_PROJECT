import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Rating from "../OrganizerDashbord/Avis/Rating";
import Player from "../ClientDashbord/Event/Modals/reactPlayer";
import Email from "./Modals/SendMail";
import axios from "../../util/axios";
import { Link } from "react-router-dom";

function Details() {
  const { state } = useLocation();
  const [Url, setUrl] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayConfirmationmailModal, setdisplayConfirmationmailModal] =
    useState(false);
  const showPlayerModal = (url) => {
    setUrl(url);
    setDisplayConfirmationModal(true);
  };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  const submitMail = () => {
    setdisplayConfirmationmailModal(false);
  };

  const showMailModal = () => {
    setdisplayConfirmationmailModal(true);
  };
  const hideConfirmationMailModal = () => {
    setdisplayConfirmationmailModal(false);
  };
  const submitPlayer = (url) => {
    setdisplayConfirmationmailModal(false);
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
  const [account, setacoount] = useState({});
  const [users, setusers] = useState({});

  useEffect(() => {
    const chart = () => {
      axios
        .get(`/user/${state.user}`)
        .then((res) => {
          setacoount(res.data);
          axios
            .get(`/AccountOrganizer/${res.data.account}`)
            .then((res) => {
              setusers(res.data.account);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    chart();
  }, []);

  return (
    <div>
      {state.events.images && state.events.images.length > 0
        ? state.events.images.map((imgs) => {
            return (
              <>
                <section
                  class="details-banner bg_img"
                  style={{ paddingTop: "27px" }}
                >
                  <div class="container" style={{ fontFamily: "sans-serif" }}>
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
                  <div class="rated rate-it">cré par</div>
                </div>
                <p>
                  <a>{account.Name}</a>
                </p>
              </div>
              <div class="item">
                <div class="item-header">
                  <div class="rated rate-it">Email</div>
                </div>
                <p>
                  <a>{users.email}</a>
                </p>
              </div>
            </div>

            <a>
              <button
                onClick={() => showMailModal()}
                style={{
                  font: "bold 11px Arial",
                  textDecoration: "none",
                  backgroundColor: " #EEEEEE",
                  color: " #333333",
                  padding: "2px 6px 2px 6px",
                  borderTop: "1px solid #CCCCCC",
                  borderRight: "1px solid #333333",
                  borderBottom: "1px solid #333333",
                  borderLeft: "1px solid #CCCCCC",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
                Envoyer Mail
              </button>
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
                    <li>Ticket</li>
                  </ul>
                  <div class="tab-area">
                    <div class="tab-item active">
                      <div class="item">
                        <h5 class="sub-title">Description</h5>
                        <p>{state.events.Description}</p>
                      </div>
                      {state.events.Equipes &&
                      state.events.Equipes.length > 0 ? (
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
                      ) : null}
                      {state.events.Sponsors &&
                      state.events.Sponsors.length > 0 ? (
                        <div class="item">
                          <div class="header">
                            <h5 class="sub-title">Sponsors</h5>
                            <div class="navigation">
                              <div class="cast-prev-2">
                                <i class="fa fa-angle-double-right"></i>
                              </div>
                              <div class="cast-next-2">
                                <i class="fa fa-angle-double-right "></i>
                              </div>
                            </div>
                          </div>
                          <div class="casting-slider-two owl-carousel">
                            {state.events.Sponsors.map((Sponsors) => {
                              return (
                                <>
                                  <div class="cast-item">
                                    <div class="cast-thumb">
                                      {Sponsors.Logo && Sponsors.Logo.length > 0
                                        ? Sponsors.Logo.map((Photo) => {
                                            return (
                                              <>
                                                <Link
                                                  to={{
                                                    pathname: `/EquipeDetail`,
                                                    state: {
                                                      Equipe: Sponsors,
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
                                        <a href="#0">{Sponsors.Name}</a>
                                      </h6>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div class="tab-item">
                      {state.events.Classes &&
                      state.events.Classes.length > 0 ? (
                        <section class="faq-section">
                          <div class="event-facility padding-bottom">
                            <div class="container">
                              <div class="section-header-3">
                                <span class="cate">tarification simple</span>
                              </div>
                              <div class="row justify-content-center mb-30-none">
                                {state.events.Classes.map((ClassEvent) => {
                                  return (
                                    <>
                                      <div class="col-md-6 col-lg-4 col-sm-10">
                                        <div class="ticket--item">
                                          <div class="ticket-thumb">
                                            <img
                                              src="assets/images/event/ticket/ticket01.png"
                                              alt="event"
                                            />
                                          </div>
                                          <div class="ticket-content">
                                            <span class="ticket-title">
                                              {ClassEvent.ClassName}
                                            </span>
                                            <h2 class="amount">
                                              <sup>$</sup>
                                              {ClassEvent.Price}
                                            </h2>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}{" "}
                              </div>
                            </div>
                          </div>
                        </section>
                      ) : null}
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
      <Email
        showModal={displayConfirmationmailModal}
        confirmModal={submitMail}
        hideModal={hideConfirmationMailModal}
        name={account.Name}
        email={users.email}
      />
    </div>
  );
}

export default Details;
