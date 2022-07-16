import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../../../helpers/message";
import { ADD_Equipe_Member } from "../../../../redux/actions/EventsActions";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getEventsById } from "../../../../redux/actions/EventsActions";
function EquipeDetails() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  //console.log(email._id,idEvent)
  const [EquipeData, setEquipeData] = useState({
    FirstName: "",
    Lastname: "",
    JobName: "",
    Description: "",
    Photo: null,
  });
  const { FirstName, Lastname, JobName, Description, Photo } = EquipeData;
  const handlefileName = (evt) => {
    console.log(evt.target.files[0]);
    for (let i = 0; i < evt.target.files.length; i++) {
      setEquipeData({
        ...EquipeData,
        [evt.target.name]: evt.target.files[i],
      });
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(getEventsById(state.EventId));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const Events = useSelector((state) => state.event.eventById);

  const handleEquipeChange = (evt) => {
    setEquipeData({
      ...EquipeData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleEventSubmit = (evt) => {
    evt.preventDefault();
    if (
      FirstName == "" ||
      Lastname == "" ||
      JobName == "" ||
      Description == "" ||
      Photo == null
    ) {
      alert("Veuillez remplir tout les champs");
    } else {
      let formData = new FormData();
      formData.append("FirstName", FirstName);
      formData.append("Lastname", Lastname);
      formData.append("JobName", JobName);
      formData.append("Description", Description);
      formData.append("Photo", Photo);

      dispatch(ADD_Equipe_Member(state.EventId, formData));

      setEquipeData({
        FirstName: "",
        Lastname: "",
        JobName: "",
        Description: "",
        Photo: null,
      });
    }
  };
  return (
    <div>
      <div
        class="event-facility padding-bottom padding-top"
        style={{ paddingTop: "22px", fontFamily: "sans-serif" }}
      >
        <div class="container">
          <div
            class="row"
            style={{ marginRight: "-163px", marginLeft: "195px" }}
          >
            <div class="col-lg-8">
              <div class="checkout-widget d-flex flex-wrap align-items-center justify-cotent-between">
                <div class="title-area">
                  <h5 class="title"> Détails de l'équipe de l'organisation</h5>
                </div>
              </div>

              <div class="checkout-widget checkout-card mb-0">
                <h5 class="title">informations générales </h5>
                <br />
                <form class="payment-card-form">
                  <div class="form-group">
                    <label for="card3">Nom</label>
                    <input
                      required
                      type="text"
                      onChange={handleEquipeChange}
                      value={FirstName}
                      id="FirstName"
                      name="FirstName"
                    />
                  </div>
                  <div class="form-group">
                    <libel>Prénom </libel>
                    <input
                      type="text"
                      onChange={handleEquipeChange}
                      value={Lastname}
                      id="Lastname"
                      name="Lastname"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <libel>Nom d'emploi</libel>
                    <input
                      type="text"
                      onChange={handleEquipeChange}
                      value={JobName}
                      name="JobName"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <libel>Description</libel>
                    <input
                      type="text"
                      onChange={handleEquipeChange}
                      value={Description}
                      name="Description"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <libel>Photo</libel>
                    <input
                      type="file"
                      onChange={handlefileName}
                      id="Photo"
                      accept="image/*"
                      name="Photo"
                      required
                    />
                  </div>
                  {/*    <div class="form-group">
                    <label for="card4">Vidéo</label>
                   <input    required
                      type="file"
                      name="vidéo"
                      id="vidéo"
                      onChange={handlefileName}
                    />
                  </div> */}

                  {/*    <div class="form-group">
                    <label for="card3">Taux de remplissage</label>
                    <input
                      required
                      type="Number"
                      id="Fillingrate"
                      name="Fillingrate"
                      onChange={handleEventChange}
                      value={Fillingrate}
                    />
                  </div> */}

                  <div class="form-group" style={{ float: "left" }}></div>
                  <div class="form-group" style={{ float: "left" }}></div>
                  <div style={{ float: "right" }}>
                    <a href="/ListSubCategories">
                      {" "}
                      <input
                        style={{ width: "120px" }}
                        type="submit"
                        onClick={handleEventSubmit}
                        class="btn btn-lg btn-success btn-block"
                        variant="success"
                        value="Ajouter"
                      />
                    </a>{" "}
                    &nbsp; &nbsp;
                    <a>
                      <Link
                        Link
                        to={{
                          pathname: `/EventsDetails`,
                          state: { events: Events },
                        }}
                        for="lang1"
                      >
                        <Button
                          size="lg"
                          block="block"
                          type="submit"
                          style={{
                            backgroundColor: "blue",
                            border: "none",
                            color: "white",
                            padding: "15px 32px",
                            textAlign: "center",
                            textDecoration: "none",
                            fontSize: "16px",
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          Continuer
                        </Button>
                      </Link>{" "}
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*     <div
        class="movie-facility padding-bottom padding-top"
        style={{ paddingTop: "50px" }}
      >
        <div class="container">
          <div
            class="row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginRight: "-558px",
              marginLeft: "-55px",
            }}
          >
            <div class="col-lg-8">
              <div class="row">
                <div id="tabsWithIcons" class="col-lg-12 col-12 layout-spacing">
                  <div
                    class="statbox widget box box-shadow"
                    style={{
                      backgroundImage: `url("assets/images/account/account-bg.jpg")`,
                      paddingTop: "50px",
                    }}
                  >
                    <div
                      class="widget-content widget-content-area rounded-pills-icon"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <div
                        class="tab-content"
                        id="rounded-pills-icon-tabContent"
                      >
                        <div
                          class="tab-pane fade show active"
                          id="rounded-pills-icon-home"
                          role="tabpanel"
                          aria-labelledby="rounded-pills-icon-home-tab"
                        >
                          <div
                            class="checkout-widget checkout-contact"
                            style={{ backgroundColor: "transparent" }}
                          >
                            <h5 class="title" id="msg">
                              {" "}
                              Détails de l'équipe
                            </h5>
                            <form onSubmit={handleEventSubmit}>
                              {clientSideError && showErrorMsg(clientSideError)}

                              {errorMsg && showErrorMsg(errorMsg)}
                              {successMsg && showSuccessMsg(successMsg)}

                              <div class="form-group">
                                <libel>Nom </libel>
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={handleEquipeChange}
                                  value={FirstName}
                                  id="FirstName"
                                  name="FirstName"
                                />
                              </div>
                              <div class="form-group">
                                <libel>Prénom </libel>
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={handleEquipeChange}
                                  value={Lastname}
                                  id="Lastname"
                                  name="Lastname"
                                />
                              </div>

                              <div class="form-group">
                                <libel>Nom d'emploi</libel>
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={handleEquipeChange}
                                  value={JobName}
                                  name="JobName"
                                />
                              </div>
                              <div class="form-group">
                                <libel>Description</libel>
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={handleEquipeChange}
                                  value={Description}
                                  name="Description"
                                />
                              </div>
                              <div class="form-group">
                                <libel>Photo</libel>
                                <input
                                  type="file"
                                  class="form-control"
                                  onChange={handlefileName}
                                  id="Photo"
                                  accept="image/*"
                                  name="Photo"
                                />
                              </div>

                              <br />

                              <a>
                                <input
                                  style={{ width: "120px" }}
                                  type="submit"
                                  class="btn btn-lg btn-success btn-block"
                                  variant="success"
                                  value="Ajouter"
                                />
                              </a>
                            </form>
                            <br />
                            <br />

                            <Link
                              Link
                              to={{
                                pathname: `/Sponsor_Details`,
                                state: { EventId: state.EventId },
                              }}
                              for="lang1"
                            >
                              <button
                                type="submit"
                                class="btn btn-lg btn-success btn-block"
                                style={{
                                  float: "right",
                                  backgroundColor: "blue",
                                  border: "none",
                                  color: "white",
                                  padding: "15px 32px",
                                  textAlign: "center",
                                  textDecoration: "none",
                                  fontSize: "16px",
                                  position: "relative",
                                  display: "inline-block",
                                }}
                              >
                                Continuer{" "}
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default EquipeDetails;
