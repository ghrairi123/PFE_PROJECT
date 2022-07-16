import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Player from "./reactPlayer";
import Message from "./Message";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function CommentDetails() {
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

  const imagealeatoir =
    state.event.images[Math.floor(Math.random() * state.event.images.length)];
  //    console.log(imagealeatoir)
  let date1 = new Date(state.event.StartDate);
  let jourMois = date1.getDate();
  let mois = date1.getMonth();
  let annee = date1.getFullYear();
  let heures = date1.getHours();
  const evvt = new Date(Date.UTC(annee, mois, jourMois, heures, 0, 0));
  const Y = { month: "long" };
  const d = { day: "numeric" };

  return (
    <div>
      <section class="blog-section padding-top padding-bottom">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 mb-50 mb-lg-0">
              <article>
                <div class="post-item">
                  <div class="post-thumb">
                    <img
                      src={`Events/${imagealeatoir.filename}`}
                      style={{ width: "730px", height: "400px" }}
                      alt="blog"
                    />
                    {state.event.vidéo && state.event.vidéo.length > 0
                      ? state.event.vidéo.map((vid) => {
                          return (
                            <>
                              <a
                                onClick={() =>
                                  showPlayerModal(`Events/${vid.filename}`)
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
                        <a href="blog-details.html">{state.event.Title}</a>
                      </h4>
                      <div class="meta-post">
                        <a href="#0" class="mr-4">
                          <i class="flaticon-conversation"></i>
                          {state.event.numReviews} commentaires
                        </a>
                        <a href="#0">
                          {" "}
                          <Rating value={state.event.rating} text={``} />
                        </a>
                      </div>
                      <p>
                        {state.event.reviews.length === 0 && (
                          <Message>Aucun avis</Message>
                        )}
                        {state.event.reviews.map((review) => (
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
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>{" "}
        <Player
          showModal={displayConfirmationModal}
          confirmModal={submitPlayer}
          hideModal={hideConfirmationModal}
          Url={Url}
        />
      </section>
    </div>
  );
}

export default CommentDetails;
