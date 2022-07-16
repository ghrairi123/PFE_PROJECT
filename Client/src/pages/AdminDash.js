import { Pie, Bar, Line, Doughnut, PolarArea, Radar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TypeStat,
  getNewOrganizer,
  ShowEventsparCategory,
  EVENTS_Pert,
} from "../redux/actions/Static";
import { getAllOrganizer } from "../redux/actions/OrganizerAction";
import { fetchCategory } from "../redux/actions/CategoryActions";
import axios from "../util/axios";
import ReactPaginate from "react-paginate";

function AdminDashboard() {
  const OrganAccount = useSelector((state) => state.Static.OrganAccount);
  const ClientAccount = useSelector((state) => state.Static.ClientAccount);
  const NewOrganizer = useSelector((state) => state.Static.NewOrganizer);
  const event = useSelector((state) => state.Static.event);
  const Data = useSelector((state) => state.Static.Data);
  const organizer = useSelector((state) => state.Organizer.organizers);
  const [chartData, setChartData] = useState({});
  const [bieData, setbieData] = useState({});
  const [EvntMonth, setEvntMonth] = useState({});
  const [invitMounth, setinvitMounth] = useState({});
  const [SearchData, setSearchData] = useState("");
  const [offset, setoffset] = useState(0);
  const [tableData, settableData] = useState([]);
  const [orgtableData, setorgtableData] = useState([]);
  const [perPage, setperPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);

  const categories = useSelector(
    (state) => state.category.categories.categories
  );
  console.log(categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setcurrentPage(selectedPage);
    setoffset(offset);
    loadMoreData();
  };
  const loadMoreData = () => {
    const data = orgtableData;

    const slice = data.slice(offset, offset + perPage);
    setpageCount(Math.ceil(data.length / perPage));
    settableData(slice);
  };
  useEffect(() => {
    const evts = () => {
      axios.get(`/organizer`).then((res) => {
        var data = res.data;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data);
        settableData(slice);
      });
    };
    /* .then((response) => console.log(response))
            .then(({ totalPages, Event }) => {
              setEvent(Event);
              setNumberOfPages(totalPages);
            }); */
    evts();
  }, []);
  useEffect(() => {
    const bie = () => {
      let month = [];
      let number = [];
      axios
        .get(`/api/newUsersEachMonth/`)
        .then((res) => {
          for (const dataObj of res.data) {
            month.push(dataObj.month);
            number.push(dataObj.number);
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

  useEffect(() => {
    const bie = () => {
      let month = [];
      let number = [];
      axios
        .get(`/api/newInvitationsEachMonth/`)
        .then((res) => {
          for (const dataObj of res.data) {
            month.push(dataObj.month);
            number.push(dataObj.number);
          }
          setinvitMounth({
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
  useEffect(() => {
    const bie = () => {
      let month = [];
      let number = [];
      axios
        .get(`/api/newEvntsEachMonth/`)
        .then((res) => {
          for (const dataObj of res.data) {
            month.push(dataObj.month);
            number.push(dataObj.number);
          }
          setEvntMonth({
            labels: month,
            datasets: [
              {
                label: "nombre des événement ",
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

  const labels = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Peut",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const data1 = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40, 90, 100, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const chart = () => {
      let Title = [];
      let event = [];
      axios
        .get(`/api/EVENTS_Pert/`)
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
                label: "level of thiccness",
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
    dispatch(EVENTS_Pert());
  }, []);
  console.log(event);

  console.log(ClientAccount);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("salut")
      dispatch(TypeStat());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getNewOrganizer());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(getAllOrganizer());
  }, []);
  const data = {
    labels: ["Organisateur", "Client"],
    datasets: [
      {
        label: "# of Votes",
        data: [OrganAccount, ClientAccount],
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
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <div class="main-container" id="container">
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <h3>Tableau de bord de l'administrateur</h3>
              </div>
            </div>

            <div class="row layout-top-spacing">
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
                          class="feather feather-users"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>{" "}
                      </div>
                      <div class="w-content">
                        <span class="w-numeric-title">
                          Organisateur vs Client
                        </span>
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="w-chart">
                      <Pie
                        data={data}
                        style={{ width: "900px", height: "500px" }}
                      />
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
                          class="feather feather-user-plus"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="20" y1="8" x2="20" y2="14"></line>
                          <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                      </div>
                      <div class="w-content">
                        <span class="w-numeric-title">
                          Le nombre total de jointures par mois
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
                        <>
                          {" "}
                          <img
                            src="assets/Spinner-1s-200px.gif"
                            style={{
                              width: "150px",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          />
                        </>
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
                        <i
                          class="far fa-money-bill-alt"
                          style={{ fontSize: "20px", color: "blue" }}
                        ></i>
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
                        (console.log(chartData.length),
                        Object.keys(chartData).length > 0 ? (
                          <PolarArea
                            data={chartData}
                            options={{
                              responsive: true,
                              title: { text: "THICCNESS SCALE", display: true },
                            }}
                          />
                        ) : (
                          <>
                            {" "}
                            <img
                              src="assets/Spinner-1s-200px.gif"
                              style={{
                                width: "150px",
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            />
                          </>
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
                      <div class="w-icon">
                        <i
                          class="fas fa-calendar-plus"
                          style={{ fontSize: "20px", color: "blue" }}
                        ></i>{" "}
                      </div>
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
                      {Object.keys(EvntMonth).length > 0 ? (
                        <Bar
                          data={EvntMonth}
                          options={{
                            responsive: true,
                            title: { text: "THICCNESS SCALE", display: true },
                          }}
                        />
                      ) : (
                        <>
                          {" "}
                          <img
                            src="assets/Spinner-1s-200px.gif"
                            style={{
                              width: "150px",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          />
                        </>
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
                          class="feather feather-user-plus"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="20" y1="8" x2="20" y2="14"></line>
                          <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                      </div>
                      <div class="w-content">
                        <span class="w-numeric-title">
                          Le nombre d'invitations d'organisateur par mois
                        </span>
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />{" "}
                    <div class="w-chart">
                      {Object.keys(invitMounth).length > 0 ? (
                        <Line
                          data={invitMounth}
                          options={{
                            responsive: true,
                            title: { text: "THICCNESS SCALE", display: true },
                          }}
                        />
                      ) : (
                        <>
                          {" "}
                          <img
                            src="assets/Spinner-1s-200px.gif"
                            style={{
                              width: "150px",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-table-two">
                  <div class="widget-heading">
                    <h5 class="">
                      <span style={{ color: "red" }}>{NewOrganizer} </span>
                      nouvelles invitations
                    </h5>
                    <div class="item mr-0">
                      <input
                        type="text"
                        placeholder="Recherche:"
                        onChange={(evnt) => {
                          setSearchData(evnt.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div class="widget-content">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>
                              <div class="th-content">Organisateur</div>
                            </th>
                            <th>
                              <div class="th-content">Email: </div>
                            </th>
                            <th>
                              <div class="th-content">Adresse:</div>
                            </th>
                            <th>
                              <div class="th-content th-heading">
                                Téléphone:
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData && tableData.length > 0 ? (
                            tableData
                              .filter((org) => {
                                if (SearchData == "") return org;
                                else if (
                                  org.Name.toLowerCase().includes(
                                    SearchData.toLowerCase()
                                  )
                                ) {
                                  return org;
                                } else if (
                                  org.LastName.toLowerCase().includes(
                                    SearchData.toLowerCase()
                                  )
                                ) {
                                  return org;
                                } else if (
                                  org.email
                                    .toLowerCase()
                                    .includes(SearchData.toLowerCase())
                                ) {
                                  return org;
                                } else if (
                                  org.Adress.toLowerCase().includes(
                                    SearchData.toLowerCase()
                                  )
                                ) {
                                  return org;
                                }
                              })
                              .map((org, index) => {
                                const Phot = org.Photo;
                                return (
                                  <>
                                    <tr>
                                      <td>
                                        <div class="td-content customer-name">
                                          {Phot && Phot.length > 0 ? (
                                            Phot.map((Ph) => {
                                              return (
                                                <>
                                                  <img
                                                    src={
                                                      Ph
                                                        ? `UsersInformation/${Ph.filename}`
                                                        : `uploads/noAvatar.png`
                                                    }
                                                  />
                                                </>
                                              );
                                            })
                                          ) : (
                                            <img src={`uploads/noAvatar.png`} />
                                          )}
                                          {org.Name} {org.LastName}
                                        </div>
                                      </td>
                                      <td>
                                        <div class="td-content product-brand">
                                          {org.email}
                                        </div>
                                      </td>
                                      <td>
                                        <div class="td-content">
                                          {org.Adress}
                                        </div>
                                      </td>
                                      <td>
                                        <div class="td-content pricing">
                                          <span class="">
                                            {org.PhoneNumber}
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                          ) : (
                            <>
                              {" "}
                              <img
                                src="assets/Spinner-1s-200px.gif"
                                style={{
                                  width: "150px",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              />
                            </>
                          )}
                        </tbody>
                      </table>
                      <ReactPaginate
                        previousLabel={"Préc"}
                        nextLabel={"Suiv"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
