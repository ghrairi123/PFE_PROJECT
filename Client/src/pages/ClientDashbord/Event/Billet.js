import React from "react";

function Billet() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div class="col-lg-4" id="divToPrint">
        <div class="booking-summery bg-one">
          <h4 class="title" style={{ color: "white" }}>
            RÉSUMÉ DE LA RÉSERVATION
          </h4>
          <ul>
            <li>
              <h6 class="subtitle">nom du client</h6>
              <span class="info"></span>
            </li>
            <li>
              <h6 class="subtitle">
                <span>Nom de l'événement</span>
              </h6>
              <div class="info">
                <span></span>
              </div>
            </li>
            <li>
              <h6 class="subtitle">
                <span>Date de l'événement</span>
              </h6>
              <div class="info">
                <span></span>
              </div>
            </li>
          </ul>
          <ul class="side-shape">
            <li>
              <h6 class="subtitle">
                <span>Classe</span>
                <span></span>
              </h6>
              <span class="info">
                <span></span>
              </span>
            </li>
            <li>
              <h6 class="subtitle">
                <span>nombre de places réservées</span>
              </h6>
              <span class="info">
                <span></span>
              </span>
            </li>
            <li>
              <h6 class="subtitle mb-0">
                <span>prix total</span>
                <span></span>
              </h6>
            </li>
          </ul>
        </div>
        <div class="proceed-area  text-center">
          {/*     <h6 class="subtitle">
                  <span>Amount Payable</span>
                  <span>$222</span>
                </h6> */}
          <form></form>
        </div>
      </div>
    </div>
  );
}

export default Billet;
