import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/actions/CategoryActions";
import Modal from "./Modals/DeleteCategoryModal";
import UpdateModal from "./Modals/UpdateModal";
import AddModal from "./Modals/AddModal";
import axios from "../../util/axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
function List(props) {
  const [id, setId] = useState(null);
  const [name, setname] = useState(null);
  const [fileName, setfileName] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deletMessage, setdeletMessage] = useState(null);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [DisplayConfirmationUpdateModal, setDisplayConfirmationUpdateModal] =
    useState(false);
  const [DisplayConfirmationAddModal, setDisplayConfirmationAddModal] =
    useState(false);

  const [UpdateMessage, setUpdateMessage] = useState(null);
  const [UpdatedMessage, setUpdated] = useState(null);
  const [SearchData, setSearchData] = useState("");
  const [offset, setoffset] = useState(0);
  const [tableData, settableData] = useState([]);
  const [orgtableData, setorgtableData] = useState([]);
  const [perPage, setperPage] = useState(4);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const [ADDMessage, setADDMessage] = useState(null);
  const [ADDedMessage, setADDedMessage] = useState(null);

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setdeletMessage(null);

    setsuprimMessage(`Voulez-vous vraiment supprimer le Sous catégorie  ?`);

    setDisplayConfirmationModal(true);
  };
  const showADDModal = (id) => {
    setId(id);
    setADDMessage(null);
    setADDedMessage(`Voulez-vous vraiment supprimer la catégorie  ?`);
    setDisplayConfirmationAddModal(true);
  };
  const hideConfirmationADDModal = () => {
    setDisplayConfirmationAddModal(false);
  };
  const submitADD = () => {
    setsuprimMessage(` added successfully.`);
    setDisplayConfirmationAddModal(false);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  // Hide the modal

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
  // Handle the actual deletion of the item
  const submitDelete = (id) => {
    setsuprimMessage(`The fruit was deleted successfully.`);

    setDisplayConfirmationModal(false);
  };

  useEffect(() => {
    const evts = () => {
      axios.get(`/api/category`).then((res) => {
        var data = res.data.categories;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);
        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.categories);
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

  const showUpdateModal = (id, name, fileName) => {
    setId(id);
    setname(name);
    setfileName(fileName);
    setUpdateMessage(null);

    setUpdated(`Voulez-vous vraiment Modifier la catégorie  ?`);

    setDisplayConfirmationUpdateModal(true);
  };
  const hideConfirmationUpdateModal = () => {
    setDisplayConfirmationUpdateModal(false);
  };
  const submitUpdate = (id, name, fileName) => {
    setsuprimMessage(` updated successfully.`);

    setDisplayConfirmationModal(false);
  };
  const dispatch = useDispatch();
  const catego = useSelector((state) => state.category.categories);
  console.log(catego);
  const cat = catego.categories;
  console.log(cat);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  return (
    <div>
      <section
        class="movie-section padding-top padding-bottom bg-two"
        style={{ paddingTop: "10px" }}
      >
        <div class="container">
          <div class="row flex-wrap-reverse justify-content-center">
            <div
              class="col-lg-9"
              style={{
                width: "500px",
                height: "120px",
                marginLeft: "1em",
                margin: "auto",
              }}
            >
              <div class="article-section padding-bottom">
                <div class="row mb-30-none justify-content-center">
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
                                <div
                                  class="filter-tab"
                                  style={{ width: "700px" }}
                                >
                                  <div class="filter-area">
                                    <div class="filter-main">
                                      <div class="left w-100 justify-content-between">
                                        <div class="item">
                                          <ul class="grid-button tab-menu">
                                            <li
                                              class="active"
                                              onClick={() => showADDModal()}
                                            >
                                              <i class="fas fa-plus"></i>
                                            </li>
                                            <li
                                              style={{
                                                width: "200px",
                                                border: "none",
                                              }}
                                            >
                                              <input
                                                type="text"
                                                placeholder="Recherche:"
                                                onChange={(evnt) => {
                                                  setSearchData(
                                                    evnt.target.value
                                                  );
                                                }}
                                              />
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>{" "}
                                </div>
                              </div>
                              <table
                                class="table table-striped table-bordered"
                                style={{
                                  width: "600px",
                                  height: "120px",
                                  marginLeft: "1em",
                                  margin: "auto",
                                }}
                              >
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>Photo</th>
                                    <th>Titre</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tableData && tableData.length > 0
                                    ? tableData
                                        .filter((cat) => {
                                          if (SearchData == "") return cat;
                                          else if (
                                            cat.name
                                              .toLowerCase()
                                              .includes(
                                                SearchData.toLowerCase()
                                              )
                                          ) {
                                            return cat;
                                          }
                                        })
                                        .map((cat, index) => {
                                          // const catt = cate.children
                                          //console.log(catt)
                                          return (
                                            <>
                                              <tr>
                                                <td>{index}</td>
                                                <td
                                                  style={{ maxWidth: "50px" }}
                                                >
                                                  {" "}
                                                  <div class="movie-thumb c-thumb">
                                                    <Link
                                                      to={{
                                                        pathname: `/DetailsSubCategories`,
                                                        state: {
                                                          category: cat,
                                                        },
                                                      }}
                                                    >
                                                      <img
                                                        src={`uploads/${cat.fileName}`}
                                                        style={{
                                                          height: "50px",
                                                          width: "50px",
                                                          textAlign: "center",
                                                          margin: "auto",
                                                          display: "flex",
                                                        }}
                                                        alt="movie"
                                                      />
                                                    </Link>
                                                  </div>
                                                </td>
                                                <td>
                                                  {" "}
                                                  <b>{cat.name}</b>
                                                </td>

                                                <td>
                                                  <div>
                                                    <button
                                                      style={{
                                                        backgroundColor:
                                                          "transparent",
                                                        border: "none",
                                                        color: "white",
                                                        width: "50px",
                                                        height: "35px",
                                                        textAlign: "center",
                                                        textDecoration: "none",
                                                        display: "inline-block",
                                                      }}
                                                    >
                                                      {" "}
                                                      <Link
                                                        className="edit-link"
                                                        to={`/DataList/${cat._id}/${cat.name}/${cat.fileName}`}
                                                      >
                                                        <svg
                                                          style={{
                                                            color: "#31d7a9",
                                                          }}
                                                          data-toggle="modal"
                                                          data-target="#Modal2"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="24"
                                                          height="24"
                                                          viewBox="0 0 24 24"
                                                          fill="none"
                                                          stroke="currentColor"
                                                          stroke-width="2"
                                                          stroke-linecap="round"
                                                          stroke-linejoin="round"
                                                          class="feather feather-edit"
                                                        >
                                                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>{" "}
                                                      </Link>
                                                    </button>

                                                    <button
                                                      style={{
                                                        backgroundColor:
                                                          "transparent",
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
                                                        onClick={() =>
                                                          showDeleteModal(
                                                            cat._id
                                                          )
                                                        }
                                                        style={{
                                                          color: "#751515",
                                                        }}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="feather feather-trash-2  delete-multiple"
                                                      >
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        <line
                                                          x1="10"
                                                          y1="11"
                                                          x2="10"
                                                          y2="17"
                                                        ></line>
                                                        <line
                                                          x1="14"
                                                          y1="11"
                                                          x2="14"
                                                          y2="17"
                                                        ></line>
                                                      </svg>
                                                    </button>
                                                  </div>
                                                </td>
                                              </tr>
                                            </>
                                          );
                                        })
                                    : null}
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
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        id={id}
        message={suprimMessage}
      />
      <AddModal
        showModal={DisplayConfirmationAddModal}
        confirmModal={submitADD}
        hideModal={hideConfirmationADDModal}
        id={id}
        message={ADDedMessage}
      />
      <UpdateModal
        showModal={DisplayConfirmationUpdateModal}
        confirmModal={submitUpdate}
        hideModal={hideConfirmationUpdateModal}
        id={id}
        name={name}
        fileName={fileName}
        message={UpdatedMessage}
      />
    </div>
  );
}

export default List;
