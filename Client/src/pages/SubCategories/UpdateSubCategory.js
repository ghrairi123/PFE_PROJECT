import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../../util/axios";
export default class UpdateSubCategory extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategorieName = this.onChangeCategorieName.bind(this);
    this.onChangeCategorieImage = this.onChangeCategorieImage.bind(this);
    this.onChangeCategorieDescription =
      this.onChangeCategorieDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: "",
      Descriptions: "",
      fileName: this.props.match.params.filename,
      showImage: this.props.match.params.filename,
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.match.params.name,
      Descriptions: this.props.match.params.Descriptions,
      fileName: this.props.match.params.filename,
      showImage: this.props.match.params.filename,
    });
  }

  onChangeCategorieName(e) {
    this.setState({ name: e.target.value });
  }
  onChangeCategorieDescription(e) {
    this.setState({ Descriptions: e.target.value });
  }

  onChangeCategorieImage(e) {
    this.setState({
      fileName: e.target.files[0],
      showImage: URL.createObjectURL(e.target.files[0]),
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.props.match.params.id);

    let CategoryObject = new FormData();
    CategoryObject.append("fileName", this.state.fileName);
    CategoryObject.append("name", this.state.name);
    CategoryObject.append("Descriptions", this.state.Descriptions);
    console.log(CategoryObject);
    // editCategory(CategoryObject, this.props.match.params.id);
    axios
      .put(`/api/category/${this.props.match.params.id}`, CategoryObject)
      .then((res) => {
        // Redirect to Student List
        alert("Sous-Catégorie mise à jour avec succès !");
        this.props.history.push("/ListSubCategories");
      })
      .catch((err) => {
        alert(err);
        console.log(err.response.data);
      });
  }

  render() {
    return (
      <div>
        <div
          class="movie-facility padding-bottom padding-top"
          style={{
            paddingTop: "50px",
            marginLeft: "26%",
            left: " 50%",
          }}
        >
          <div class="container">
            <div
              class="row"
              style={{
                display: "flex",
                flexWrap: "wrap",
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
                            style={{ paddingTop: "0.5em" }}
                          >
                            <div
                              class="checkout-widget checkout-contact"
                              style={{
                                backgroundColor: "transparent",
                                paddingTop: "0.5em",
                              }}
                            >
                              <h5
                                class="title"
                                id="msg"
                                style={{ paddingTop: "0.5em" }}
                              >
                                {" "}
                                Modifier{" "}
                              </h5>

                              <Form onSubmit={this.onSubmit}>
                                <Form.Group controlId="Name">
                                  <Form.Label>Nom</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.onChangeCategorieName}
                                  />
                                </Form.Group>
                                <Form.Group controlId="Descriptions">
                                  <Form.Label>Description</Form.Label>
                                  <textarea
                                    rows="3"
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "#009688",
                                    }}
                                    class="form-control"
                                    type="text"
                                    value={this.state.Descriptions}
                                    onChange={this.onChangeCategorieDescription}
                                  />
                                </Form.Group>
                                <Form.Group controlId="fileName">
                                  <Form.Label>Image</Form.Label>
                                  <Form.Control
                                    type="file"
                                    name="fileName"
                                    accept="image/*"
                                    onChange={this.onChangeCategorieImage}
                                  />
                                </Form.Group>
                                <br />
                                <br />
                                <div style={{ float: "right" }}>
                                  <a href="/ListSubCategories">
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
