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
export class UpdateEquipe extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategorieFirstName =
      this.onChangeCategorieFirstName.bind(this);
    this.onChangeCategorieDescription =
      this.onChangeCategorieDescription.bind(this);
    this.onChangeCategorieLastname = this.onChangeCategorieLastname.bind(this);
    this.onChangeCategorieJobName = this.onChangeCategorieJobName.bind(this);
    this.onChangeCategoriePhoto = this.onChangeCategoriePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      id: this.props.match.params.id,
      FirstName: "",
      Lastname: "",
      JobName: "",
      Description: "",
      Photo: null,
    };
  }

  componentDidMount() {
    this.setState({
      FirstName: this.props.match.params.FirstName,
      Description: this.props.match.params.Description,
      Lastname: this.props.match.params.Lastname,
      JobName: this.props.match.params.JobName,
      Photo: this.props.match.params.Photo,
    });
  }

  onChangeCategorieFirstName(e) {
    this.setState({ FirstName: e.target.value });
  }
  onChangeCategorieDescription(e) {
    this.setState({ Description: e.target.value });
  }
  onChangeCategorieLastname(e) {
    this.setState({ Lastname: e.target.value });
  }
  onChangeCategorieJobName(e) {
    this.setState({ JobName: e.target.value });
  }

  onChangeCategoriePhoto(e) {
    this.setState({
      Photo: e.target.files[0],
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.props.match.params.id);
    let formData = new FormData();
    formData.append("FirstName", this.state.FirstName);
    formData.append("Description", this.state.Description);
    formData.append("Lastname", this.state.Lastname);
    formData.append("JobName", this.state.JobName);
    formData.append("Photo", this.state.Photo);
    // editCategory(formData, this.props.match.params.id);
    axios
      .put(`/api/Equipes/${this.props.match.params.id}`, formData)
      .then((res) => {
        alert("membre de l'équipe modifier avec succès!");
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
                        backgroundImage: `url("assets/Photo/account/account-bg.jpg")`,
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
                              <h5 class="FirstName" id="msg">
                                {" "}
                                Modifier{" "}
                              </h5>
                              <br />
                              <Form onSubmit={this.onSubmit}>
                                <Form.Group controlId="FirstName">
                                  <Form.Label>Nom</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="FirstName"
                                    id="FirstName"
                                    value={this.state.FirstName}
                                    onChange={this.onChangeCategorieFirstName}
                                  />
                                </Form.Group>
                                <Form.Group controlId="Lastname">
                                  <Form.Label>Prénom</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={this.state.Lastname}
                                    onChange={this.onChangeCategorieLastname}
                                  />
                                </Form.Group>
                                <Form.Group controlId="JobName">
                                  <Form.Label>Nom d'emploi</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={this.state.JobName}
                                    onChange={this.onChangeCategorieJobName}
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

                                <Form.Group controlId="Photo">
                                  <Form.Label>Image</Form.Label>
                                  <Form.Control
                                    type="file"
                                    name="Photo"
                                    accept="image/*"
                                    onChange={this.onChangeCategoriePhoto}
                                  />
                                </Form.Group>

                                <br />
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
export default connect(mapStateToProps)(UpdateEquipe);
