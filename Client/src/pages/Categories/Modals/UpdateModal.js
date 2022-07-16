import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { clearMessages } from "../../../redux/actions/messageActions";
import { editCategory } from "../../../redux/actions/CategoryActions";
import isEmpty from "validator/lib/isEmpty";
import { fetchCategory } from "../../../redux/actions/CategoryActions";

const AcceptConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  name,
  fileName,
  message,
}) => {
  const dispatch = useDispatch();
  const [clientSideError, setClientSideError] = useState("");
  const [categoryData, setcategoryData] = useState({
    name,
    fileName,
  });

  const { successMsg, errorMsg } = useSelector((state) => state.messages);

  const handleCategoryChange = (e) => {
    const state = categoryData;
    state[e.target.name] = e.target.value;
    setcategoryData({ state });
  };

  const handlefileName = (evt) => {
    console.log(evt.target.files[0]);
    setcategoryData({
      ...categoryData,
      [evt.target.name]: evt.target.files[0],
    });
  };

  const handleCategorySubmit = (evt) => {
    evt.preventDefault();

    if (fileName === null) {
      setClientSideError("Veuillez sélectionner une image");
    } else if (isEmpty(name)) {
      setClientSideError("Please enter all fields");
    } else {
      let formData = new FormData();

      formData.append("fileName", fileName);
      formData.append("name", name);

      dispatch(editCategory(formData, id));
      setcategoryData({
        fileName: null,
        name: "",
      });
    }
    dispatch(fetchCategory());
  };
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Modification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleCategorySubmit}>
          {clientSideError && showErrorMsg(clientSideError)}
          {errorMsg && showErrorMsg(errorMsg)}
          {successMsg && showSuccessMsg(successMsg)}
          <div class="form-group">
            <label for="name">Nom:</label>
            <input
              type="text"
              class="form-control"
              name="name"
              value={name}
              onChange={handleCategoryChange}
              required
              maxlength="50"
            />
          </div>
          <div class="form-group">
            <img
              src={`uploads/${fileName}`}
              style={{
                width: "70px",
                height: "70px",
                textAlign: "center",
                margin: "auto",
                display: "flex",
              }}
              alt="movie"
            />

            <label for="email">Image:</label>
            <input
              type="file"
              class="form-control"
              id="file"
              name="filename"
              onChange={handlefileName}
              required
              maxlength="50"
            />
          </div>{" "}
          <br />
          <a>
            {" "}
            <Button variant="default" onClick={hideModal}>
              Annuler
            </Button>
          </a>{" "}
          &nbsp;
          <a>
            <input
              style={{ width: "120px" }}
              type="submit"
              onClick={() => window.location.reload(false)}
              class="btn btn-lg btn-success btn-block"
              variant="success"
              value="Modifier"
            />
          </a>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AcceptConfirmation;
