import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
//import Player from "./reactPlayer";
import Message from "../OrganizerDashbord/Avis/Message";
import Rating from "../OrganizerDashbord/Avis/Rating";
import { Link } from "react-router-dom";
import {
  getEventsById,
  createEventReview,
} from "../../redux/actions/EventsActions";
import { showErrorMsg, showSuccessMsg } from "../../helpers/message";
import axios from "../../util/axios";
const background = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #23334f",
};

const option = {
  cursor: "pointer",
  fontWeight: "400",
  lineHeight: "40px",
  background: "transparent",
  listStyle: "none",
  minHeight: "40px",
  outline: "none",
  paddingLeft: "18px",
  paddingRight: "29px",
  textAlign: "left",
  color: "blue",
  transition: " all 0.2s",
};
function EvaluationDetails() {
  const history = useHistory();

  const { state } = useLocation();
  const {
    account: { role },
    _id,
    authenticated,
    Photo,
    LastName,
  } = useSelector((state) => state.auth);
  const [EvaluationData, setEvaluationData] = useState({
    rating: 0,
    comment: "",
  });
  const { rating, comment } = EvaluationData;
  const handleEventChange = (evt) => {
    setEvaluationData({
      ...EvaluationData,
      [evt.target.name]: evt.target.value,
    });
  };

  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  /* const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('') */
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
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(rating);
    console.log(comment);
    let formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    console.log(state.event._id, state.idUser, state.NameUser);
    dispatch(
      createEventReview(
        state.event._id,
        state.idUser,
        state.NameUser,
        formData,
        history
      )
    );

    setEvaluationData({
      rating: 0,
      comment: "",
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(getEventsById(state.event._id));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  // const  EventReview  = useSelector(state=> state.event.EventReview);
  const Events = useSelector((state) => state.event.eventById);
  console.log(Events);

  return (
    <div>
      <section class="blog-section padding-top padding-bottom">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 mb-50 mb-lg-0">
              <article>
                <div class="post-item">
                  <div class="post-thumb">
                    {state.event.images && state.event.images.length > 0
                      ? state.event.images.map((imgs) => {
                          return (
                            <>
                              <a>
                                <img
                                  src={`Events/${imgs.filename}`}
                                  style={{ width: "730px", height: "400px" }}
                                  alt="blog"
                                />
                              </a>{" "}
                            </>
                          );
                        })
                      : null}
                  </div>
                  <div class="post-content">
                    <div class="post-header">
                      <h4 class="title">
                        <a href="/">{state.event.Title}</a>
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

                      <form onSubmit={submitHandler}>
                        {errorMsg && showErrorMsg(errorMsg)}
                        {successMsg && showSuccessMsg(successMsg)}
                        <br />
                        <div>
                          <h3>Donnez votre avis sur {state.event.Title}</h3>
                        </div>{" "}
                        <br />
                        <div>
                          <label htmlFor="rating">Avis</label>
                          <select
                            id="rating"
                            value={rating}
                            name="rating"
                            onChange={handleEventChange}
                            style={background}
                          >
                            <option value="" style={option}>
                              Sélectionner
                            </option>
                            <option value="1" style={option}>
                              1- Mauvais(e)
                            </option>
                            <option value="2" style={option}>
                              2- Équitable
                            </option>
                            <option value="3" style={option}>
                              3- Bon
                            </option>
                            <option value="4" style={option}>
                              4- Très bon
                            </option>
                            <option value="5" style={option}>
                              5- Excellent
                            </option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="comment">commentaire</label>
                          <textarea
                            id="comment"
                            name="comment"
                            value={comment}
                            onChange={handleEventChange}
                          ></textarea>
                        </div>
                        <input
                          type="submit"
                          value="Commenter"
                          style={{
                            backgroundColor: "#4CAF50" /* Green */,
                            border: "none",
                            color: "white",
                            padding: "15px 32px",
                            textAlign: "center",
                            textDecoration: "none",
                            display: "inline-block",
                            fontSize: "16px",
                          }}
                          onClick={submitHandler}
                        />
                      </form>
                      <br />
                      <br />
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
        </div>
      </section>
    </div>
  );
}

export default EvaluationDetails;
