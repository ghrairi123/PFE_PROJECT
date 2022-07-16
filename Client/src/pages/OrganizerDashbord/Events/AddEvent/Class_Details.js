import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { showErrorMsg, showSuccessMsg } from "../../../../helpers/message";
import { ADD_Classe } from "../../../../redux/actions/EventsActions";
function Class_Details() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const email = useSelector((state) => state.auth);
  console.log(email._id);
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const [ClassData, setClassData] = useState({
    ClassName: "",
    Price: "",
    NumbrePlace: 0,
  });
  const { ClassName, Price, NumbrePlace } = ClassData;

  const handleClassChange = (evt) => {
    setClassData({
      ...ClassData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleEventSubmit = (evt) => {
    evt.preventDefault();

    let formData = new FormData();
    formData.append("ClassName", ClassName);
    formData.append("Price", Price);
    formData.append("NumbrePlace", NumbrePlace);

    dispatch(ADD_Classe(state.EventId._id, formData));

    setClassData({
      ClassName: "",
      Price: "",
      NumbrePlace: 0,
    });
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
                  <h5 class="title">Détails De Classe de votre événement</h5>
                </div>
              </div>

              <div class="checkout-widget checkout-card mb-0">
                <h5 class="title">informations générales </h5>
                <form class="payment-card-form">
                  <div class="form-group  w-100">
                    <label for="card3">Nom</label>
                    <input
                      required
                      type="text"
                      onChange={handleClassChange}
                      value={ClassName}
                      id="ClassName"
                      name="ClassName"
                    />
                  </div>
                  <div class="form-group">
                    <label for="card4">Prix</label>
                    <input
                      required
                      type="text"
                      onChange={handleClassChange}
                      value={Price}
                      name="Price"
                    />
                  </div>

                  <div class="form-group">
                    <label for="card3">Nombre de places</label>
                    <input
                      required
                      value={NumbrePlace}
                      onChange={handleClassChange}
                      type="Number"
                      id="NumbrePlace"
                      name="NumbrePlace"
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
                          pathname: `/EquipeDetails`,
                          state: { EventId: state.EventId._id },
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
      {/*    <div
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
                              Détails de classe{" "}
                            </h5>
                            <form onSubmit={handleEventSubmit}>
                              {clientSideError && showErrorMsg(clientSideError)}
                              {errorMsg && showErrorMsg(errorMsg)}
                              {successMsg && showSuccessMsg(successMsg)}
                              <div class="form-group">
                                <libel>Nom du classe </libel>
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={handleClassChange}
                                  value={ClassName}
                                  id="ClassName"
                                  name="ClassName"
                                />
                              </div>
                              <div class="form-group">
                                <label for="Prix">Prix</label>
                                <input
                                  type="text"
                                  onChange={handleClassChange}
                                  class="form-control"
                                  value={Price}
                                  name="Price"
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
                              </a>{" "}
                              &nbsp;
                            </form>
                            <br />
                            <Link
                              Link
                              to={{
                                pathname: `/EquipeDetails`,
                                state: { EventId: state.EventId._id },
                              }}
                              for="lang1"
                            >
                              <button
                                class="btn btn-lg btn-success btn-block"
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
                                Continuer{" "}
                              </button>{" "}
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

export default Class_Details;
