import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { Link, NavLink } from "react-router-dom";

function AllEvents() {
  const { state } = useLocation();
  const [Event, setEvent] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    const evts = () => {
      axios.get(`/api/Event?page=${pageNumber}`).then((res) => {
        setEvent(res.data.Event);
        setNumberOfPages(res.data.totalPages);
      });
    };
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
  return (
    <div>
      {" "}
      <section class="movie-section padding-top padding-bottom bg-two">
        <div class="container">
          <div class="row flex-wrap-reverse justify-content-center">
            <div class="col-lg-9">
              <div class="article-section padding-bottom">
                <div class="section-header-1">
                  <h2 class="title">{state.categ.name}</h2>
                </div>
                <div class="row mb-30-none justify-content-center">
                  {Event && Event.length > 0 ? (
                    Event /* .filter((evnt) => {
                      if (SearchData == "") return evnt;
                      else if (
                        evnt.Title.toLowerCase().includes(
                          SearchData.toLowerCase()
                        )
                      ) {
                        return evnt;
                      }
                    }) */.map((evt) => {
                      return (
                        <>
                          {evt.Scategory === state.categ._id ||
                          evt.category === state.categ._id ? (
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
                                      {evt.images && evt.images.length > 0
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
                                          <a href="/login">Acheter</a>
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
              </div>
            </div>
          </div>
        </div>
        <div class="pagination-area text-center">
          <a onClick={gotoPrevious}>
            <i onClick={gotoPrevious} class="fas fa-angle-double-left"></i>
            <span>Précédente</span>
          </a>

          {pages.map((pageIndex) => (
            <a key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
              {pageIndex + 1}
            </a>
          ))}
          <a onClick={gotoNext}>
            {" "}
            <span>Prochaine</span>
            <i onClick={gotoNext} class="fas fa-angle-double-right"></i>
          </a>
        </div>
      </section>
    </div>
  );
}

export default AllEvents;
