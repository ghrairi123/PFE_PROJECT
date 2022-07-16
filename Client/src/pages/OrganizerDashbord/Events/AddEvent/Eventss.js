import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../../../helpers/message";
import { addEvents } from "../../../../redux/actions/EventsActions";
import { useHistory } from "react-router-dom";
import { isEmpty, isEmail, isLength, isMatch } from "../../../Validation";

function Eventss(props) {
  const [idEvents, setIdEvents] = useState(null);
  const email = useSelector((state) => state.auth);
  const { state } = useLocation();

  const dispatch = useDispatch();
  const history = useHistory();

  const [clientSideError, setClientSideError] = useState("");
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const Events = useSelector((state) => state.event.savedEvents);
  console.log(Events);
  console.log(Events._id);
  const [EventData, setEventData] = useState({
    Promo: false,
    Title: "",
    err: "",
    success: "",
    Description: "",
    Location: "",
    city: "",
    Fillingrate: "",
    StartDate: "",
    StartTime: "",
    EndTime: "",
    vidéo: null,
    images: null,
  });
  const {
    Title,
    Description,
    Location,
    city,
    Fillingrate,
    StartDate,
    StartTime,
    EndTime,
    Promo,
    err,
    success,
    vidéo,
    images,
  } = EventData;

  const handleEventChange = (evt) => {
    setEventData({
      ...EventData,
      [evt.target.name]: evt.target.value,
      err: "",
      success: "",
    });
  };

  const handleEventSubmit = (evt) => {
    evt.preventDefault();

    if (
      isEmpty(Title) ||
      isEmpty(Description) ||
      isEmpty(Location) ||
      isEmpty(city) ||
      isEmpty(Fillingrate) ||
      isEmpty(StartDate) ||
      isEmpty(StartTime) ||
      isEmpty(images) ||
      isEmpty(EndTime) ||
      isEmpty(vidéo)
    )
      return setEventData({
        ...EventData,
        err: "Merci de remplir tous les champs",
        success: "",
      });

    let formData = new FormData();
    formData.append("Title", Title);
    formData.append("Description", Description);
    formData.append("Location", Location);
    formData.append("city", city);
    formData.append("Fillingrate", Fillingrate.toString());
    formData.append("StartDate", StartDate.toString());
    formData.append("StartTime", StartTime.toString());
    formData.append("EndTime", EndTime.toString());
    formData.append("vidéo", vidéo);
    formData.append("images", images);
    dispatch(
      addEvents(state.CreatedBy, state.id, state.Prentid, formData, history)
    );
    console.log(Events._id);
    //  showADDModal(Events._id)
    setEventData({
      Title: "",
      Description: "",
      Location: "",
      city: "",
      Fillingrate: "",
      StartDate: "",
      StartTime: "",
      EndTime: "",
      vidéo: null,
      images: null,
    });
  };
  const handlefileName = (evt) => {
    console.log(evt.target.files[0]);
    setEventData({
      ...EventData,
      [evt.target.name]: evt.target.files[0],
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
                              Partagez les détails de votre événement{" "}
                            </h5>
                            {clientSideError && showErrorMsg(clientSideError)}
                            {err && showErrorMsg(err)}
                            {errorMsg && showErrorMsg(errorMsg)}

                            {successMsg && showSuccessMsg(successMsg)}
                            <form onSubmit={handleEventSubmit}>
                              <div class="form-group">
                                <libel>Titre </libel>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="Title"
                                  name="Title"
                                  label="Titre"
                                  placeholder="Titre"
                                  onChange={handleEventChange}
                                  value={Title}
                                  fullWidth
                                  required
                                />
                              </div>
                              <div class="form-group">
                                <libel>Date </libel>
                                <input
                                  type="Date"
                                  id="StartDate"
                                  name="StartDate"
                                  label="Date"
                                  class="form-control"
                                  placeholder="Date"
                                  onChange={handleEventChange}
                                  value={StartDate}
                                  fullWidth
                                  required
                                />
                              </div>
                              <div class="form-group">
                                <libel>Heure de début</libel>
                                <input
                                  type="time"
                                  class="form-control"
                                  id="StartTime"
                                  name="StartTime"
                                  label="Heure de début"
                                  placeholder="Heure de début"
                                  onChange={handleEventChange}
                                  value={StartTime}
                                  fullWidth
                                  required
                                />
                              </div>
                              <div class="form-group">
                                <libel>Heure de fin</libel>
                                <input
                                  class="form-control"
                                  type="time"
                                  id="EndTime"
                                  name="EndTime"
                                  label="Heure de fin"
                                  placeholder="Heure de fin"
                                  onChange={handleEventChange}
                                  value={EndTime}
                                  fullWidth
                                  required
                                />
                              </div>
                              <div class="form-group">
                                <libel>Images</libel>
                                <input
                                  type="file"
                                  class="form-control"
                                  id="images"
                                  name="images"
                                  label="Images"
                                  placeholder="Images"
                                  accept="image/*"
                                  onChange={handlefileName}
                                  fullWidth
                                  multiple
                                  required
                                />
                              </div>
                              <div class="form-group">
                                <libel>Vidéo</libel>
                                <input
                                  type="file"
                                  class="form-control"
                                  name="vidéo"
                                  id="vidéo"
                                  label="vidéo"
                                  placeholder="vidéo"
                                  onChange={handlefileName}
                                  accept="video/*"
                                  fullWidth
                                  required
                                />
                              </div>
                              <div class="form-group">
                                <label>Taux de remplissage</label>
                                <input
                                  type="Number"
                                  id="Fillingrate"
                                  name="Fillingrate"
                                  class="form-control"
                                  placeholder="Taux de remplissage"
                                  onChange={handleEventChange}
                                  value={Fillingrate}
                                  fullWidth
                                  required
                                />
                              </div>
                              <div class="form-group">
                                <label>Ville</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="city"
                                  name="city"
                                  onChange={handleEventChange}
                                  value={city}
                                  fullWidth
                                  required
                                />
                              </div>
                              <div class="form-group">
                                <libel>Emplacement</libel>
                                <input
                                  type="text"
                                  class="form-control"
                                  name="Location"
                                  id="Location"
                                  onChange={handleEventChange}
                                  value={Location}
                                  fullWidth
                                  required
                                />
                              </div>
                              <div class="form-group">
                                <libel>Description</libel>
                                <textarea
                                  class="form-control"
                                  name="Description"
                                  id="Description"
                                  onChange={handleEventChange}
                                  value={Description}
                                  fullWidth
                                  required
                                />
                              </div>
                              <br />
                              {/*   <a> <Button variant="default" onClick={hideModal}>
         Annuler
          </Button></a>  */}{" "}
                              &nbsp;
                              <input
                                style={{ width: "120px", float: "right" }}
                                type="submit"
                                class="btn btn-lg btn-success btn-block"
                                variant="success"
                                value="Ajouter"
                              />
                            </form>
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

export default Eventss;
