import React from "react";
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDF = (props) => {
  return (
    <>
      <div class="event-facility padding-bottom padding-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-4" id="divToPrint" className="Post" ref={ref}>
              <div class="booking-summery bg-one">
                <h4 class="title" style={{ color: "white" }}>
                  RÉSUMÉ DE LA RÉSERVATION
                </h4>
                <ul>
                  <li>
                    <h6 class="subtitle">nom du client</h6>
                    <span class="info">
                      {props.Name + " " + props.LastName}
                    </span>
                  </li>
                  <li>
                    <h6 class="subtitle">
                      <span>Nom de l'événement</span>
                    </h6>
                    <div class="info">
                      <span>{props.Title}</span>
                    </div>
                  </li>
                  <li>
                    <h6 class="subtitle">
                      <span>Emplacement</span>
                    </h6>
                    <div class="info">
                      <span>
                        {props.city},{props.Location}
                      </span>
                    </div>
                  </li>
                  <li>
                    <h6 class="subtitle">
                      <span>Date de l'événement</span>
                    </h6>
                    <div class="info">
                      <span> {props.date}</span>
                    </div>
                  </li>
                </ul>
                <ul class="side-shape">
                  <li>
                    <h6 class="subtitle">
                      <span>Classe</span>
                      <span>{props.ClassName}</span>
                    </h6>
                    <span class="info">
                      <span>{props.prix}</span>
                    </span>
                  </li>

                  <li>
                    <h6 class="subtitle mb-0">
                      <span>prix total</span>
                      <span>{props.MontantTotal}</span>
                    </h6>
                  </li>
                </ul>
              </div>
            </div>
            <Pdf targetRef={ref} filename="post.pdf">
              {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
            </Pdf>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDF;
