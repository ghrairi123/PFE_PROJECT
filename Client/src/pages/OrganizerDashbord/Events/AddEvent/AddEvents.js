import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../../../../util/axios";
import { fetchCategory } from "../../../../redux/actions/CategoryActions";
import { addEvents } from "../../../../redux/actions/EventsActions";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
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
  transition: " all 0.2s",
};
const mapStateToProps = (state) => {
  return {
    User: state.auth,
  };
};
const AddEvent = () => {
  const [bool, setbool] = useState(false);
  const dispatch = useDispatch();
  const catego = useSelector((state) => state.category.categories);
  console.log(catego);
  const cat = catego.categories;
  const [categ, setcateg] = useState([]);
  const [catid, setcatid] = useState(null);
  const [subcatid, setsubcatid] = useState(null);

  const history = useHistory();
  const userid = localStorage.getItem("idConnected");
  const [clientSideError, setClientSideError] = useState("");
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const Events = useSelector((state) => state.event.savedEvents);
  const [EventData, setEventData] = useState({
    Promo: false,
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
    /*     category,
      createdBy,
      scategory,*/
    vidéo,
    images,
  } = EventData;
  const handleEventChange = (evt) => {
    setEventData({
      ...EventData,
      [evt.target.name]: evt.target.value,
    });
  };
  const handlefileName = (evt) => {
    console.log(evt.target.files[0]);
    setEventData({
      ...EventData,
      [evt.target.name]: evt.target.files[0],
    });
  };
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const handleChange = (event) => {
    /*    setbool({value: event.target.value}) */ setbool(true);
    setcatid(event.target.value);
    axios.get(`/api/subparCategory/${event.target.value}`).then((res) => {
      setcateg(res.data.event);
    });
  };
  const handleEventSubmit = (evt) => {
    evt.preventDefault();

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
    dispatch(addEvents(userid, subcatid, catid, formData, history));
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
  const handleSubChange = (event) => {
    setsubcatid(event.target.value);
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
                  <h5 class="title">Partagez les détails de votre événement</h5>
                </div>
              </div>
              <div class="checkout-widget checkout-contact">
                <h5 class="title">Categorie </h5>
                <form class="checkout-contact-form">
                  <div class="form-group">
                    <select style={option} onChange={handleChange}>
                      <option value="" style={{ color: "blue" }}>
                        Categorie
                      </option>
                      {cat && cat.length > 0
                        ? cat.map((cate) => {
                            return (
                              <>
                                <option
                                  style={{ color: "blue" }}
                                  value={cate._id}
                                >
                                  {cate.name}
                                </option>
                              </>
                            );
                          })
                        : null}
                    </select>
                  </div>
                  {bool ? (
                    <div class="form-group">
                      <select style={option} onChange={handleSubChange}>
                        {categ && categ.length > 0
                          ? categ.map((cate) => {
                              return (
                                <>
                                  <option
                                    style={{ color: "blue" }}
                                    value={cate._id}
                                  >
                                    {cate.name}
                                  </option>
                                </>
                              );
                            })
                          : null}
                      </select>
                    </div>
                  ) : null}
                </form>
              </div>
              <div class="checkout-widget checkout-card mb-0">
                <h5 class="title">informations générales </h5>
                <form class="payment-card-form">
                  <div class="form-group">
                    <label for="card3">Titre</label>
                    <input
                      required
                      type="text"
                      id="Title"
                      name="Title"
                      onChange={handleEventChange}
                      value={Title}
                    />
                  </div>
                  <div class="form-group">
                    <label for="card4">Date</label>
                    <input
                      required
                      type="Date"
                      id="StartDate"
                      name="StartDate"
                      label="Date"
                      onChange={handleEventChange}
                      value={StartDate}
                    />
                  </div>

                  <div class="form-group">
                    <label for="card3">Heure de début</label>
                    <input
                      required
                      type="time"
                      id="StartTime"
                      name="StartTime"
                      onChange={handleEventChange}
                      value={StartTime}
                    />
                  </div>
                  <div class="form-group">
                    <label for="card4">Heure de fin</label>
                    <input
                      required
                      type="time"
                      id="EndTime"
                      name="EndTime"
                      onChange={handleEventChange}
                      value={EndTime}
                    />
                  </div>
                  <div class="form-group">
                    <label for="card3">Image</label>
                    <input
                      required
                      type="file"
                      id="images"
                      name="images"
                      accept="image/*"
                      onChange={handlefileName}
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
                  <div class="form-group">
                    <label for="card3">Ville</label>
                    <input
                      required
                      type="text"
                      id="city"
                      name="city"
                      onChange={handleEventChange}
                      value={city}
                    />
                  </div>
                  <div class="form-group">
                    <label for="card4">Emplacement</label>
                    <input
                      required
                      type="text"
                      name="Location"
                      id="Location"
                      onChange={handleEventChange}
                      value={Location}
                    />
                  </div>
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
                  <div class="form-group">
                    <label for="card4">Description</label>
                    <input
                      required
                      type="text"
                      name="Description"
                      id="Description"
                      onChange={handleEventChange}
                      value={Description}
                    />
                  </div>
                  <div class="form-group" style={{ float: "left" }}>
                    <input
                      onClick={handleEventSubmit}
                      type="submit"
                      class="custom-button"
                      value="Ajouter"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(AddEvent);
