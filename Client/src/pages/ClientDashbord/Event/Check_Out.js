import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Stripe from "./Stripe";
const QRCode = require("qrcode");

const Check_Out = () => {
  const { state } = useLocation();
  const [prix, setprix] = useState("");
  const [ClassName, setClassName] = useState("");
  const [idClasse, SetidClasse] = useState("");
  const [ticketNumber, setticketNumber] = useState(0);
  const [Nombre, setNombre] = useState(0);
  const [MontantTotal, setMontantTotal] = useState(0);
  const [id, setId] = useState(null);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [displayConfirmatDeleteModal, setDisplayConfirmatDeleteModal] =
    useState(false);
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
  localStorage.setItem("organizer", state.events.createdBy);

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
  const {
    account: { role },
    account: { email },
    account: { password },
    authenticated,
    Name,
    LastName,
    PhoneNumber,
    Adress,
    Photo,
  } = useSelector((state) => state.auth);
  var imagealeatoir;
  imagealeatoir =
    state.events.images[Math.floor(Math.random() * state.events.images.length)];
  console.log(imagealeatoir);
  const handleNumberChange = (e) => {
    if (state.events.Unreserved_seat > e.target.value)
      setticketNumber(e.target.value);
    else {
      alert(
        "le nombre de places saisies est supérieur au nombre de places restantes"
      );
      e.target.value = 0;
    }
    setMontantTotal(parseInt(e.target.value) * parseFloat(prix));
  };
  const handleSubmitChange = () => {
    setMontantTotal(parseInt(ticketNumber) * parseFloat(prix));
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
  /* useEffect(() => {
    document.getElementById("failedParagraph").style.display = "none";
    document.getElementById("canvas").style.display = "none";
  }, []);
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("./image/");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };
  const submitInputValue = (event) => {
    event.preventDefault();
    // alert(event);
    let canvas = document.getElementById("canvas");
    let failedParagraph = document.getElementById("failedParagraph");

    QRCode.toCanvas(canvas, Name, (error) => {
      if (error) {
        console.error(error);
        canvas.style.display = "none";
        failedParagraph.style.display = "block";
      } else {
        canvas.style.display = "block";
        failedParagraph.style.display = "none";
      }
    });
  }; */
  localStorage.setItem("ticketNumber", ticketNumber);

  return (
    <div>
      <div class="event-facility padding-bottom padding-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="checkout-widget checkout-contact">
                <h5 class="title">Vos coordonnées </h5>
                <form class="checkout-contact-form">
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="nom et prénom"
                      value={Name + " " + LastName}
                      readonly
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Votre courrier"
                      value={email}
                      readonly
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Votre numéro de téléphone "
                      value={PhoneNumber}
                      readonly
                    />
                  </div>
                </form>
              </div>

              <div class="checkout-widget checkout-contact">
                <h5 class="title">Obtenez vos billets</h5>
                <div class="ticket--area row justify-content-center">
                  {state.events.Classes && state.events.Classes.length > 0
                    ? state.events.Classes.map((ClassEvent) => {
                        return (
                          <>
                            {ClassEvent.NumbrePlace > 0 ? (
                              <div class="col-sm-6 col-md-4">
                                <div class="ticket-item">
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
                                    <a class="t-button">
                                      <i
                                        class="fas fa-plus"
                                        onClick={() =>
                                          setprix(
                                            parseFloat(ClassEvent.Price),
                                            setClassName(ClassEvent.ClassName),
                                            SetidClasse(ClassEvent._id),
                                            setNombre(
                                              ClassEvent.NumbrePlace - 1
                                            )
                                          )
                                        }
                                      ></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ) : null}{" "}
                          </>
                        );
                      })
                    : null}{" "}
                </div>
              </div>
            </div>
            <div class="col-lg-4" id="divToPrint">
              <div class="booking-summery bg-one">
                <h4 class="title" style={{ color: "white" }}>
                  RÉSUMÉ DE LA RÉSERVATION
                </h4>
                <ul>
                  <li>
                    <h6 class="subtitle">nom du client</h6>
                    <span class="info">{Name + " " + LastName}</span>
                  </li>
                  <li>
                    <h6 class="subtitle">
                      <span>Nom de l'événement</span>
                    </h6>
                    <div class="info">
                      <span>{state.events.Title}</span>
                    </div>
                  </li>
                  <li>
                    <h6 class="subtitle">
                      <span>Emplacement</span>
                    </h6>
                    <div class="info">
                      <span>
                        {state.events.city},{state.events.Location}
                      </span>
                    </div>
                  </li>
                  <li>
                    <h6 class="subtitle">
                      <span>Date de l'événement</span>
                    </h6>
                    <div class="info">
                      <span> {evt.toLocaleDateString(undefined, options)}</span>
                    </div>
                  </li>
                </ul>
                <ul class="side-shape">
                  <li>
                    <h6 class="subtitle">
                      <span>Classe</span>
                      <span>{ClassName}</span>
                    </h6>
                  </li>

                  <li>
                    <h6 class="subtitle mb-0">
                      <span>prix total</span>
                      <span>{prix}</span>
                    </h6>
                  </li>
                </ul>
              </div>
              <div class="proceed-area  text-center">
                {/*     <h6 class="subtitle">
                  <span>Amount Payable</span>
                  <span>$222</span>
                </h6> */}
                <form>
                  <Stripe
                    total={prix}
                    cartItem={state.events._id}
                    Name={Name}
                    LastName={LastName}
                    Title={state.events.Title}
                    city={state.events.city}
                    StartTime={state.events.StartTime}
                    Location={state.events.Location}
                    date={evt.toLocaleDateString(undefined, options)}
                    ClassName={ClassName}
                    idClasse={idClasse}
                    Nombre={Nombre}
                  ></Stripe>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check_Out;
