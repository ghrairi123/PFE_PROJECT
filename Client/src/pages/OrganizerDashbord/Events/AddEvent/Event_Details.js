import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsById } from "../../../../redux/actions/EventsActions";
import { useLocation } from "react-router-dom";
function Event_Details() {
  const dispatch = useDispatch();

  const { state } = useLocation();
  console.log(state);
  const Events = useSelector((state) => state.event.eventById);
  useEffect(() => {
    dispatch(getEventsById(state.Events));
  }, []);
  console.log(Events.length);
  if (Events.length > 0) {
    Events.map((evnt) => {
      console.log(evnt);
    });
  }
  return (
    <div>
      {Events && Events.length > 0
        ? Events.map((evnt) => {
            var date = new Date();
            const month = evnt.StartDate,
              n = month[date.getMonth()],
              day = month[date.getDay()];
            //let heures = month[date.getHours()];
            const Year = month[date.getFullYear()];
            console.log(Year);

            let date1 = new Date(evnt.StartDate);
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
            var date3 = new Date(evnt.StartDate);
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
              <>
                <section
                  class="event-banner-section bg_img"
                  /* data-background={`Events/${imagealeatoir.filename}`} */ style={{
                    paddingLeft: "100px",
                    paddingRight: "150px",
                  }}
                >
                  <div class="container">
                    <div class="event-banner">
                      {evnt.vidéo && evnt.vidéo.length > 0
                        ? evnt.vidéo.map((vid) => {
                            return (
                              <>
                                <a
                                  /* onClick={() => showPlayerModal(`Events/${vid.filename}`)}  */ class="video-popup"
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
                          <h3 class="title">{evnt.Title}</h3>
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
                              <span>{evnt.Fillingrate}</span>
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
                              <span class="up">{evnt.Location}-</span>
                              <span>{evnt.city}</span>
                            </div>
                          </div>
                          <div class="item">
                            <div class="item-thumb">
                              <img
                                src="assets/images/event/icon/event-icon03.png"
                                alt="event"
                              />
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
                              {evnt.Title}-<span>{Year}</span>
                            </h2>
                            <p> {evnt.Description}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-5 col-md-7">
                        <div class="event-about-thumb">
                          {" "}
                          {evnt.images && evnt.images.length > 0
                            ? evnt.images.map((vid) => {
                                return (
                                  <>
                                    <img
                                      src={`Events/${vid.filename}`}
                                      alt="event"
                                    />
                                  </>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <div
                  class="speaker-gallery"
                  style={{ paddingLeft: "100px", paddingRight: "150px" }}
                >
                  {" "}
                  <br /> <br />
                  <div class="row m-0">
                    {evnt.images && evnt.images.length > 0
                      ? evnt.images.map((vid) => {
                          return (
                            <>
                              <div class="col-md-4 p-0">
                                <div class="gallery-item">
                                  <div class="gallery-thumb">
                                    <a
                                      href={`Events/${vid.filename}`}
                                      class="img-pop"
                                    >
                                      <i class="fas fa-search"></i>
                                    </a>
                                    <img
                                      src={`Events/${vid.filename}`}
                                      style={{
                                        height: "400px",
                                        width: "500px",
                                        textAlign: "center",
                                      }}
                                      alt="gallery"
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })
                      : null}
                  </div>
                </div>{" "}
              </>
            );
          })
        : null}
    </div>
  );
}

export default Event_Details;
