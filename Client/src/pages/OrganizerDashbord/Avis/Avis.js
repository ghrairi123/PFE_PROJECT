import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSortEvents,
  getLastEvents,
} from "../../../redux/actions/EventsActions";
import { fetchCategory } from "../../../redux/actions/CategoryActions";
import { useLocation } from "react-router-dom";
import Message from "./Message";
import Rating from "./Rating";
import Player from "./reactPlayer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Avis = ({ getSortEvents, evnt, getLastEvents, LastEvents, email }) => {
  const [Url, setUrl] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [SearchData, setSearchData] = useState("");
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
  const categories = useSelector(
    (state) => state.category.categories.categories
  );
  console.log(categories);
  /*  const  email  = useSelector(state=> state.auth.account);
    const  evnt  = useSelector(state=> state.event.SortEvents);*/
  console.log(email._id);
  const { state } = useLocation();
  console.log(state);
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      getSortEvents(state.IdEvents);
    }, 1000);
    return () => clearInterval(interval);
  }, [getSortEvents]);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      getLastEvents(state.IdEvents);
    }, 1000);
    return () => clearInterval(interval);
  }, [getLastEvents]);
  if (LastEvents.length > 0) {
    LastEvents.map((evt) => {
      console.log(evt);
    });
  }
  return (
    <div>
      <section class="blog-section padding-top padding-bottom">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 mb-50 mb-lg-0">
              <article>
                {evnt && evnt.length > 0 ? (
                  evnt
                    .filter((cate) => {
                      if (SearchData == "") return cate;
                      else if (
                        cate.Title.toLowerCase().includes(
                          SearchData.toLowerCase()
                        )
                      ) {
                        return cate;
                      }
                    })
                    .map((evt) => {
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
                          <div class="post-item">
                            <div class="post-thumb">
                              {evt.images && evt.images.length > 0
                                ? evt.images.map((imgs) => {
                                    return (
                                      <>
                                        <img
                                          src={`Events/${imgs.filename}`}
                                          style={{
                                            width: "730px",
                                            height: "400px",
                                          }}
                                          alt="blog"
                                        />
                                      </>
                                    );
                                  })
                                : null}
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
                                          class="video-button video-popup"
                                        >
                                          <span></span>
                                          <i class="fa fa-play"></i>
                                        </a>{" "}
                                      </>
                                    );
                                  })
                                : null}
                            </div>
                            <div class="post-content">
                              <div class="post-header">
                                <h4 class="title">
                                  <a href="blog-details.html">{evt.Title}</a>
                                </h4>
                                <div class="meta-post">
                                  <a href="#0" class="mr-4">
                                    <i class="far fa-comments"></i>
                                    {evt.numReviews} commentaires
                                  </a>
                                  <a href="#0">
                                    {" "}
                                    <Rating value={evt.rating} text={``} />
                                  </a>
                                </div>
                                <p>
                                  {evt.reviews.length === 0 && (
                                    <Message>Aucun avis</Message>
                                  )}
                                  {evt.reviews.slice(0, 2).map((review) => (
                                    <>
                                      {" "}
                                      <strong>{review.name}</strong>
                                      <Rating value={review.rating} />
                                      <p>{review.createdAt.substring(0, 10)}</p>
                                      <p>{review.comment}</p>
                                    </>
                                  ))}{" "}
                                </p>
                              </div>
                              <Link
                                to={{
                                  pathname: `/CommentDetails`,
                                  state: { event: evt },
                                }}
                              >
                                <a href="#0" class="buttons">
                                  Lire la suite
                                  <i class="fas fa-arrow-right"></i>
                                </a>
                              </Link>
                            </div>
                          </div>{" "}
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
              </article>
            </div>
            <div class="col-lg-4 col-sm-10 col-md-8">
              <aside>
                <div class="widget widget-search">
                  <h5 class="title">chercher</h5>
                  <form class="search-form">
                    <input
                      type="text"
                      onChange={(evnt) => {
                        setSearchData(evnt.target.value);
                      }}
                      placeholder="Entrez votre contenu de recherche"
                      required
                    />
                    <button type="submit">
                      <i class="fas fa-search"></i>chercher
                    </button>
                  </form>
                </div>

                <div class="widget widget-categories">
                  <h5 class="title">categories</h5>
                  <ul>
                    {categories && categories.length > 0
                      ? categories.map((cate) => {
                          const catt = cate.children;
                          console.log(catt);
                          return (
                            <>
                              <li>
                                <a href="#0">
                                  <span>{cate.name}</span>
                                  <span>
                                    {cate.children.length} Sous Catégories
                                  </span>
                                </a>
                              </li>
                            </>
                          );
                        })
                      : null}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
        <Player
          showModal={displayConfirmationModal}
          confirmModal={submitPlayer}
          hideModal={hideConfirmationModal}
          Url={Url}
        />
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    evnt: state.event.SortEvents,
    LastEvents: state.event.LastEvents,
    email: state.auth.account,
  };
};

export default connect(mapStateToProps, { getSortEvents, getLastEvents })(Avis);
