import React, { Component } from "react";
import axios from "../../util/axios";
class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      Name: "",
      City: "",
      zipCode: "",
      LastName: "",
      PhoneNumber: "",
      Adress: "",
      Photo: null,
      Email_Society: "",
      Telphn_Society: "",
      CV: null,
      adresse_Society: "",
      Descriptions: "",
      Nom_Society: "",
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.onChangeUserAdress = this.onChangeUserAdress.bind(this);
    this.onChangeUserCV = this.onChangeUserCV.bind(this);
    this.onChangeUserCity = this.onChangeUserCity.bind(this);
    this.onChangeUserDescriptions = this.onChangeUserDescriptions.bind(this);
    this.onChangeUserEmail_Society = this.onChangeUserEmail_Society.bind(this);
    this.onChangeUserLastName = this.onChangeUserLastName.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserPhoto = this.onChangeUserPhoto.bind(this);
    this.onChangeUserzipCode = this.onChangeUserzipCode.bind(this);
    this.onChangeUserNom_Society = this.onChangeUserNom_Society.bind(this);
    this.onChangeUseradresse_Society =
      this.onChangeUseradresse_Society.bind(this);
    this.onChangeUserTelphn_Society =
      this.onChangeUserTelphn_Society.bind(this);
    this.onChangeUserPhoneNumber = this.onChangeUserPhoneNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    //console.log(this.props)
    axios.get("/user").then((res) => {
      this.setState({
        user: res.data.result,
        _id: res.data.result._id,
        Name: res.data.result.Name,
        City: res.data.result.City,
        zipCode: res.data.result.zipCode,
        LastName: res.data.result.LastName,
        PhoneNumber: res.data.result.PhoneNumber,
        Adress: res.data.result.Adress,
        Photo: res.data.result.Photo,
        Email_Society: res.data.result.Email_Society,
        Telphn_Society: res.data.result.Telphn_Society,
        CV: res.data.result.CV,
        adresse_Society: res.data.result.adresse_Society,
        Descriptions: res.data.result.Descriptions,
        Nom_Society: res.data.result.Nom_Society,
      });
      console.log(this.state);
    });
  }
  onChangeUserPhoto(e) {
    this.setState({
      Photo: e.target.files[0],
    });
  }
  onChangeUserCV(e) {
    this.setState({
      CV: e.target.files[0],
    });
  }
  onChangeUserNom_Society(e) {
    this.setState({ Nom_Society: e.target.value });
  }
  onChangeUserDescriptions(e) {
    this.setState({ Descriptions: e.target.value });
  }
  onChangeUseradresse_Society(e) {
    this.setState({ adresse_Society: e.target.value });
  }
  onChangeUserTelphn_Society(e) {
    this.setState({ Telphn_Society: e.target.value });
  }
  onChangeUserEmail_Society(e) {
    this.setState({ Email_Society: e.target.value });
  }
  onChangeUserPhoneNumber(e) {
    this.setState({ PhoneNumber: e.target.value });
  }
  onChangeUserCity(e) {
    this.setState({ City: e.target.value });
  }
  handleUserChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ user: state });
  };
  onChangeUserName(e) {
    this.setState({ Name: e.target.value });
  }
  onChangeUserLastName(e) {
    this.setState({ LastName: e.target.value });
  }
  onChangeUserAdress(e) {
    this.setState({ Adress: e.target.value });
  }
  onChangeUserzipCode(e) {
    this.setState({ zipCode: e.target.value });
  }
  onChangeUserName(e) {
    this.setState({ Name: e.target.value });
  }
  handlefileName = (e) => {
    console.log(e.target.files[0]);
    const state = this.state;
    state[e.target.name] = e.target.files[0];
    this.setState({ user: state });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("Name", this.state.Name);
    formData.append("Descriptions", this.state.Descriptions);
    formData.append("zipCode", this.state.zipCode);
    formData.append("City", this.state.City);
    formData.append("LastName", this.state.LastName);
    formData.append("PhoneNumber", this.state.PhoneNumber);
    formData.append("Adress", this.state.Adress);
    formData.append("Email_Society", this.state.Email_Society);
    formData.append("Telphn_Society", this.state.Telphn_Society);
    formData.append("adresse_Society", this.state.adresse_Society);
    formData.append("Nom_Society", this.state.Nom_Society);
    formData.append("CV", this.state.CV);
    formData.append("Photo", this.state.Photo);
    axios.post("/user/" + this.state._id, formData).then((result) => {
      alert("Succès ! (vos informations ont été modifiées avec succès)");
      this.props.history.push("/OrganizerProfile");
    });
  };
  render() {
    return (
      <div id="content" class="main-content">
        <br />
        <br />
        <div class="layout-px-spacing">
          <br />
          <br />
          <div class="account-settings-container layout-top-spacing">
            <div class="account-content">
              <div
                class="scrollspy-example"
                data-spy="scroll"
                data-target="#account-settings-scroll"
                data-offset="-100"
              >
                <div class="row">
                  <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                    <form
                      id="general-info"
                      style={{ backgroundColor: "#081847" }}
                      onSubmit={this.onSubmit}
                      class="section general-info"
                    >
                      <div class="info">
                        <h6 class="">Informations générales</h6>

                        <div class="row">
                          <div class="col-lg-11 mx-auto">
                            <div class="row">
                              <div
                                class="col-xl-2 col-lg-12 col-md-4"
                                style={{
                                  textAlign: "center",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              >
                                <div class="upload mt-4 pr-md-4">
                                  {this.state.Photo &&
                                  this.state.Photo.length > 0 ? (
                                    this.state.Photo.map((Ph) => {
                                      return (
                                        <>
                                          <img
                                            src={
                                              Ph
                                                ? `UsersInformation/${Ph.filename}`
                                                : `uploads/noAvatar.png`
                                            }
                                            class="form-control"
                                            style={{
                                              verticalAlign: "middle",
                                              width: "200px",
                                              height: "150px",
                                              display: "block",
                                              marginLeft: "auto",
                                              marginRight: "auto",
                                              borderRadius: "50%",
                                            }}
                                          />
                                        </>
                                      );
                                    })
                                  ) : (
                                    <img
                                      src={`uploads/noAvatar.png`}
                                      class="form-control"
                                      style={{
                                        verticalAlign: "middle",
                                        width: "200px",
                                        height: "150px",
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        borderRadius: "50%",
                                      }}
                                    />
                                  )}
                                  <input
                                    type="file"
                                    onChange={this.onChangeUserPhoto}
                                    class="form-control"
                                    name="Photo"
                                    accept="image/*"
                                  />{" "}
                                </div>
                              </div>{" "}
                              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                              <div
                                class="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4"
                                style={{
                                  textAlign: "center",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                  width: "6em",
                                }}
                              >
                                {" "}
                                <br />
                                <br />
                                <div class="form">
                                  <div class="row">
                                    <div class="col-sm-6">
                                      <div class="form-group">
                                        <label for="fullName">Nom: </label>
                                        <input
                                          type="text"
                                          onChange={this.onChangeUserName}
                                          class="form-control mb-4"
                                          name="Name"
                                          value={this.state.Name}
                                        />
                                      </div>
                                    </div>
                                    <div class="col-sm-6">
                                      <label for="profession">Prénom:</label>
                                      <input
                                        type="text"
                                        class="form-control mb-4"
                                        onChange={this.onChangeUserLastName}
                                        name="LastName"
                                        value={this.state.LastName}
                                      />
                                    </div>
                                  </div>

                                  <div class="row">
                                    <div class="col-sm-6">
                                      <label class="dob-input">Adresse:</label>
                                      <input
                                        type="text"
                                        class="form-control mb-4"
                                        name="Adress"
                                        onChange={this.onChangeUserAdress}
                                        value={this.state.Adress}
                                      />
                                    </div>
                                    <div class="col-sm-6">
                                      <label for="profession">
                                        Code Postale:
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control mb-4"
                                        name="zipCode"
                                        onChange={this.onChangeUserzipCode}
                                        value={this.state.zipCode}
                                      />
                                    </div>
                                  </div>

                                  <div class="row">
                                    <div class="col-sm-6">
                                      <label for="profession">Téléphone:</label>
                                      <input
                                        type="text"
                                        class="form-control mb-4"
                                        name="PhoneNumber"
                                        onChange={this.onChangeUserPhoneNumber}
                                        value={this.state.PhoneNumber}
                                      />
                                    </div>
                                    <div class="col-sm-6">
                                      <label for="profession">Ville:</label>
                                      <input
                                        type="text"
                                        class="form-control mb-4"
                                        name="city"
                                        onChange={this.onChangeUserCity}
                                        value={this.state.City}
                                      />
                                    </div>
                                  </div>

                                  <div class="row">
                                    <div class="col-sm-6">
                                      <label class="dob-input">
                                        Nom de la Société:
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control mb-4"
                                        name="Adress"
                                        onChange={this.onChangeUserNom_Society}
                                        value={this.state.Nom_Society}
                                      />
                                    </div>
                                    <div class="col-sm-6">
                                      <label for="profession">
                                        Téléphone de la Société:
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control mb-4"
                                        name="zipCode"
                                        onChange={
                                          this.onChangeUserTelphn_Society
                                        }
                                        value={this.state.Telphn_Society}
                                      />
                                    </div>
                                  </div>

                                  <div class="row">
                                    <div class="col-sm-6">
                                      <label for="profession">
                                        {" "}
                                        Adresse de la Société:
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control mb-4"
                                        name="PhoneNumber"
                                        onChange={
                                          this.onChangeUseradresse_Society
                                        }
                                        value={this.state.adresse_Society}
                                      />
                                    </div>
                                    <div class="col-sm-6">
                                      <label for="profession">
                                        Email de la Société::
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control mb-4"
                                        name="Email_Society"
                                        onChange={
                                          this.onChangeUserEmail_Society
                                        }
                                        value={this.state.Email_Society}
                                      />
                                    </div>
                                  </div>
                                  <div class="col-sm-6">
                                    <label for="profession">Cv:</label>
                                    <input
                                      type="file"
                                      accept=".pdf"
                                      class="form-control mb-4"
                                      name="CV"
                                      onChange={this.onChangeUserCV}
                                    />
                                  </div>
                                  <div class="row"></div>
                                  <input
                                    type="submit"
                                    value="Modifier"
                                    style={{
                                      width: "10%",
                                      backgroundColor: "#009688",
                                      float: "right",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
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

export default UpdateAccount;
