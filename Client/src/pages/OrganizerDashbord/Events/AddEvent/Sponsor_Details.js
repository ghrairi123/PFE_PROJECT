import React, { useEffect, useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../../../helpers/message";
import { ADD_SPONSORS } from "../../../../redux/actions/EventsActions";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
function Sponsor_Details() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [clientSideError, setClientSideError] = useState("");
  const email = useSelector((state) => state.auth);
  //console.log(email._id,idEvents)
  const { successMsg, errorMsg } = useSelector((state) => state.messages);

  const [SponsorData, setSponsorData] = useState({
    Name: "",
    Type: "",
    Logo: null,
  });
  const { Name, Type, Logo } = SponsorData;
  const handlefileName = (evt) => {
    console.log(evt.target.files[0]);
    for (let i = 0; i < evt.target.files.length; i++) {
      setSponsorData({
        ...SponsorData,
        [evt.target.name]: evt.target.files[i],
      });
    }
  };
  const handleSponsorChange = (evt) => {
    setSponsorData({
      ...SponsorData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleEventSubmit = (evt) => {
    evt.preventDefault();
    console.log(Name, Type, Logo);
    let formData = new FormData();
    formData.append("Name", Name);
    formData.append("Type", Type);
    formData.append("Logo", Logo);

    dispatch(ADD_SPONSORS(state.EventId, formData));

    setSponsorData({
      Name: "",
      Type: "",
      Logo: null,
    });
  };

  return (
    <div>
      <div
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
                              Détails du commanditaire
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
                                  onChange={handleSponsorChange}
                                  value={Name}
                                  id="Name"
                                  name="Name"
                                />
                              </div>
                              <div class="form-group">
                                <label for="ville">Type de Sponsor</label>

                                <select
                                  class="form-control"
                                  style={background}
                                  onChange={handleSponsorChange}
                                  value={Type}
                                  name="Type"
                                  id="Type"
                                >
                                  <option style={option}>Platinum</option>
                                  <option style={option}>gold</option>
                                  <option style={option}>silver</option>
                                </select>
                              </div>
                              <div class="form-group">
                                <libel>Logo</libel>
                                <input
                                  type="file"
                                  class="form-control"
                                  onChange={handlefileName}
                                  accept="image/*"
                                  id="Logo"
                                  name="Logo"
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
                                pathname: `/PENDING_EVENTS`,
                              }}
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
      </div>
    </div>
  );
}

export default Sponsor_Details;
