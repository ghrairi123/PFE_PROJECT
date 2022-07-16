import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "../OrganizerDashbord/Avis/Message";
import Rating from "../OrganizerDashbord/Avis/Rating";
import { getEventReview } from "../../redux/actions/EventsActions";
import Modal from "./Event/Modals/DeleteReview";
import axios from "../../util/axios";
import { saveAs } from "file-saver";
import QRCode from "qrcode.react";
function Evaluate() {
  const [id, setId] = useState(null);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [qrCodeText, setQRCodeText] = useState("");
  const [inputText, setInputText] = useState([]);
  const [displayConfirmatDeleteModal, setDisplayConfirmatDeleteModal] =
    useState(false);
  const dispatch = useDispatch();
  const [SearchData, setSearchData] = useState("");
  const [src, setsrc] = useState("");
  const { state } = useLocation();
  const { _id, LastName, Name } = useSelector((state) => state.auth);
  //const EventReview = useSelector((state) => state.event.EventReview);
  const [EventReview, setEventReview] = useState([]);
  const tokenHandler = (
    Name,
    image,
    Title,
    StartTime,
    city,
    date,
    LastName,
    ClassName,
    Location
  ) => {
    axios
      .post("/api/QrCode", {
        Name,
        Title,
        LastName,
        date,
        Location,
      })
      .then((res) => {
        if (res.status == 200) {
          setsrc(res.data);
          //  alert(res.data);
        }
      });
    axios
      .post("/api/create-pdf", {
        Name,
        src,
        Title,
        StartTime,
        city,
        LastName,
        date,
        ClassName,
        Location,
      })
      .then(() => axios.get("/api/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        setQRCodeText(
          Name,
          image,
          Title,
          StartTime,
          city,
          LastName,
          date,
          ClassName,
          Location
        );
        saveAs(pdfBlob, `${Name}_Ticket.pdf`);
      });
  };
  const showDeleteModal = (id) => {
    setId(id);
    setdeletMessage(null);
    setsuprimMessage(`Voulez-vous vraiment Supprimer l'avis?`);
    setDisplayConfirmatDeleteModal(true);
  };
  const hideConfirmationDeleteModal = () => {
    setDisplayConfirmatDeleteModal(false);
  };
  const submitDelete = (id) => {
    setsuprimMessage(`The fruit was deleted successfully.`);

    setDisplayConfirmatDeleteModal(false);
  };
  const userid = localStorage.getItem("idConnected");

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(getEventReview(userid));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const evts = () => {
      axios.get(`/api/Event_user/${userid}`).then((res) => {
        setEventReview(res.data.event);
      });
    };
    const interval = setInterval(() => {
      evts();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <br />
      <br />
      <section class="blog-section padding-top padding-bottom">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 mb-50 mb-lg-0">
              <article>
                {EventReview && EventReview.length > 0 ? (
                  EventReview.filter((cate) => {
                    if (SearchData == "") return cate;
                    else if (
                      cate.Title.toLowerCase().includes(
                        SearchData.toLowerCase()
                      )
                    ) {
                      return cate;
                    }
                  }).map((evt) => {
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
                                          /*  showPlayerModal(
                                            `Events/${vid.filename}`
                                          ) */ `Events/${vid.filename}`
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
                                <a href="">{evt.Title}</a>
                              </h4>
                              <div class="meta-post">
                                <a href="#0" class="mr-4">
                                  <i class="far fa-comments"></i>
                                  {evt.numReviews} commentaires
                                </a>
                                <a href="#0">
                                  {" "}
                                  <Rating value={evt.rating} text={``} />
                                </a>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button
                                  style={{
                                    backgroundColor: "#009688",
                                    border: "none",
                                    color: "white",
                                    width: "150px",
                                    height: "35px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    display: "inline-block",
                                  }}
                                  onClick={() =>
                                    tokenHandler(
                                      Name,
                                      evt.images,
                                      evt.Title,
                                      evt.StartTime,
                                      evt.city,
                                      evt.StartDate,
                                      LastName,
                                      evt.ClassName,
                                      evt.Location
                                    )
                                  }
                                >
                                  Ticket
                                </button>
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
                                    <p>
                                      {review.createdAt.substring(0, 10)}{" "}
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <i
                                        onClick={() =>
                                          showDeleteModal(review._id)
                                        }
                                        class="fas fa-trash-alt "
                                        style={{ color: "red" }}
                                      ></i>{" "}
                                    </p>
                                    <p>{review.comment}</p>
                                  </>
                                ))}{" "}
                              </p>
                            </div>
                            <Link
                              to={{
                                pathname: `/EvaluationDetails`,
                                state: {
                                  event: evt,
                                  idUser: _id,
                                  NameUser: LastName,
                                },
                              }}
                            >
                              <a class="buttons">
                                Commenter
                                <i class="fas fa-arrow-right"></i>
                              </a>
                            </Link>
                          </div>
                        </div>{" "}
                      </>
                    );
                  })
                ) : (
                  <p>
                    <img
                      src="assets/Spinner-1s-200px.gif"
                      style={{
                        width: "150px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "150px",
                      }}
                    />
                  </p>
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
              </aside>
            </div>
          </div>
        </div>
      </section>

      <Modal
        showModal={displayConfirmatDeleteModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationDeleteModal}
        id={id}
        message={suprimMessage}
      />
    </div>
  );
}

export default Evaluate;
