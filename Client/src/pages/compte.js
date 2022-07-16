import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile3 from "../components/img/profile-3.jpg";
import Card from "react-bootstrap/Card";
function Compte(props) {
  const {
    account: { role },
    account: { email },
    account: { password },
    authenticated,
    Name,
    City,
    zipCode,
    LastName,
    PhoneNumber,
    Adress,
    Photo,
  } = useSelector((state) => state.auth);

  return (
    <div class="main-container" id="container">
      <div id="content" class="main-content">
        <div class="layout-px-spacing">
          <div class="row layout-spacing">
            <div
              class="col-xl-4 col-lg-6 col-md-5 col-sm-12 layout-top-spacing"
              style={{
                flex: " 0 0 98%",
                maxWidth: "98%",
                padding: "20px 380px",
                position: "relative",
              }}
            >
              <div class="user-profile layout-spacing">
                <div
                  class="widget-content widget-content-area"
                  style={{ backgroundColor: "#081847", textAlign: "left" }}
                >
                  <div class="d-flex justify-content-between">
                    <h3 class="">Info</h3>
                    <a href="/AccountSetting" class="mt-2 edit-profile">
                      {" "}
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
                        class="feather feather-edit-3"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="text-center user-info">
                    {Photo && Photo.length > 0 ? (
                      Photo.map((Ph) => {
                        return (
                          <>
                            <img
                              src={
                                Ph
                                  ? `UsersInformation/${Ph.filename}`
                                  : `uploads/noAvatar.png`
                              }
                              style={{
                                verticalAlign: "middle",
                                width: "200px",
                                height: "150px",
                                borderRadius: "50%",
                              }}
                            />
                          </>
                        );
                      })
                    ) : (
                      <img
                        src={`uploads/noAvatar.png`}
                        style={{
                          verticalAlign: "middle",
                          width: "200px",
                          height: "150px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                  <div class="text-center user-info">
                    <p class="">
                      {Name} {LastName}
                    </p>
                  </div>
                  <div class="user-info-list">
                    <div class="">
                      <ul
                        class="contacts-block list-unstyled"
                        style={{ maxWidth: "329px" }}
                      >
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
                            </svg>
                            {email}
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
                            class="feather feather-home"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                          {Adress}
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
                            class="feather feather-map-pin"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {City}
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
                            class="feather feather-navigation"
                          >
                            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                          </svg>
                          {zipCode}
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
                          </svg>
                          {PhoneNumber}
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
  );
}

export default Compte;
