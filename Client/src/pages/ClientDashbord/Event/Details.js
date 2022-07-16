import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllEvents } from "../../../redux/actions/EventsActions";
import { useLocation } from "react-router-dom";
import Player from "./Modals/reactPlayer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Get_Addons_Par_Events,
  Get_Sponsors_Par_Events,
  Get_Equipe_Par_Events,
  Get_Class_Par_Events,
  Get_Event_PROMO,
  ShowOrganizersparEvents,
} from "../../../redux/actions/EventsActions";
const Details = ({
  Get_Addons_Par_Events,
  AddonsEvents,
  Get_Sponsors_Par_Events,
  SponsorEvents,
  Get_Event_PROMO,
  EventPromo,
  ShowOrganizersparEvents,
  OrganizersparEvents,
  Get_Equipe_Par_Events,
  EquipeEvents,
  Get_Class_Par_Events,
  ClassEvents,
}) => {
  const { state } = useLocation();
  console.log(state.events);
  /*   useEffect(() => {
    ShowOrganizersparEvents(state.events._id)
   }, [ShowOrganizersparEvents]); */

  let NameOrganizer;
  let LastNameorg;

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
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.events);
  console.log(event);

  var imagealeatoir;
  imagealeatoir =
    state.events.images[Math.floor(Math.random() * state.events.images.length)];
  console.log(imagealeatoir);

  useEffect(() => {
    dispatch(GetAllEvents());
  }, []);

  return (
    <div>
      <section
        class="event-banner-section bg_img"
        data-background={`Events/${imagealeatoir.filename}`}
        style={{ paddingLeft: "100px", paddingRight: "150px" }}
      >
        <div class="container">
          <div class="event-banner">
            {state.events.vidéo && state.events.vidéo.length > 0
              ? state.events.vidéo.map((vid) => {
                  return (
                    <>
                      <a
                        onClick={() =>
                          showPlayerModal(`Events/${vid.filename}`)
                        }
                        class="video-popup"
                      >
                        <span></span>
                        <i class="fa fa-play"></i>
                      </a>{" "}
                    </>
                  );
                })
              : null}
          </div>
        </div>
      </section>
      <section class="event-book-search padding-top pt-lg-0">
        <div class="container">
          <div
            class="event-search bg_img"
            data-background="assets/images/ticket/ticket-bg01.jpg"
          >
            <div class="event-search-top">
              <div class="left">
                <h3 class="title">{state.events.Title}</h3>
              </div>
              <div class="item date-item">
                <h6 class="date">
                  {evt.toLocaleDateString(undefined, options)}
                </h6>
              </div>
            </div>
            <div class="event-search-bottom">
              <div class="contact-side">
                <div class="item">
                  <div class="item-thumb">
                    <img
                      src="assets/images/event/icon/event-icon01.png"
                      alt="event"
                    />
                  </div>
                  <div class="item-content">
                    <span class="up">taux de remplissage:</span>
                    <span>{state.events.Fillingrate}</span>
                  </div>
                </div>
                <div class="item">
                  <div class="item-thumb">
                    <img
                      src="assets/images/event/icon/event-icon02.png"
                      alt="event"
                    />
                  </div>
                  <div class="item-content">
                    <span class="up">{state.events.Location}-</span>
                    <span>{state.events.city}</span>
                  </div>
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div
                  class="item"
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "20px",
                    color: "blue",
                  }}
                >
                  <div class="item-thumb">
                    <img
                      src="assets/images/icons/book.png"
                      alt="icons"
                      style={{ width: "30px" }}
                    />
                  </div>
                  <Link
                    to={{
                      pathname: `/Check_Out`,
                      state: { events: state.events },
                    }}
                  >
                    <span>Réserver</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="event-about padding-top padding-bottom">
        <div class="container">
          <div class="row justify-content-between flex-wrap-reverse">
            <div class="col-lg-7 col-xl-6">
              <div class="event-about-content">
                <div class="section-header-3 left-style m-0">
                  <h2 class="title">
                    {state.events.Title}-<span>{Year}</span>
                  </h2>
                  <p> {state.events.Description}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-5 col-md-7">
              <div class="event-about-thumb">
                {" "}
                {state.events.images && state.events.images.length > 0
                  ? state.events.images.map((vid) => {
                      return (
                        <>
                          <img src={`Events/${vid.filename}`} alt="event" />
                        </>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {state.events.Equipes.length > 0 ? (
        <section class="movie-details-section padding-top padding-bottom">
          <div class="container">
            <div class="row justify-content-center flex-wrap-reverse mb--50">
              <div class="col-lg-9 mb-50">
                <div class="movie-details">
                  <div class="tab summery-review">
                    <ul class="tab-menu">
                      <li class="active">équipes</li>
                      <li>Détails</li>
                    </ul>
                    <div class="tab-area">
                      <div class="tab-item active">
                        <div class="item">
                          <h5 class="sub-title">voir Nos meilleures équipes</h5>
                        </div>
                        <div class="item">
                          <div class="header">
                            <h5 class="sub-title">Membre</h5>
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
                                                      Name: NameOrganizer,
                                                      LastName: LastNameorg,
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
                        {state.events.Equipes.map((EquipeEvent) => {
                          return (
                            <>
                              <div class="movie-review-item">
                                <div class="author">
                                  <div class="thumb">
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
                                                    Name: NameOrganizer,
                                                    LastName: LastNameorg,
                                                  },
                                                }}
                                              >
                                                <img
                                                  src={`Events/${Photo.filename}`}
                                                  style={{
                                                    height: "50px",
                                                    verticalAlign: "middle",
                                                    width: "90px",
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
                                  <div class="movie-review-info">
                                    <h6 class="subtitle">
                                      <a href="#0">
                                        {EquipeEvent.FirstName}{" "}
                                        {EquipeEvent.Lastname}
                                      </a>
                                    </h6>
                                    <span>
                                      <i class="fas fa-check"></i>
                                      {EquipeEvent.JobName}
                                    </span>
                                  </div>
                                </div>
                                <div class="movie-review-content">
                                  <h6 class="cont-title">
                                    {EquipeEvent.JobName}
                                  </h6>
                                  <p>{EquipeEvent.Description}</p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section
        class="statistics-section padding-top padding-bottom bg_img pb-lg-0"
        data-background="assets/images/statistics/statistics-bg01.jpg"
      >
        <div class="container">
          <div class="section-header-3">
            <span class="cate">ce que nous avons fait</span>
            <h2 class="title">nos STATISTIQUES récentes</h2>
          </div>
          <div class="statistics-wrapper">
            <div class="row mb--20">
              <div class="col-md-4">
                <div class="stat-item">
                  <div class="stat-thumb">
                    <img
                      src="assets/images/statistics/stat01.png"
                      alt="statistics"
                    />
                  </div>
                  <div class="stat-content">
                    <h3
                      class=" counter-item odometer"
                      data-odometer-final={state.events.Reserved_seat}
                    ></h3>
                    <span class="info">Billets réservés</span>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="stat-item">
                  <div class="stat-thumb">
                    <img
                      src="assets/images/statistics/stat02.png"
                      alt="statistics"
                    />
                  </div>
                  <div class="stat-content">
                    <h3
                      class=" counter-item odometer"
                      data-odometer-final={state.events.Fillingrate}
                    ></h3>
                    <span class="info">Nombre total de billets</span>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="stat-item">
                  <div class="stat-thumb">
                    <img
                      src="assets/images/statistics/stat01.png"
                      alt="statistics"
                    />
                  </div>
                  <div class="stat-content">
                    <h3
                      class=" counter-item odometer"
                      data-odometer-final={state.events.Unreserved_seat}
                    ></h3>
                    <span class="info">billets disponibles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {state.events.Classes.length > 0 ? (
        <section class="faq-section padding-top">
          <div class="event-facility padding-bottom padding-top">
            <div class="container">
              <div class="section-header-3">
                <span class="cate">tarification simple</span>
              </div>
              <div class="row justify-content-center mb-30-none">
                {state.events.Classes && state.events.Classes.length > 0
                  ? state.events.Classes.map((ClassEvent) => {
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
                                <ul>
                                  {state.events.Promo == true ? (
                                    <>
                                      <li>{state.events.Title} en Promo</li>
                                    </>
                                  ) : null}{" "}
                                </ul>

                                {EventPromo && EventPromo.length > 0
                                  ? EventPromo.map((EventProm) => {
                                      const price =
                                        ClassEvent.Price -
                                        (ClassEvent.Price *
                                          EventProm.percentage_promo) /
                                          100;
                                      return (
                                        <>
                                          <h6
                                            class="amount"
                                            style={{ color: "#c91625" }}
                                          >
                                            Prix ​​après le{" "}
                                            {EventProm.percentage_promo} %
                                          </h6>
                                          <br />
                                          <h2 class="amount">
                                            <sup>$</sup>
                                            {price}{" "}
                                          </h2>
                                        </>
                                      );
                                    })
                                  : null}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : null}{" "}
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {state.events.Sponsors && state.events.Sponsors.length > 0 ? (
        <section class="event-details padding-bottom padding-top">
          <div class="container">
            <div class="section-header-3">
              <span class="cate">Les Sponsors de l'événement</span>
              <h2 class="title">Partenaires & Sponsors</h2>
            </div>
            <div class="tabTwo sponsor-tab">
              <ul class="tab-menu">
                <li class="active">Platinum Sponsors</li>
                <li>gold Sponsors</li>
                <li>silver Sponsors</li>
              </ul>

              <div class="tab-area">
                {state.events.Sponsors && state.events.Sponsors.length > 0
                  ? state.events.Sponsors.map((sponsors) => {
                      return (
                        <>
                          <div class="tab-item">
                            <div class="owl-theme owl-carousel sponsor-slider">
                              {sponsors.Logo && sponsors.Logo.length > 0
                                ? sponsors.Logo.map((Logo) => {
                                    return (
                                      <>
                                        <div class="sponsor-thumb">
                                          <a href="#0">
                                            <img
                                              src={`Events/${Logo.filename}`}
                                              alt="sponsor"
                                            />
                                          </a>
                                        </div>{" "}
                                      </>
                                    );
                                  })
                                : null}
                            </div>
                          </div>
                        </>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}
      <Player
        showModal={displayConfirmationModal}
        confirmModal={submitPlayer}
        hideModal={hideConfirmationModal}
        Url={Url}
      />
    </div>
  );
};
export default Details;
