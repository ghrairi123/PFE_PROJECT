import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategory } from "../../../../redux/actions/CategoryActions";
import ADDModal from "./Modals/Add";

function CategoList(props) {
  const [id, setId] = useState(null);
  const email = useSelector((state) => state.auth);

  const [parentid, setParentId] = useState(null);
  const [DisplayConfirmationAddModal, setDisplayConfirmationAddModal] =
    useState(false);
  const [ADDMessage, setADDMessage] = useState(null);
  const [ADDedMessage, setADDedMessage] = useState(null);
  const dispatch = useDispatch();
  const catego = useSelector((state) => state.category.categories);
  console.log(catego);
  const cat = catego.categories;
  console.log(cat);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const showADDModal = (id, ParentId) => {
    setId(id);
    setParentId(ParentId);
    setADDMessage(null);

    setADDedMessage(`Partagez les détails de votre événement  :D`);

    setDisplayConfirmationAddModal(true);
  };
  const hideConfirmationADDModal = () => {
    setDisplayConfirmationAddModal(false);
  };
  const submitADD = () => {
    setADDedMessage(` added successfully.`);
    setDisplayConfirmationAddModal(false);
  };
  return (
    <div>
      {cat && cat.length > 0
        ? cat.map((cate) => {
            const catt = cate.children;
            console.log(catt);
            return (
              <>
                <section
                  class="movie-section padding-top padding-bottom bg-two"
                  style={{ paddingBottom: "10px" }}
                >
                  <div class="container" style={{ paddingBottom: "10px" }}>
                    <div
                      class="row flex-wrap-reverse justify-content-center"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div
                        class="col-lg-9"
                        style={{ flex: "0 0 120%", maxWidth: "110%" }}
                      >
                        <div class="article-section padding-bottom">
                          <div class="section-header-1">
                            <h2 class="title">{cate.name}</h2>
                          </div>
                          <div class="row mb-30-none justify-content-center">
                            {catt && catt.length > 0
                              ? catt.map((cat) => {
                                  return (
                                    <>
                                      <div class="col-sm-6 col-lg-4">
                                        <div
                                          class="movie-grid"
                                          style={{ width: "400px" }}
                                        >
                                          <div class="movie-thumb c-thumb">
                                            <Link
                                              to={{
                                                pathname: `/ActiveEvents`,
                                                state: { events: cat },
                                              }}
                                            >
                                              <img
                                                /* onClick={() => showADDModal(cat._id,cate._id)} */ src={`uploads/${cat.fileName}`}
                                                style={{
                                                  height: "400px",
                                                  textAlign: "center",
                                                  margin: "auto",
                                                  display: "flex",
                                                }}
                                                alt="movie"
                                              />
                                            </Link>
                                          </div>
                                          <div class="movie-content bg-one">
                                            <h5 class="title m-0">
                                              <a href="#0">{cat.name}</a>
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })
                              : null}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            );
          })
        : null}
      <ADDModal
        showModal={DisplayConfirmationAddModal}
        confirmModal={submitADD}
        hideModal={hideConfirmationADDModal}
        id={id}
        Prentid={parentid}
        message={ADDedMessage}
      />
    </div>
  );
}

export default CategoList;
