import {
  fetchCategory,
  Show_Events_Category,
} from "../../redux/actions/CategoryActions";
import { fetchcities } from "../../redux/actions/CityAction";
import { GetAllEvents } from "../../redux/actions/EventsActions";
import { MaxReviews } from "../../redux/actions/Static";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../OrganizerDashbord/Avis/Rating";
import axios from "../../util/axios";
import { Link, NavLink } from "react-router-dom";
import Player from "./Event/Modals/reactPlayer";
import Modal from "./InfoModal";

function Home() {
  const [SearchData, setSearchData] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [Event, setEvent] = useState([]);
  const [Organ, setOrgan] = useState({});
  const [Avisevnt, setAvisevnt] = useState([]);
  const [DisplayConfirmationAddModal, setDisplayConfirmationAddModal] =
    useState(false);

  const [ADDMessage, setADDMessage] = useState(null);
  const [ADDedMessage, setADDedMessage] = useState(null);
  const showADDModal = () => {
    setADDMessage(null);
    setADDedMessage(`Voulez-vous vraiment supprimer la catégorie  ?`);
    setDisplayConfirmationAddModal(true);
  };
  const hideConfirmationADDModal = () => {
    setDisplayConfirmationAddModal(false);
  };
  const submitADD = () => {
    setADDedMessage(` added successfully.`);
    setDisplayConfirmationAddModal(false);
  };

  const handleSearchChange = (evt) => {
    setSearchData(evt.target.value);
  };
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  useEffect(() => {
    const evts = () => {
      axios.get(`/api/Event?page=${pageNumber}`).then((res) => {
        setEvent(res.data.Event);
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
  useEffect(() => {
    axios.get(`/api/maximumRev`).then((res) => {
      setOrgan(res.data.data);
    });
  }, []);
  useEffect(() => {
    const evts = () => {
      axios.get(`/api/maximumRevevt`).then((res) => {
        setAvisevnt(res.data.data);
      });
    };
    const interval = setInterval(() => {
      evts();
    }, 1000);
    return () => clearInterval(interval);
  }, [pageNumber]);
  /* 
  Organ.map((org) => {
    console.log(org);
  }); */

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  const [Url, setUrl] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);

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
  const dispatch = useDispatch();
  const catego = useSelector((state) => state.category.categories);
  console.log(catego);
  const cat = catego.categories;
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const cities = useSelector((state) => state.city.cities);
  useEffect(() => {
    dispatch(fetchcities());
  }, []);
  return (
    <div>
      <section class="banner-section" style={{ padding: "250px 0 159px" }}>
        <div
          class="banner-bg bg_img bg-fixed"
          data-background="assets/images/banner/banner01.jpg"
        ></div>
        <div class="container">
          <div class="banner-content">
            <h3 class="title  cd-headline clip">
              <span class="d-block">RÉSERVEZ VOS BILLETS POUR</span>

              <span class="color-theme cd-words-wrapper p-0 m-0">
                {cat && cat.length > 0
                  ? cat.map((cate) => {
                      return (
                        <>
                          <b class="is-visible">{cate.name}</b>
                        </>
                      );
                    })
                  : null}
              </span>
            </h3>
            <p>Billetterie sûre, sécurisée et fiable</p>

            <br />
          </div>
        </div>
      </section>
      <section class="search-ticket-section padding-top pt-lg-0">
        <div class="container">
          <div
            class="search-tab bg_img"
            data-background="assets/images/ticket/ticket-bg01.jpg"
          >
            <div class="row align-items-center mb--20">
              <div class="col-lg-6 mb-20">
                <div class="search-ticket-header">
                  <h6 class="category">Bienvenue à Boleto </h6>
                </div>
              </div>
              <div class="col-lg-6 mb-20">
                <ul class="tab-menu ticket-tab-menu">
                  <li class="active">
                    <div class="tab-thumb">
                      <img
                        src="assets/images/ticket/ticket-tab01.png"
                        alt="ticket"
                      />
                    </div>
                    <span>FILMS</span>
                  </li>
                  <li>
                    <div class="tab-thumb">
                      <img
                        src="assets/images/ticket/ticket-tab02.png"
                        alt="ticket"
                      />
                    </div>
                    <span>événement</span>
                  </li>
                  <li>
                    <div class="tab-thumb">
                      <img
                        src="assets/images/ticket/ticket-tab03.png"
                        alt="ticket"
                      />
                    </div>
                    <span>sports</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="tab-area">
              <div class="tab-item active">
                <form class="ticket-search-form">
                  <div class="form-group large">
                    <input
                      type="text"
                      placeholder="Rechercher"
                      onChange={(evnt) => {
                        setSearchData(evnt.target.value);
                      }}
                    />
                    <button type="submit">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div class="tab-item">
                <form class="ticket-search-form">
                  <div class="form-group large">
                    <input
                      type="text"
                      placeholder="Rechercher "
                      onChange={(evnt) => {
                        setSearchData(evnt.target.value);
                      }}
                    />
                    <button type="submit">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div class="tab-item">
                <form class="ticket-search-form">
                  <div class="form-group large">
                    <input
                      type="text"
                      placeholder="Rechercher"
                      onChange={(evnt) => {
                        setSearchData(evnt.target.value);
                      }}
                    />
                    <button type="submit">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <section class="movie-section  padding-bottom bg-two">
        <div class="container">
          <div class="row flex-wrap-reverse justify-content-center">
            <div class="col-lg-3 col-sm-10  mt-50 mt-lg-0">
              <div class="widget-1 widget-check">
                <div class="widget-1-body">
                  <h6 class="subtitle">Cherche Ici</h6>
                  <input
                    type="text"
                    placeholder="Rechercher"
                    onChange={(evnt) => {
                      setSearchData(evnt.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <div class="check-area">
                    <h6 class="subtitle">Prix</h6>
                    <div class="form-group">
                      <Link
                        to={{
                          pathname: `/Event_Price`,
                          state: { PriceMin: 10, PriceMax: 20 },
                        }}
                        for="lang1"
                        style={{ color: "#EE82EE" }}
                      >
                        10 dt - 20 dt{" "}
                      </Link>
                      <br />
                    </div>

                    <div class="form-group">
                      <Link
                        Link
                        to={{
                          pathname: `/Event_Price`,
                          state: { PriceMin: 20, PriceMax: 50 },
                        }}
                        for="lang1"
                        style={{ color: "#EE82EE" }}
                      >
                        20 dt - 50 dt{" "}
                      </Link>
                      <br />
                    </div>

                    <div class="form-group">
                      <Link
                        Link
                        to={{
                          pathname: `/Event_Price`,
                          state: { PriceMin: 50, PriceMax: 1000000 },
                        }}
                        for="lang1"
                        style={{ color: "#EE82EE" }}
                      >
                        Plus de 50 dt{" "}
                      </Link>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              <div class="widget-1 widget-banner">
                <div class="widget-1-body">
                  <h6>Meilleur organisateur</h6>
                  <br />
                  {Organ.Photo && Organ.Photo.length > 0
                    ? Organ.Photo.map((org) => {
                        return (
                          <>
                            <Link
                              to={{
                                pathname: `/OrganiserInfo`,
                                state: { users: Organ },
                              }}
                            >
                              <a /* onClick={() => showADDModal()} */>
                                <img
                                  src={`UsersInformation/${org.filename}`}
                                  style={{ height: "340px" }}
                                />
                              </a>
                            </Link>
                          </>
                        );
                      })
                    : null}{" "}
                </div>
              </div>{" "}
              {Avisevnt && Avisevnt.length > 0
                ? Avisevnt.map((avis) => {
                    return (
                      <>
                        <div class="widget-1 widget-trending-search">
                          <h3 class="title">Meilleur Événement</h3>
                          <div class="widget-1-body">
                            <ul>
                              <li>
                                {avis.images && avis.images.length > 0
                                  ? avis.images.map((Photo) => {
                                      return (
                                        <>
                                          <Link
                                            to={{
                                              pathname: `/Detailsevt`,
                                              state: { events: avis },
                                            }}
                                          >
                                            <img
                                              src={`Events/${Photo.filename}`}
                                              style={{
                                                height: "250px",
                                              }}
                                              alt="speaker"
                                            />
                                          </Link>
                                        </>
                                      );
                                    })
                                  : null}{" "}
                              </li>
                              <li>
                                <h6 class="sub-title">
                                  {" "}
                                  <Link
                                    to={{
                                      pathname: `/Detailsevt`,
                                      state: { events: avis },
                                    }}
                                  >
                                    {avis.Title}
                                  </Link>
                                </h6>
                              </li>
                              <li>
                                <h6 class="sub-title">
                                  <Rating value={avis.rating} text={``} />
                                </h6>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    );
                  })
                : null}{" "}
            </div>
            <div class="col-lg-9">
              <div class="article-section padding-bottom">
                {cat && cat.length > 0
                  ? cat.map((cate) => {
                      return (
                        <>
                          <div class="section-header-1">
                            <h2 class="title">{cate.name}</h2>
                            <Link
                              class="view-all"
                              to={{
                                pathname: `/AllEvents`,
                                state: { categ: cate },
                              }}
                            >
                              Voir tout
                            </Link>
                          </div>
                          <div class="row mb-30-none justify-content-center">
                            {Event && Event.length > 0 ? (
                              Event.filter((evnt) => {
                                if (SearchData == "") return evnt;
                                else if (
                                  evnt.Title.toLowerCase().includes(
                                    SearchData.toLowerCase()
                                  )
                                ) {
                                  return evnt;
                                }
                              }).map((evt) => {
                                return (
                                  <>
                                    {evt.Scategory === cate._id ||
                                    evt.category === cate._id ? (
                                      <div>
                                        <div
                                          class="col-sm-6 col-lg-4"
                                          style={{
                                            maxWidth: "100%",
                                          }}
                                        >
                                          <div class="movie-grid">
                                            <div class="movie-thumb c-thumb">
                                              <Link
                                                to={{
                                                  pathname: `/Detailsevt`,
                                                  state: { events: evt },
                                                }}
                                              >
                                                {evt.images &&
                                                evt.images.length > 0
                                                  ? evt.images.map((imgs) => {
                                                      return (
                                                        <>
                                                          <img
                                                            src={`Events/${imgs.filename}`}
                                                            style={{
                                                              height: "340px",
                                                              width: "250px",
                                                            }}
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
                                              style={{
                                                height: "180px",
                                                width: "250px",
                                              }}
                                            >
                                              <h6 class="title m-0">
                                                <Link
                                                  to={{
                                                    pathname: `/Detailsevt`,
                                                    state: { events: evt },
                                                  }}
                                                >
                                                  {evt.Title}
                                                </Link>
                                              </h6>
                                              <ul class="movie-rating-percent">
                                                <li>
                                                  <div class="thumb">
                                                    <i class="far fa-credit-card"></i>
                                                  </div>
                                                  <span class="content">
                                                    <Link
                                                      to={{
                                                        pathname: `/Check_Out`,
                                                        state: { events: evt },
                                                      }}
                                                    >
                                                      Acheter
                                                    </Link>
                                                  </span>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : null}
                                  </>
                                );
                              })
                            ) : (
                              <p>
                                {" "}
                                <img
                                  src="assets/Spinner-1s-200px.gif"
                                  style={{
                                    width: "150px",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                  }}
                                />
                              </p>
                            )}{" "}
                          </div>
                          <br />
                        </>
                      );
                    })
                  : null}
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
      />
      <Modal
        showModal={DisplayConfirmationAddModal}
        confirmModal={submitADD}
        hideModal={hideConfirmationADDModal}
        message={ADDMessage}
        Name={Organ.Name}
        LastName={Organ.LastName}
      />
    </div>
  );
}

export default Home;
