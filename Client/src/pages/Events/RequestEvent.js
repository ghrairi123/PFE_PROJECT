import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCategory } from "../../redux/actions/CategoryActions";
import {
  Get_Request_Events,
  ShowOrganizersparEvents,
} from "../../redux/actions/EventsActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "./Modals/DeleteEvent";
import AcceptModal from "./Modals/AcceptEvent";
import axios from "../../util/axios";
import ReactPaginate from "react-paginate";

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
  transition: " all 0.2s",
};
const RequestEvent = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [bool, setbool] = useState(false);

  const [idOrganizer, setidOrganizer] = useState(null);
  const [title, setiTitle] = useState(null);
  const [deletMessage, setdeletMessage] = useState(null);
  const request_evnts = useSelector((state) => state.event.RequestEvt);
  const [suprimMessage, setsuprimMessage] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayConfirmModal, setDisplayConfirmModal] = useState(false);
  const [AcceptMessage, setAcceptMessage] = useState(null);
  const [AcceptationMessage, setAcceptationMessage] = useState(null);
  const [SearchData, setSearchData] = useState("");
  const [offset, setoffset] = useState(0);
  const [tableData, settableData] = useState([]);
  const [orgtableData, setorgtableData] = useState([]);
  const [perPage, setperPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const catego = useSelector((state) => state.category.categories);
  const cat = catego.categories;
  const [categ, setcateg] = useState([]);
  const [selectchange, setselectchange] = useState(2);
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const showDeleteModal = (id) => {
    setId(id);
    setdeletMessage(null);
    setsuprimMessage(`Voulez-vous vraiment supprimer la demande  ?`);
    setDisplayConfirmationModal(true);
  };
  const showAcceptModal = (id, idorganizer, title) => {
    setId(id);
    setidOrganizer(idorganizer);
    setiTitle(title);
    //alert(idOrganizer);
    setAcceptMessage(null);

    setAcceptationMessage(`Êtes-vous sûr de vouloir Accepter l'invitation ?`);

    setDisplayConfirmModal(true);
  };

  const hideConfirmModal = () => {
    setDisplayConfirmModal(false);
  };
  const submitAccept = () => {
    setAcceptationMessage(`The organizer was deleted successfully.`);

    setDisplayConfirmModal(false);
  };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  const submitDelete = () => {
    setsuprimMessage(`The fruit was deleted successfully.`);

    setDisplayConfirmationModal(false);
  };
  useEffect(() => {
    dispatch(Get_Request_Events());
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
      axios.get(`/api/RequestEvents`).then((res) => {
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
        settableData(Event);
        setNumberOfPages(totalPages);
      }); */
    evts();
  }, []);

  const handleselectChange = (event) => {
    /*    setbool({value: event.target.value}) */ setbool(true);
    //setcatid(event.target.value);
    axios.get(`/api/subparCategory/${event.target.value}`).then((res) => {
      setcateg(res.data.event);
    });
  };
  const handleSubChange = (event) => {
    axios
      .get(`/api/ShowRequestEventsparCategory/${event.target.value}`)
      .then((res) => {
        var data = res.data.event;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);
        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.event);
        settableData(slice);
      });
  };
  return (
    <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
      <br />

      <div class="widget-content widget-content-area">
        <div class="table-responsive">
          <div class="filter-tab">
            <div class="filter-area">
              <div class="filter-main">
                <div class="left w-100 justify-content-between">
                  <div class="item">
                    <span class="show">
                      <select style={option} onChange={handleselectChange}>
                        <option
                          style={{ color: "blue" }}
                          selected="selected"
                          value={2}
                        >
                          toutes catégories
                        </option>
                        {cat && cat.length > 0
                          ? cat.map((cate) => {
                              return (
                                <>
                                  <option
                                    value={cate._id}
                                    style={{ color: "blue" }}
                                  >
                                    {cate.name}
                                  </option>
                                </>
                              );
                            })
                          : null}
                      </select>
                    </span>
                  </div>

                  {bool ? (
                    <div class="item">
                      <span class="show">
                        <select style={option} onChange={handleSubChange}>
                          {categ && categ.length > 0
                            ? categ.map((cate) => {
                                return (
                                  <>
                                    <option
                                      value={cate._id}
                                      style={{ color: "blue" }}
                                    >
                                      {cate.name}
                                    </option>
                                  </>
                                );
                              })
                            : null}
                        </select>
                      </span>
                    </div>
                  ) : null}
                  <div class="item mr-0">
                    <input
                      type="text"
                      placeholder="Recherche par titre:"
                      onChange={(evnt) => {
                        setSearchData(evnt.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {tableData && tableData.length > 0 ? (
            <table
              class="table table-bordered table-hover table-condensed mb-4"
              style={{ backgroundColor: "#081847" }}
            >
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Titre</th>

                  <th>Taux de remplissage</th>
                  <th>Lieu</th>
                  <th>ville</th>
                  <th>Date</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData
                  .filter((request_evnt) => {
                    if (SearchData == "") return request_evnt;
                    else if (
                      request_evnt.Title.toLowerCase().includes(
                        SearchData.toLowerCase()
                      )
                    ) {
                      return request_evnt;
                    } else if (
                      request_evnt.Location.toLowerCase().includes(
                        SearchData.toLowerCase()
                      )
                    ) {
                      return request_evnt;
                    } else if (
                      request_evnt.city
                        .toLowerCase()
                        .includes(SearchData.toLowerCase())
                    ) {
                      return request_evnt;
                    }
                  })
                  .map((request_evnt) => {
                    return (
                      <>
                        <tr>
                          <td>
                            {request_evnt.images &&
                            request_evnt.images.length > 0
                              ? request_evnt.images.map((imgs) => {
                                  return (
                                    <>
                                      <img
                                        src={`Events/${imgs.filename}`}
                                        alt="event"
                                        style={{
                                          height: "70px",
                                          width: "70px",
                                          textAlign: "center",
                                          margin: "auto",
                                          display: "flex",
                                        }}
                                      />
                                    </>
                                  );
                                })
                              : null}{" "}
                          </td>
                          <td style={{ maxWidth: "200px" }}>
                            {request_evnt.Title}
                          </td>

                          <td>{request_evnt.Fillingrate}</td>
                          <td style={{ maxWidth: "200px" }}>
                            {request_evnt.Location}
                          </td>
                          <td>{request_evnt.city}</td>
                          <td>{request_evnt.StartDate}</td>
                          <td class="text-center">
                            <ul class="table-controls">
                              <Link
                                to={{
                                  pathname: `/DetailsEvents`,
                                  state: {
                                    events: request_evnt,
                                    user: request_evnt.createdBy,
                                  },
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
                                </button>{" "}
                              </Link>
                              &nbsp; &nbsp;
                              <li>
                                <a
                                  href="javascript:void(0);"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Edit"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() =>
                                      showAcceptModal(
                                        request_evnt._id,
                                        request_evnt.createdBy,
                                        request_evnt.Title
                                      )
                                    }
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-check-circle text-primary"
                                  >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                  </svg>
                                </a>
                              </li>
                              &nbsp; &nbsp;
                              <li>
                                <a
                                  href="javascript:void(0);"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Delete"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() =>
                                      showDeleteModal(request_evnt._id)
                                    }
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-x-circle text-danger"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                  </svg>
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>{" "}
                      </>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <img
              src="assets/Spinner-1s-200px.gif"
              style={{
                width: "150px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "200px",
              }}
            />
          )}
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
      <Modal
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        id={id}
        message={suprimMessage}
      />
      <AcceptModal
        showModal={displayConfirmModal}
        confirmModal={submitAccept}
        hideModal={hideConfirmModal}
        id={id}
        idorganizer={idOrganizer}
        title={title}
        message={AcceptationMessage}
      />
    </div>
  );
};

export default RequestEvent;
