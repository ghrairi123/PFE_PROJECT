import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "../../util/axios";
import ReactPaginate from "react-paginate";

function AllNotifications() {
  const [SearchData, setSearchData] = useState("");
  const { state } = useLocation();
  const [offset, setoffset] = useState(0);
  const [tableData, settableData] = useState([]);
  const [orgtableData, setorgtableData] = useState([]);
  const [perPage, setperPage] = useState(5);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
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
      axios.get(`/api/AllNotifications/${state.userid}`).then((res) => {
        var data = res.data.notify;
        //settableData(res.data.data)
        //  setNumberOfPages(res.data.totalPages);
        var slice = data.slice(offset, offset + perPage);

        setpageCount(Math.ceil(data.length / perPage));
        setorgtableData(res.data.notify);
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
  return (
    /*  <div>
      <table class="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="table-active">...</td>

            <td class="table-primary">...</td>
            <td>
              <a href="#" class="btn btn-success">
                Progress
              </a>
            </td>
            <td>
              <a href="#" class="btn btn-danger">
                On hold
              </a>
            </td>
            <td>
              <a href="#" class="btn btn-warning">
                Open
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div> */
    <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
      <br />

      <div class="widget-content widget-content-area">
        <div class="table-responsive">
          <div class="header-container">
            <header class="header navbar navbar-expand-sm">
              <ul class="navbar-item flex-row mr-auto">
                <li class="nav-item align-self-center search-animated">
                  <form
                    class="form-inline search-full form-inline search"
                    role="search"
                  >
                    <div class="search-bar">
                      <input
                        type="text"
                        placeholder="Recherche:"
                        onChange={(evnt) => {
                          setSearchData(evnt.target.value);
                        }}
                      />{" "}
                    </div>
                  </form>
                </li>
              </ul>
            </header>
          </div>

          <table
            class="table table-bordered table-hover table-condensed mb-4"
            style={{ backgroundColor: "#081847" }}
          >
            <thead>
              <tr>
                <th>index</th>
                <th>Titre</th>

                <th>Taux de remplissage</th>
                <th>Lieu</th>
                <th>ville</th>
                <th>Date</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.length > 0 ? (
                tableData
                  .filter((request_evnt) => {
                    if (SearchData == "") return request_evnt;
                    else if (
                      request_evnt.Event_Name.toLowerCase().includes(
                        SearchData.toLowerCase()
                      )
                    ) {
                      return request_evnt;
                    } else if (
                      request_evnt.Event_Location.toLowerCase().includes(
                        SearchData.toLowerCase()
                      )
                    ) {
                      return request_evnt;
                    } else if (
                      request_evnt.Event_City.toLowerCase().includes(
                        SearchData.toLowerCase()
                      )
                    ) {
                      return request_evnt;
                    }
                  })
                  .map((request_evnt, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index}</td>
                          <td style={{ maxWidth: "200px" }}>
                            {request_evnt.Event_Name}
                          </td>

                          <td>{request_evnt.Event_Fellingrate}</td>
                          <td style={{ maxWidth: "200px" }}>
                            {request_evnt.Event_Location}
                          </td>
                          <td>{request_evnt.Event_City}</td>
                          <td>{request_evnt.Event_StartDate}</td>
                          {request_evnt.type == false ? (
                            <td>
                              <a class="btn btn-danger">refusé</a>
                            </td>
                          ) : (
                            <td>
                              <a class="btn btn-success">accepté</a>
                            </td>
                          )}
                        </tr>{" "}
                      </>
                    );
                  })
              ) : (
                <p>Auccune Notification trouvée</p>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th>Image</th>
                <th>Titre</th>
                <th>Taux de remplissage</th>
                <th>Lieu</th>
                <th>ville</th>
                <th>Date</th>
                <th class="text-center">Action</th>
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
  );
}

export default AllNotifications;
