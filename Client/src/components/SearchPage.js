import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { getOneOrganizers } from "../redux/actions/authActions";
import axios from "../util/axios";

function SearchPage() {
  const { state } = useLocation();
  const [SearchData, setSearchData] = useState("");
  const [offset, setoffset] = useState(0);
  const [tableData, settableData] = useState([]);
  const [orgtableData, setorgtableData] = useState([]);
  const [perPage, setperPage] = useState(9);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setcurrentPage(selectedPage);
    setoffset(offset);
    loadMoreData();
  };
  const dispatch = useDispatch();
  const loadMoreData = () => {
    const data = orgtableData;

    const slice = data.slice(offset, offset + perPage);
    setpageCount(Math.ceil(data.length / perPage));
    settableData(slice);
  };
  useEffect(() => {
    const evts = () => {
      axios.get(`/Oneorganizer/${state.name}`).then((res) => {
        var data = res.data.data;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.data);
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
  // alert(state.name);
  return (
    <div id="content" class="main-content">
      <div class="layout-px-spacing">
        <div class="row layout-top-spacing" id="cancel-row">
          <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <br />
            <div
              class="widget-content widget-content-area br-6"
              style={{ backgroundColor: "#081847" }}
            >
              <div class="table-responsive mb-4 mt-4">
                <div class="col-lg-9 mb-50 mb-lg-0">
                  <div class="filter-tab" style={{ width: "1200px" }}>
                    <div class="filter-area">
                      <div class="filter-main">
                        <div class="left w-100 justify-content-between">
                          <div class="item">
                            <span class="show">
                              Affichage: {tableData.length} élément(s)
                            </span>
                          </div>
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
                      </div>
                    </div>{" "}
                  </div>
                </div>
                <table
                  class="table table-striped table-bordered"
                  style={{
                    width: "1200px",
                    height: "120px",
                    marginLeft: "1em",
                  }}
                >
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Téléphone</th>
                      <th>email</th>
                      <th>adresse</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData && tableData.length > 0 ? (
                      tableData
                        .filter((org) => {
                          if (SearchData == "") return org;
                          else if (
                            org.username
                              .toLowerCase()
                              .includes(SearchData.toLowerCase())
                          ) {
                            return org;
                          } else if (
                            org.LastName.toLowerCase().includes(
                              SearchData.toLowerCase()
                            )
                          ) {
                            return org;
                          }
                        })
                        .map((org, index) => {
                          return (
                            <>
                              {" "}
                              <tr>
                                <td>{index}</td>
                                <td>{org.username}</td>
                                <td>{org.LastName}</td>
                                <td>{org.PhoneNumber}</td>
                                <td>{org.accountname}</td>
                                <td>{org.Adress}</td>
                                <td>
                                  <Link
                                    to={{
                                      pathname: `/OrganizerInfo`,
                                      state: { users: org },
                                    }}
                                  >
                                    <button
                                      style={{
                                        backgroundColor: "#009688",
                                        border: "none",
                                        color: "white",
                                        width: "50px",
                                        height: "35px",
                                        textAlign: "center",
                                        textDecoration: "none",
                                        display: "inline-block",
                                      }}
                                    >
                                      Détail
                                    </button>
                                  </Link>
                                  &nbsp;&nbsp; &nbsp;&nbsp;
                                  <a>
                                    <button
                                      style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        color: "white",
                                        width: "50px",
                                        height: "35px",
                                        textAlign: "center",
                                        textDecoration: "none",
                                        display: "inline-block",
                                      }}
                                    >
                                      <svg
                                        color="#7d1313"
                                        /*  onClick={() =>
                                            showDeleteModal(org.Account_id)
                                          } */
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-x-octagon"
                                      >
                                        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                                        <line
                                          x1="15"
                                          y1="9"
                                          x2="9"
                                          y2="15"
                                        ></line>
                                        <line
                                          x1="9"
                                          y1="9"
                                          x2="15"
                                          y2="15"
                                        ></line>
                                      </svg>
                                    </button>
                                  </a>
                                </td>
                              </tr>
                            </>
                          );
                        })
                    ) : (
                      <h6 textAlign="center">Auccun utilisateur trouver</h6>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>ID</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th>adresse</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
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
      </div>{" "}
    </div>
  );
}

export default SearchPage;
