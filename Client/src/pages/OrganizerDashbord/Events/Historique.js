import { parseFile } from "aws-sdk/lib/shared-ini/ini-loader";
import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "../../../util/axios";

function Historique() {
  const { state } = useLocation();
  const [tableData, settableData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const evts = () => {
      axios.get(`/api/ShowEvnt/${state.events._id}`).then((res) => {
        console.log(res.data.data);
        settableData(res.data.data);
      });
    };
    evts();
  }, []);
  return (
    <div>
      {" "}
      <div
        class="table-responsive"
        style={{
          maxWidth: "95%",
          flex: "0 0 120%",
          paddingTop: "3em",
          marginLeft: "40px",
        }}
      >
        <div class="filter-tab">
          <div class="filter-area">
            <div class="filter-main">
              <div class="left w-100 justify-content-between">
                <div class="item">
                  <span class="show">
                    Nombre total de places:&nbsp;{state.events.Fillingrate}
                  </span>
                </div>
                <div class="item">
                  <span class="show">
                    places réservées:&nbsp;
                    {state.events.Reserved_seat}
                  </span>
                </div>
                <div class="item">
                  <span class="show">
                    places non réservées:&nbsp;
                    {state.events.Unreserved_seat}
                  </span>
                </div>
                <div class="item">
                  <span class="show">
                    Montant total:&nbsp;
                    {state.events.PaymentTotal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tableData && tableData.length > 0 ? (
          <table
            class="table table-responsive-md"
            style={{ backgroundColor: "#081847", fontFamily: "sans-serif" }}
          >
            <thead>
              <tr>
                <th>
                  <strong>Image</strong>
                </th>
                <th>
                  <strong>Nom</strong>
                </th>
                <th>
                  <strong>Prénom</strong>
                </th>
                <th>
                  <strong>Prix</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((evnt) => {
                return (
                  <>
                    <tr>
                      <td>
                        {evnt.Image && evnt.Image.length > 0 ? (
                          evnt.Image.map((Ph) => {
                            return (
                              <>
                                <img
                                  src={
                                    Ph
                                      ? `UsersInformation/${Ph.filename}`
                                      : `uploads/noAvatar.png`
                                  }
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    textAlign: "center",
                                    display: "flex",
                                  }}
                                />
                              </>
                            );
                          })
                        ) : (
                          <img
                            src={`uploads/noAvatar.png`}
                            style={{
                              height: "60px",
                              width: "60px",
                              textAlign: "center",
                              display: "flex",
                            }}
                          />
                        )}
                      </td>
                      <td>{evnt.Name}</td>
                      <td>{evnt.LastName}</td>
                      <td>{evnt.Prix}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        ) : (
          <img
            src="assets/Spinner-1s-200px.gif"
            style={{
              width: "120px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "100px",
            }}
          />
        )}
        {/*   <ReactPaginate
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
          /> */}
      </div>
    </div>
  );
}

export default Historique;
