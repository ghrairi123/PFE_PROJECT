import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {deleteCategories} from '../../../redux/actions/CategoryActions';
const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, message }) => {
    const dispatch = useDispatch();
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header >
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
         <a> <Button variant="default" onClick={hideModal}>
         Annuler
          </Button></a>
        <a href="/categories"><Button variant="danger"   onClick={() =>{ dispatch(deleteCategories(id))}}>
        Supprimer
          </Button></a>  
        </Modal.Footer>
      </Modal>
    )
}
 
export default DeleteConfirmation;