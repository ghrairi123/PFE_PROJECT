import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllEvents } from "../../../redux/actions/EventsActions";
import { useLocation } from "react-router-dom";
import Player from "./Modal/reactPlayer";
import { connect } from "react-redux";
import Modal from "./Modal/DeleteEquipe";
import DeleteModal from "./Modal/DeleteClasse";
import DeleteSpnsor from "./Modal/DeleteSpnsor";
import { Link } from "react-router-dom";
import ADDModal from "../Events/AddEvent/Modals/AddEquipe";
import ModalSponsor from "../Events/AddEvent/Modals/AddSponsor";
import ModalClasse from "../Events/AddEvent/Modals/addClass";
import { ShowOrganizersparEvents } from "../../../redux/actions/EventsActions";
import { getEventsById } from "../../../redux/actions/EventsActions";
import axios from "../../../util/axios";

const EventsDetails = ({
  EventPromo,
  ShowOrganizersparEvents,
  OrganizersparEvents,
}) => {
  const [idEvent, setIdEvent] = useState(null);
  const [id, setId] = useState(null);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [displayConfirmatDeleteModal, setDisplayConfirmatDeleteModal] =
    useState(false);
  const [DisplayConfirmationAddModal, setDisplayConfirmationAddModal] =
    useState(false);
  const [ADDMessage, setADDMessage] = useState(null);
  const [ADDedMessage, setADDedMessage] = useState(null);

  const [
    DisplayConfirmationSponsorsAddModal,
    setDisplayConfirmationSponsorsAddModal,
  ] = useState(false);
  const [ADDSponsorsMessage, setADDSponsorsMessage] = useState(null);
  const [ADDedSponsorsMessage, setADDedSponsorsMessage] = useState(null);

  const [
    DisplayConfirmationClasseAddModal,
    setDisplayConfirmationClasseAddModal,
  ] = useState(false);
  const [ADDClasseMessage, setADDClasseMessage] = useState(null);
  const [ADDedClasseMessage, setADDedClasseMessage] = useState(null);

  const showADDSpnsorsModal = (id) => {
    setIdEvent(id);
    setADDSponsorsMessage(null);
    setADDedSponsorsMessage(`Partagez les détails de votre événement  :D`);
    setDisplayConfirmationSponsorsAddModal(true);
  };

  const hideConfirmationSponsorsADDModal = () => {
    setDisplayConfirmationSponsorsAddModal(false);
  };
  const submitADDSponsors = () => {
    setADDedSponsorsMessage(` added successfully.`);
    setDisplayConfirmationSponsorsAddModal(false);
  };
  const showDeleteModal = (id) => {
    setId(id);
    setdeletMessage(null);
    setsuprimMessage(`Êtes-vous sûr de vouloir supprimer le membre ?`);
    setDisplayConfirmatDeleteModal(true);
  };

  const showDeleteClasseModal = (id) => {
    setId(id);
    setdeletMessage(null);
    setsuprimMessage(`Êtes-vous sûr de vouloir supprimer la classe ?`);
    setDisplayConfirmatDeleteModal(true);
  };
  const showDeleteSponsorModal = (id) => {
    setId(id);
    setdeletMessage(null);
    setsuprimMessage(`Êtes-vous sûr de vouloir supprimer le sponsor?`);
    setDisplayConfirmatDeleteModal(true);
  };
  const hideConfirmationDeleteModal = () => {
    setDisplayConfirmatDeleteModal(false);
  };
  const submitDelete = (id) => {
    setsuprimMessage(`The fruit was deleted successfully.`);

    setDisplayConfirmatDeleteModal(false);
  };
  const showADDClasseModal = (id) => {
    setIdEvent(id);
    setADDClasseMessage(null);
    setADDedClasseMessage(`Partagez les détails de votre événement  :D`);
    setDisplayConfirmationClasseAddModal(true);
  };

  const hideConfirmationClasseADDModal = () => {
    setDisplayConfirmationClasseAddModal(false);
  };
  const submitADDClasse = () => {
    setADDedClasseMessage(` added successfully.`);
    setDisplayConfirmationClasseAddModal(false);
  };

  const showADDModal = (id) => {
    setIdEvent(id);
    setADDMessage(null);
    setADDedMessage(`Partagez les détails de votre événement  :D`);
    setDisplayConfirmationAddModal(true);
  };
  const hideConfirmationADDModal = () => {
    setDisplayConfirmationAddModal(false);
  };
  const submitADD = () => {
    setADDedMessage(` added successfully.`);
    setDisplayConfirmationAddModal(false);
  };

  const { state } = useLocation();
  console.log(state.events.Classes);

  useEffect(() => {
    ShowOrganizersparEvents(state.events._id);
  }, [ShowOrganizersparEvents]);

  let NameOrganizer;
  let LastNameorg;
  OrganizersparEvents.map(
    (organizer) => (
      (NameOrganizer = organizer.Name), (LastNameorg = organizer.LastName)
    )
  );
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
  let heuresUTC = date1.getUTCHours();
  let minutes = date1.getMinutes();
  let secondes = date1.getSeconds();
  let ms = date1.getMilliseconds();
  console.log(jourSemaine);
  console.log(jourMois);
  console.log(mois);
  console.log(annee);
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
  const {
    account: { email },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(getEventsById(state.events._id));
      /*    alert(state.events._id); */
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [users, setusers] = useState({});

  const [account, setacoount] = useState({});
  useEffect(() => {
    const chart = () => {
      axios
        .get(`/user/${state.events.createdBy}`)
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
  // const  EventReview  = useSelector(state=> state.event.EventReview);
  const events = useSelector((state) => state.event.eventById);
  console.log(events);
  return (
    <div>
      <section
        class="event-banner-section bg_img"
        data-background={`Events/${imagealeatoir.filename}`}
        style={{ paddingLeft: "100px", paddingRight: "150px" }}
      >
        <div class="container">
          <div class="event-banner">
            {events.vidéo && events.vidéo.length > 0
              ? events.vidéo.map((vid) => {
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
                <h3 class="title">{events.Title}</h3>
              </div>{" "}
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
                    <span>{events.Fillingrate}</span>
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
                    <span class="up">{events.Location}-</span>
                    <span>{events.city}</span>
                  </div>
                </div>
                <div class="item">
                  <div class="item-thumb">
                    <img
                      src="assets/images/event/icon/event-icon03.png"
                      alt="event"
                    />
                  </div>

                  <div class="item-content">
                    <span class="up">Créé par</span>
                    <a>{users.email}</a>
                  </div>
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
                    {events.Title}-<span>{Year}</span>
                  </h2>
                  <p> {events.Description}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-5 col-md-7">
              <div class="event-about-thumb">
                {" "}
                {state.events.images && state.events.images.length > 0 ? (
                  state.events.images.map((vid) => {
                    return (
                      <>
                        <img src={`Events/${vid.filename}`} alt="event" />
                      </>
                    );
                  })
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
                      <li onClick={() => showADDModal(events._id)}>
                        Ajouter Un membre
                      </li>
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
                                      EquipeEvent.Photo.length > 0 ? (
                                        EquipeEvent.Photo.map((Photo) => {
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
                                    EquipeEvent.Photo.length > 0 ? (
                                      EquipeEvent.Photo.map((Photo) => {
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
                                  <div class="review">
                                    <Link
                                      className="edit-link"
                                      to={`/updateEquipes/${EquipeEvent._id}/${EquipeEvent.FirstName}/${EquipeEvent.Lastname}/${EquipeEvent.JobName}/${EquipeEvent.Photo}/${EquipeEvent.Description}`}
                                    >
                                      <i
                                        class="fas fa-edit fa-2x"
                                        style={{ color: "#31d7a9" }}
                                      ></i>{" "}
                                    </Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <a
                                      onClick={() =>
                                        showDeleteModal(EquipeEvent._id)
                                      }
                                    >
                                      <div class="thumb">
                                        <i class="fas fa-trash-alt fa-2x"></i>{" "}
                                      </div>
                                    </a>
                                  </div>{" "}
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
      ) : (
        <section class="movie-details-section padding-top padding-bottom">
          <div class="container">
            <div class="row justify-content-center flex-wrap-reverse mb--50">
              <div class="col-lg-9 mb-50">
                <div class="movie-details">
                  <div class="tab summery-review">
                    <ul class="tab-menu">
                      <li
                        class="active"
                        onClick={() => showADDModal(events._id)}
                      >
                        Ajouter Un membre
                      </li>
                    </ul>
                    <div class="tab-area">
                      <div class="tab-item active">
                        <div class="item">
                          <h5 class="sub-title"> Pas d'équipe</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
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
                      data-odometer-final={events.Reserved_seat}
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
                      data-odometer-final={events.Fillingrate}
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
                      data-odometer-final={events.Unreserved_seat}
                    ></h3>
                    <span class="info">billets disponibles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="faq-section padding-top">
        <div class="event-facility padding-bottom padding-top">
          <div class="container">
            <div class="section-header-3">
              <span class="cate">tarification simple </span>
              <div class="tabTwo sponsor-tab">
                <ul class="tab-menu">
                  <li onClick={() => showADDClasseModal(events._id)}>
                    ajouter une classe d'événement
                  </li>
                </ul>
              </div>
            </div>
            <div class="row justify-content-center mb-30-none">
              {events.Classes && events.Classes.length > 0
                ? events.Classes.map((ClassEvent) => {
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
                                {events.Promo == true ? (
                                  <>
                                    <li>{events.Title} en Promo</li>
                                  </>
                                ) : null}{" "}
                              </ul>
                              <br />
                              {/*          <div class="review">
                                <Link
                                  className="edit-link"
                                  to={`/UpdateClasse/${ClassEvent._id}/${ClassEvent.ClassName}/${ClassEvent.Price}`}
                                >
                                  <i
                                    class="fas fa-edit fa-2x"
                                    style={{ color: "#31d7a9" }}
                                  ></i>{" "}
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a
                                  onClick={() =>
                                    showDeleteClasseModal(ClassEvent._id)
                                  }
                                >
                                  <div class="thumb">
                                    <i
                                      class="fas fa-trash-alt fa-2x"
                                      style={{ color: "red" }}
                                    ></i>{" "}
                                  </div>
                                </a>
                              </div>{" "} */}
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
      )
      <Player
        showModal={displayConfirmationModal}
        confirmModal={submitPlayer}
        hideModal={hideConfirmationModal}
        Url={Url}
      />
      <ADDModal
        showModal={DisplayConfirmationAddModal}
        confirmModal={submitADD}
        hideModal={hideConfirmationADDModal}
        idEvent={events._id}
        message={ADDedMessage}
      />
      <ModalSponsor
        showModal={DisplayConfirmationSponsorsAddModal}
        confirmModal={submitADDSponsors}
        hideModal={hideConfirmationSponsorsADDModal}
        idEvents={events._id}
        message={ADDedSponsorsMessage}
      />
      <ModalClasse
        showModal={DisplayConfirmationClasseAddModal}
        confirmModal={submitADDClasse}
        hideModal={hideConfirmationClasseADDModal}
        idEvents={events._id}
        message={ADDedClasseMessage}
      />
      <Modal
        showModal={displayConfirmatDeleteModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationDeleteModal}
        id={id}
        message={suprimMessage}
      />
      <DeleteSpnsor
        showModal={displayConfirmatDeleteModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationDeleteModal}
        id={id}
        message={suprimMessage}
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
};
const mapStateToProps = (state) => {
  return {
    OrganizersparEvents: state.event.Eventorganizer,
  };
};
export default connect(mapStateToProps, { ShowOrganizersparEvents })(
  EventsDetails
);
