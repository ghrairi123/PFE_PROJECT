import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../../../../util/axios";
import { connect } from "react-redux";

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
const mapStateToProps = (state) => {
  return {
    User: state.auth,
  };
};
export class UpdateSponsor extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategorieName = this.onChangeCategorieName.bind(this);
    this.onChangeCategorieLogo = this.onChangeCategorieLogo.bind(this);
    this.onChangeCategorieType = this.onChangeCategorieType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      id: this.props.match.params.id,
      Name: "",
      Type: "",
      Logo: null,
    };
  }

  componentDidMount() {
    this.setState({
      Name: this.props.match.params.Name,
      Type: this.props.match.params.Type,
      Logo: this.props.match.params.Logo,
    });
  }

  onChangeCategorieName(e) {
    this.setState({ Name: e.target.value });
  }
  onChangeCategorieType(e) {
    this.setState({ Type: e.target.value });
  }
  onChangeCategorieLogo(e) {
    this.setState({ Logo: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("Name", this.state.Name);
    formData.append("Type", this.state.Type);
    formData.append("Logo", this.state.Logo);
    // editCategory(formData, this.props.match.params.id);
    axios
      .put(`/api/Sponsor/${this.props.match.params.id}`, formData)
      .then((res) => {
        alert("Sponsor modifier avec succès!");
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
                              <h5 class="Name" id="msg">
                                {" "}
                                Modifier{" "}
                              </h5>
                              <br />
                              <Form onSubmit={this.onSubmit}>
                                <Form.Group controlId="Name">
                                  <Form.Label>Nom : </Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="Name"
                                    id="Name"
                                    value={this.state.Name}
                                    onChange={this.onChangeCategorieName}
                                  />
                                </Form.Group>
                                <Form.Group controlId="Name">
                                  <Form.Label>Type de Sponsor : </Form.Label>
                                  <select
                                    class="form-control"
                                    style={background}
                                    onChange={this.onChangeCategorieType}
                                    value={this.state.Type}
                                    name="Type"
                                    id="Type"
                                  >
                                    <option style={option}>Platinum</option>
                                    <option style={option}>gold</option>
                                    <option style={option}>silver</option>
                                  </select>
                                </Form.Group>
                                <Form.Group controlId="Logo">
                                  <Form.Label>Logo</Form.Label>
                                  <Form.Control
                                    type="file"
                                    name="Logo"
                                    accept="image/*"
                                    onChange={this.onChangeCategorieLogo}
                                  />
                                </Form.Group>

                                <br />
                                <br />
                                <Button
                                  variant="danger"
                                  size="lg"
                                  block="block"
                                  type="submit"
                                >
                                  Modifier
                                </Button>
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
export default connect(mapStateToProps)(UpdateSponsor);
