import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { clearMessages } from "../../../redux/actions/messageActions";
import { addCategory } from "../../../redux/actions/CategoryActions";
import { fetchCategory } from "../../../redux/actions/CategoryActions";
import { useHistory } from "react-router-dom";

const AcceptConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  message,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [clientSideError, setClientSideError] = useState("");
  const [categoryData, setcategoryData] = useState({
    fileName: null,
    name: "",
  });

  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { fileName, name } = categoryData;
  const handleMessages = (evt) => {
    dispatch(clearMessages());
    setClientSideError("");
  };
  const handleCategoryChange = (evt) => {
    setcategoryData({
      ...categoryData,
      [evt.target.name]: evt.target.value,
    });
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

      dispatch(addCategory(formData, history));
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
        <Modal.Title>Ajouter Une Catégorie</Modal.Title>
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
            <label for="email">Image:</label>
            <input
              type="file"
              class="form-control"
              accept="image/*"
              id="file"
              name="fileName"
              onChange={handlefileName}
              required
              maxlength="50"
            />
          </div>
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
              class="btn btn-lg btn-success btn-block"
              variant="success"
              value="Ajouter"
            />
          </a>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AcceptConfirmation;
