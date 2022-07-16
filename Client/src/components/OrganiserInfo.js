import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../util/axios";

function OrganiserInfo() {
  const { state } = useLocation();
  const [account, setacoount] = useState({});
  useEffect(() => {
    const chart = () => {
      axios
        .get(`/AccountOrganizer/${state.users.account}`)
        .then((res) => {
          console.log(res.data.account);
          setacoount(res.data.account);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    chart();
  }, []);
  return (
    <div>
      <br />
      <br />
      <br />
      <div class="main-container" id="container">
        <div id="content" class="main-content">
          <div
            class="layout-px-spacing"
            style={{ marginLeft: "338px", marginRight: "-572px" }}
          >
            <div class="row layout-spacing">
              <div class="col-xl-4 col-lg-6 col-md-5 col-sm-12 layout-top-spacing">
                <div class="user-profile layout-spacing">
                  <div class="widget-content widget-content-area">
                    <div class="d-flex justify-content-between">
                      <h3 class="">Info</h3>
                    </div>
                    <div class="text-center user-info">
                      <div class="col-md-6 p-0">
                        <div
                          class="gallery-item"
                          style={{
                            height: "300px",
                            width: "300px",
                            marginLeft: "93px",
                            marginRight: "-572px",
                          }}
                        >
                          <div
                            class="gallery-thumb"
                            style={{
                              height: "300px",
                              width: "300px",
                              marginLeft: "2px",
                              marginRight: "-572px",
                            }}
                          >
                            {state.users.Photo &&
                            state.users.Photo.length > 0 ? (
                              state.users.Photo.map((Ph) => {
                                return (
                                  <>
                                    <a
                                      href={`/UsersInformation/${Ph.filename}`}
                                      class="img-pop"
                                    >
                                      <i class="fas fa-search"></i>
                                    </a>
                                    <img
                                      src={`/UsersInformation/${Ph.filename}`}
                                      style={{
                                        height: "300px",
                                        width: "300px",
                                        textAlign: "center",
                                      }}
                                    />
                                  </>
                                );
                              })
                            ) : (
                              <img src={`uploads/noAvatar.png`} />
                            )}
                          </div>
                        </div>
                      </div>
                      <p class="">
                        {" "}
                        {state.users.Name} {state.users.LastName}
                      </p>
                    </div>

                    <div class="user-info-list">
                      <div class="">
                        <ul
                          class="contacts-block list-unstyled"
                          style={{ maxWidth: "329px" }}
                        >
                          <li class="contacts-block__item">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-map-pin"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>{" "}
                            {state.users.Adress}, {state.users.City}
                          </li>
                          <li class="contacts-block__item">
                            <a href="mailto:example@mail.com">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-mail"
                              >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>{" "}
                              {account.email}
                            </a>
                          </li>
                          <li class="contacts-block__item">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-phone"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>{" "}
                            {state.users.PhoneNumber}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*   <br />
      <br />
      <br />
      <br />
      <div class="main-container" id="container">
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="row layout-spacing">
              <div class="col-xl-4 col-lg-6 col-md-5 col-sm-12 layout-top-spacing">
                <div class="user-profile layout-spacing">
                  <div class="widget-content widget-content-area">
                    <div class="d-flex justify-content-between">
                      <h3 class="">Info</h3>
                    </div>
                    <div class="text-center user-info">
                      <div class="col-md-6 p-0">
                        <div
                          class="gallery-item"
                          style={{ height: "270px", width: "300px" }}
                        >
                          <div
                            class="gallery-thumb"
                            style={{ height: "270px", width: "300px" }}
                          >
                            {state.users.Photo &&
                            state.users.Photo.length > 0 ? (
                              state.users.Photo.map((Ph) => {
                                return (
                                  <>
                                    <a
                                      href={`/UsersInformation/${Ph.filename}`}
                                      class="img-pop"
                                    >
                                      <i class="fas fa-search"></i>
                                    </a>
                                    <img
                                      src={`/UsersInformation/${Ph.filename}`}
                                      style={{
                                        height: "300px",
                                        width: "300px",
                                        textAlign: "center",
                                      }}
                                    />
                                  </>
                                );
                              })
                            ) : (
                              <img src={`uploads/noAvatar.png`} />
                            )}
                          </div>
                        </div>
                      </div>
                      <br />
                      <br />
                      <p class="">
                        {" "}
                        {state.users.Name} {state.users.LastName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing"
                style={{
                  backgroundColor: "#081847",
                  maxHeight: "500px",
                  flex: " 0 0 51.666667%",
                  maxWidth: "65.666667%",
                }}
              >
                <div class="bio layout-spacing ">
                  <div class="widget-content widget-content-area">
                    <h3 class="">Bio</h3>

                    <p>{state.users.Descriptions}</p>

                    <div class="bio-skill-box">
                      <div class="row">
                        <div class="col-12 col-xl-6 col-lg-12 mb-xl-5 mb-5 ">
                          <div class="d-flex b-skills">
                            <div></div>
                            <div class="">
                              <h3>informations personnelles</h3>
                              <div class="timeline-alter">
                                <div class="item-timeline">
                                  <div class="t-meta-date">
                                    <p class="">
                                      <b> Adresse: </b>&nbsp; &nbsp;{" "}
                                      {state.users.Adress}{" "}
                                    </p>
                                  </div>
                                </div>
                                <div class="item-timeline">
                                  <div class="t-meta-date">
                                    <p class="">
                                      <b>Email: </b>&nbsp; &nbsp;{" "}
                                      {account.email}
                                    </p>
                                  </div>
                                </div>
                                <div class="item-timeline">
                                  <div class="t-meta-date">
                                    <p class="">
                                      <b>Téléphone:</b> &nbsp; &nbsp;
                                      {state.users.PhoneNumber}{" "}
                                    </p>
                                  </div>
                                </div>

                                <div class="item-timeline">
                                  <div class="t-meta-date">
                                    <p class="">
                                      <b>Ville:</b>&nbsp; &nbsp;
                                      {state.users.City}{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-12 col-xl-6 col-lg-12 mb-xl-5 mb-5 "
                          style={{ backgroundColor: "transparent" }}
                        >
                          <div class="d-flex b-skills">
                            <div></div>
                            <div class="">
                              <h3>Société</h3>
                              <div class="timeline-alter">
                                <div class="item-timeline">
                                  <div class="t-meta-date">
                                    <p class="">
                                      <b> Nom: </b>&nbsp; &nbsp;{" "}
                                      {state.users.Nom_Society}{" "}
                                    </p>
                                  </div>
                                </div>
                                <div class="item-timeline">
                                  <div class="t-meta-date">
                                    <p class="">
                                      <b>Email: </b>&nbsp; &nbsp;{" "}
                                      {state.users.Email_Society}
                                    </p>
                                  </div>
                                </div>
                                <div class="item-timeline">
                                  <div class="t-meta-date">
                                    <p class="">
                                      <b>Téléphone:</b> &nbsp; &nbsp;
                                      {state.users.Telphn_Society}{" "}
                                    </p>
                                  </div>
                                </div>

                                <div class="item-timeline">
                                  <div class="t-meta-date">
                                    <p class="">
                                      <b>Adresse:</b>&nbsp; &nbsp;
                                      {state.users.adresse_Society}{" "}
                                    </p>
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
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default OrganiserInfo;
