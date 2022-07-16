import { Pie, Bar, Line, Doughnut, PolarArea, Radar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TypeStat,
  getNewOrganizer,
  ShowEventsparCategory,
  EVENTS_Pert,
} from "../redux/actions/Static";
import axios from "../util/axios";

function OrganizerDashboard() {
  const [chartData, setChartData] = useState({});
  const [BarData, setBarData] = useState({});
  const [bieData, setbieData] = useState({});

  const categories = useSelector(
    (state) => state.category.categories.categories
  );
  const email = useSelector((state) => state.auth);
  console.log(email.account._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const chart = () => {
      let Title = [];
      let event = [];
      axios
        .get(`/api/EVENTS_Pert_Organizer/${email._id}`)
        .then((res) => {
          console.log(res);
          for (const dataObj of res.data) {
            Title.push(dataObj.Title);
            event.push(dataObj.deff);
          }
          setChartData({
            labels: Title,
            datasets: [
              {
                label: Title,
                data: event,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(54, 162, 235, 0.5)",
                  "rgba(255, 206, 86, 0.5)",
                  "rgba(75, 192, 192, 0.5)",
                  "rgba(153, 102, 255, 0.5)",
                  "rgba(255, 159, 64, 0.5)",
                ],
                borderWidth: 4,
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    chart();
  }, []);

  useEffect(() => {
    const chart = () => {
      let month = [];
      let number = [];
      axios
        .get(`/api/TicketSalesEachMonth/${email._id}`)
        .then((res) => {
          console.log(res);
          for (const dataObj of res.data) {
            month.push(dataObj.month);
            number.push(dataObj.number);
          }
          setBarData({
            labels: month,
            datasets: [
              {
                label: month,
                data: number,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(54, 162, 235, 0.5)",
                  "rgba(255, 206, 86, 0.5)",
                  "rgba(75, 192, 192, 0.5)",
                  "rgba(153, 102, 255, 0.5)",
                  "rgba(255, 159, 64, 0.5)",
                ],
                borderWidth: 4,
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    chart();
  }, []);

  useEffect(() => {
    const bie = () => {
      let month = [];
      let number = [];
      axios
        .get(`/api/PriceEachMonth/${email._id}`)
        .then((res) => {
          for (const dataObj of res.data) {
            month.push(dataObj.month);
            number.push(dataObj.totalPrice);
          }
          setbieData({
            labels: month,
            datasets: [
              {
                label: "nombre des Utilisateurs ",
                data: number,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    bie();
  }, []);
  return (
    <div class="main-container" id="container">
      <div id="content" class="main-content">
        <div class="layout-px-spacing">
          <div class="page-header">
            <div class="page-title">
              <h3>Tableau de bord de l'organisateur</h3>
            </div>
          </div>

          <div class="row layout-top-spacing">
            <div class="col-xl-4 col-lg-12 col-md-6 col-sm-12 col-12 layout-spacing">
              <div class="widget-one">
                <div class="widget-content">
                  <div class="w-numeric-value">
                    <div class="w-icon">
                      <i class="far fa-money-bill-alt"></i>
                    </div>
                    <div class="w-content">
                      <span class="w-numeric-title">
                        Statistiques des 5 derniers événements
                      </span>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />{" "}
                  <div class="w-chart">
                    {
                      (console.log(chartData),
                      Object.keys(chartData).length > 0 ? (
                        <PolarArea
                          data={chartData}
                          options={{
                            responsive: true,
                            title: { text: "THICCNESS SCALE", display: true },
                          }}
                        />
                      ) : (
                        <div>
                          <img
                            src="assets/Spinner-1s-200px.gif"
                            style={{
                              width: "150px",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-lg-12 col-md-6 col-sm-12 col-12 layout-spacing">
              <div class="widget-one">
                <div class="widget-content">
                  <div class="w-numeric-value">
                    <div class="w-icon"></div>
                    <div class="w-content">
                      <span class="w-numeric-title">
                        Le nombre d'événements par mois
                      </span>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />{" "}
                  <div class="w-chart">
                    {Object.keys(BarData).length > 0 ? (
                      <Bar
                        data={BarData}
                        options={{
                          responsive: true,
                          title: { text: "THICCNESS SCALE", display: true },
                        }}
                      />
                    ) : (
                      <div>
                        <img
                          src="assets/Spinner-1s-200px.gif"
                          style={{
                            width: "150px",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-lg-12 col-md-6 col-sm-12 col-12 layout-spacing">
              <div class="widget-one">
                <div class="widget-content">
                  <div class="w-numeric-value">
                    <div class="w-icon">
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
                        class="feather feather-dollar-sign"
                      >
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div class="w-content">
                      <span class="w-numeric-title">
                        Ventes mensuelles totales
                      </span>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />{" "}
                  <div class="w-chart">
                    {Object.keys(bieData).length > 0 ? (
                      <Doughnut
                        data={bieData}
                        options={{
                          responsive: true,
                          title: { text: "THICCNESS SCALE", display: true },
                        }}
                      />
                    ) : (
                      <div>
                        <img
                          src="assets/Spinner-1s-200px.gif"
                          style={{
                            width: "150px",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        />
                      </div>
                    )}
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

export default OrganizerDashboard;
