import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../../../../util/axios";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    User: state.auth,
  };
};
export class UpdateEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategorieTitle = this.onChangeCategorieTitle.bind(this);
    this.onChangeCategorieDescription =
      this.onChangeCategorieDescription.bind(this);
    this.onChangeCategorieEndTime = this.onChangeCategorieEndTime.bind(this);
    this.onChangeCategorieFillingrate =
      this.onChangeCategorieFillingrate.bind(this);
    this.onChangeCategorieLocation = this.onChangeCategorieLocation.bind(this);
    this.onChangeCategorieStartDate =
      this.onChangeCategorieStartDate.bind(this);
    this.onChangeCategorieStartTime =
      this.onChangeCategorieStartTime.bind(this);
    this.onChangeCategoriecity = this.onChangeCategoriecity.bind(this);
    this.onChangeCategorieImage = this.onChangeCategorieImage.bind(this);
    this.onChangeCategorievidéo = this.onChangeCategorievidéo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      id: this.props.match.params.id,
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
    };
  }

  componentDidMount() {
    axios
      .get(`/api/Events/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          Title: res.data.Event.Title,
          Description: res.data.Event.Description,
          Location: res.data.Event.Location,
          city: res.data.Event.city,
          Fillingrate: res.data.Event.Fillingrate,
          StartDate: res.data.Event.StartDate,
          StartTime: res.data.Event.StartTime,
          EndTime: res.data.Event.EndTime,
          vidéo: res.data.Event.vidéo,
          images: res.data.Event.images,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeCategorieTitle(e) {
    this.setState({ Title: e.target.value });
  }
  onChangeCategorieDescription(e) {
    this.setState({ Description: e.target.value });
  }
  onChangeCategorieLocation(e) {
    this.setState({ Location: e.target.value });
  }
  onChangeCategoriecity(e) {
    this.setState({ city: e.target.value });
  }
  onChangeCategorieFillingrate(e) {
    this.setState({ Fillingrate: e.target.value });
  }
  onChangeCategorieStartDate(e) {
    this.setState({ StartDate: e.target.value });
  }
  onChangeCategorieStartTime(e) {
    this.setState({ StartTime: e.target.value });
  }
  onChangeCategorieEndTime(e) {
    this.setState({ EndTime: e.target.value });
  }
  onChangeCategorieImage(e) {
    this.setState({
      images: e.target.files[0],
    });
  }
  onChangeCategorievidéo(e) {
    this.setState({
      vidéo: e.target.files[0],
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.props.match.params.id);
    let formData = new FormData();
    formData.append("Title", this.state.Title);
    formData.append("Description", this.state.Description);
    formData.append("Location", this.state.Location);
    formData.append("city", this.state.city);
    formData.append("Fillingrate", this.state.Fillingrate.toString());
    formData.append("StartDate", this.state.StartDate.toString());
    formData.append("StartTime", this.state.StartTime.toString());
    formData.append("EndTime", this.state.EndTime.toString());
    formData.append("vidéo", this.state.vidéo);
    formData.append("images", this.state.images);
    // editCategory(formData, this.props.match.params.id);
    axios
      .put(`/api/Events/${this.props.match.params.id}`, formData)
      .then((res) => {
        alert("évenement mise à jour avec succès !");
        this.props.history.push({
          pathname: "/Myevents",
          state: { IdEvents: this.props.User._id },
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
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
                  <div
                    id="tabsWithIcons"
                    class="col-lg-12 col-12 layout-spacing"
                  >
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
                                Modifier{" "}
                              </h5>

                              <Form onSubmit={this.onSubmit}>
                                <Form.Group controlId="Titre">
                                  <Form.Label>Titre</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="Title"
                                    id="Title"
                                    value={this.state.Title}
                                    onChange={this.onChangeCategorieTitle}
                                  />
                                </Form.Group>

                                <Form.Group controlId="StartDate">
                                  <Form.Label>Date</Form.Label>
                                  <Form.Control
                                    type="Date"
                                    value={this.state.StartDate}
                                    onChange={this.onChangeCategorieStartDate}
                                  />
                                </Form.Group>
                                <Form.Group controlId="StartTime">
                                  <Form.Label>Heure de début</Form.Label>
                                  <Form.Control
                                    type="time"
                                    value={this.state.StartTime}
                                    onChange={this.onChangeCategorieStartTime}
                                  />
                                </Form.Group>
                                <Form.Group controlId="EndTime">
                                  <Form.Label>Heure de fin</Form.Label>
                                  <Form.Control
                                    type="time"
                                    value={this.state.EndTime}
                                    onChange={this.onChangeCategorieEndTime}
                                  />
                                </Form.Group>
                                <Form.Group controlId="Fillingrate">
                                  <Form.Label>Taux de remplissage</Form.Label>
                                  <Form.Control
                                    type="Number"
                                    value={this.state.Fillingrate}
                                    onChange={this.onChangeCategorieFillingrate}
                                  />
                                </Form.Group>
                                <Form.Group controlId="city">
                                  <Form.Label>Ville</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={this.state.city}
                                    onChange={this.onChangeCategoriecity}
                                  />
                                </Form.Group>
                                <Form.Group controlId="Location">
                                  <Form.Label>Emplacement</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={this.state.Location}
                                    onChange={this.onChangeCategorieLocation}
                                  />
                                </Form.Group>
                                <Form.Group controlId="Description">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={this.state.Description}
                                    onChange={this.onChangeCategorieDescription}
                                  />
                                </Form.Group>

                                <Form.Group controlId="images">
                                  <Form.Label>Image</Form.Label>
                                  <Form.Control
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    onChange={this.onChangeCategorieImage}
                                  />
                                </Form.Group>
                                <Form.Group controlId="vidéo">
                                  <Form.Label>vidéo</Form.Label>
                                  <Form.Control
                                    type="file"
                                    name="vidéo"
                                    accept="video/*"
                                    onChange={this.onChangeCategorievidéo}
                                  />
                                </Form.Group>
                                <br />
                                <div style={{ float: "right" }}>
                                  <a href="/Myevents">
                                    {" "}
                                    <Button variant="default">Annuler</Button>
                                  </a>{" "}
                                  &nbsp; &nbsp;
                                  <a>
                                    <Button
                                      variant="danger"
                                      size="lg"
                                      block="block"
                                      type="submit"
                                    >
                                      Modifier
                                    </Button>
                                  </a>
                                </div>
                              </Form>
                            </div>{" "}
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
}
export default connect(mapStateToProps)(UpdateEvent);
