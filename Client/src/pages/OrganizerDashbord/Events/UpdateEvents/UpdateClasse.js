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
export class UpdateClasse extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategorieClassName =
      this.onChangeCategorieClassName.bind(this);
    this.onChangeCategoriePrice = this.onChangeCategoriePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      id: this.props.match.params.id,
      ClassName: "",
      Price: "",
    };
  }

  componentDidMount() {
    this.setState({
      ClassName: this.props.match.params.ClassName,
      Price: this.props.match.params.Price,
    });
  }

  onChangeCategorieClassName(e) {
    this.setState({ ClassName: e.target.value });
  }
  onChangeCategoriePrice(e) {
    this.setState({ Price: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("ClassName", this.state.ClassName);
    formData.append("Price", this.state.Price);
    // editCategory(formData, this.props.match.params.id);
    axios
      .put(`/api/Classes/${this.props.match.params.id}`, formData)
      .then((res) => {
        alert("classe d'événement' modifier avec succès!");
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
                              <h5 class="ClassName" id="msg">
                                {" "}
                                Modifier{" "}
                              </h5>
                              <br />
                              <Form onSubmit={this.onSubmit}>
                                <Form.Group controlId="ClassName">
                                  <Form.Label>Nom : </Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="ClassName"
                                    id="ClassName"
                                    value={this.state.ClassName}
                                    onChange={this.onChangeCategorieClassName}
                                  />
                                </Form.Group>

                                <Form.Group controlId="Price">
                                  <Form.Label>prix</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={this.state.Price}
                                    onChange={this.onChangeCategoriePrice}
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
export default connect(mapStateToProps)(UpdateClasse);
