import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Get_Events_Par_Category,
  Get_Class_Par_Events,
  Get_Event_PROMO,
} from "../../../redux/actions/EventsActions";
import { fetchCategory } from "../../../redux/actions/CategoryActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const List = ({ Get_Events_Par_Category, categoryEvents }) => {
  const [id, setId] = useState(null);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const { state } = useLocation();
  console.log(state.events._id);
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

  useEffect(() => {
    Get_Events_Par_Category(state.events._id);
  }, [Get_Events_Par_Category]);
  var date = new Date();
  var day;
  var month;
  var n;
  categoryEvents.map(
    (teacher) => (
      console.log(teacher),
      (month = teacher.StartDate),
      (n = month[date.getMonth()]),
      (day = month[date.getDay()])
    )
  );
  console.log(n);
  console.log(day);
  const dispatch = useDispatch();
  const catego = useSelector((state) => state.category.categories);
  console.log(catego);
  const cat = catego.categories;
  console.log(cat);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  return (
    <div>
      <br />
      <br />
      <section class="event-section padding-top padding-bottom">
        <div class="container" style={{ maxWidth: "1300px" }}>
          <div class="row flex-wrap-reverse justify-content-center">
            <div class="col-sm-10 col-md-8 col-lg-3">
              <div class="widget-1 widget-banner">
                <div class="widget-1-body">
                  <a href="#0">
                    <img
                      src="assets/images/sidebar/banner/banner01.jpg"
                      alt="banner"
                    />
                  </a>
                </div>
              </div>
              {cat && cat.length > 0
                ? cat.map((cate) => {
                    const catt = cate.children;
                    console.log(catt);
                    return (
                      <>
                        {catt && catt.length > 0 ? (
                          <div class="widget-1 widget-check">
                            <div class="widget-1-body">
                              <h6 class="subtitle">{cate.name}</h6>
                              <div class="check-area">
                                {catt && catt.length > 0
                                  ? catt.map((cat) => {
                                      return (
                                        <>
                                          <div class="form-group">
                                            <input
                                              type="checkbox"
                                              name="lang"
                                              id="lang1"
                                            />
                                            <label for="lang1">
                                              {cat.name}
                                            </label>
                                          </div>
                                        </>
                                      );
                                    })
                                  : null}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </>
                    );
                  })
                : null}{" "}
            </div>
            <div class="col-lg-9 mb-50 mb-lg-0">
              <div class="filter-tab">
                <div class="filter-area">
                  <div class="filter-main">
                    <div class="left w-100 justify-content-between">
                      <div class="item">
                        <span class="show">Montrer :</span>
                        <select class="select-bar">
                          <option value="12">12</option>
                          <option value="15">15</option>
                          <option value="18">18</option>
                          <option value="21">21</option>
                          <option value="24">24</option>
                          <option value="27">27</option>
                          <option value="30">30</option>
                        </select>
                      </div>
                      <div class="item mr-0">
                        <span class="show">Trier par :</span>
                        <select class="select-bar">
                          <option value="exclusive">exclusive</option>
                          <option value="trending">tendance</option>
                          <option value="most-view">la plupart des vues</option>
                          <option value="showing">now showing</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-10 justify-content-center">
                  {categoryEvents && categoryEvents.length > 0
                    ? categoryEvents.map((evnt) => {
                        console.log(evnt);
                        const imag = evnt.ProfilPicture;
                        const month = evnt.StartDate,
                          n = month[date.getMonth()],
                          day = month[date.getDay()];
                        let date1 = new Date(evnt.StartDate);
                        console.log(date1);
                        let jourMois = date1.getDate();
                        let mois = date1.getMonth();
                        let annee = date1.getFullYear();
                        let heures = date1.getHours();
                        const evt = new Date(
                          Date.UTC(annee, mois, jourMois, heures, 0, 0)
                        );
                        const Y = { month: "long" };
                        const d = { day: "numeric" };
                        console.log(evt.toLocaleDateString(undefined, Y));

                        return (
                          <>
                            <div class="col-sm-6 col-lg-4">
                              <div class="event-grid">
                                <div class="movie-thumb c-thumb">
                                  <Link
                                    to={{
                                      pathname: `/Details`,
                                      state: { events: evnt },
                                    }}
                                  >
                                    {imag && imag.length > 0
                                      ? imag.map((imgs) => {
                                          return (
                                            <>
                                              <img
                                                src={`Events/${imgs.filename}`}
                                                alt="event"
                                              />
                                            </>
                                          );
                                        })
                                      : null}{" "}
                                  </Link>
                                  <div class="event-date">
                                    <h6 class="date-title">
                                      {evt.toLocaleDateString(undefined, d)}
                                    </h6>
                                    <span>
                                      {evt.toLocaleDateString(undefined, Y)}
                                    </span>
                                  </div>
                                </div>
                                <div class="movie-content bg-one">
                                  <h5 class="title m-0">
                                    <Link
                                      to={{
                                        pathname: `/Details`,
                                        state: { events: evnt },
                                      }}
                                    >
                                      {evnt.Title}
                                    </Link>
                                  </h5>
                                  <div
                                    class="movie-rating-percent"
                                    style={{ color: "white" }}
                                  >
                                    <i class="fas fa-map-marker"></i>
                                    <a> {evnt.Location}</a>
                                    <br />
                                    <Link
                                      to={{
                                        pathname: `/Check_Out`,
                                        state: { events: evnt },
                                      }}
                                      style={{ color: "brown" }}
                                    >
                                      <i class="fas fa-calendar-check"></i>{" "}
                                      Reserver
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    : null}
                </div>
                <div class="pagination-area text-center">
                  <a href="#0">
                    <i class="fas fa-angle-double-left"></i>
                    <span>Prev</span>
                  </a>
                  <a href="#0">1</a>
                  <a href="#0">2</a>
                  <a href="#0" class="active">
                    3
                  </a>
                  <a href="#0">4</a>
                  <a href="#0">5</a>
                  <a href="#0">
                    <span>Next</span>
                    <i class="fas fa-angle-double-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    categoryEvents: state.event.events,
  };
};

export default connect(mapStateToProps, { Get_Events_Par_Category })(List);
