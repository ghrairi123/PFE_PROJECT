import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../../helpers/message";
import { clearMessages } from "../../../redux/actions/messageActions";
import { addCategory } from "../../../redux/actions/CategoryActions";
import { fetchCategory } from "../../../redux/actions/CategoryActions";
const AcceptConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  message,
}) => {
  console.log(id);
  const dispatch = useDispatch();
  const [clientSideError, setClientSideError] = useState("");
  const [categoryData, setcategoryData] = useState({
    fileName: null,
    name: "",
    Descriptions: "",
  });

  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { fileName, name, Descriptions } = categoryData;
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
    } else if (isEmpty(name) || isEmpty(Descriptions)) {
      setClientSideError("Veuillez remplir tous les champs");
    } else {
      let formData = new FormData();

      formData.append("fileName", fileName);
      formData.append("name", name);
      formData.append("Descriptions", Descriptions);
      formData.append("parentId", id);

      dispatch(addCategory(formData));
      setcategoryData({
        fileName: null,
        name: "",
        Descriptions: "",
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
              accept="image/*"
              type="file"
              class="form-control"
              id="file"
              name="fileName"
              onChange={handlefileName}
              required
              maxlength="50"
            />
          </div>
          <div class="form-group">
            <label for="email">Description:</label>
            <textarea
              class="form-control"
              id="Descriptions"
              name="Descriptions"
              onChange={handleCategoryChange}
              required
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
              onClick={() => window.location.reload(false)}
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
