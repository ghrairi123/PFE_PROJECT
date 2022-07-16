
import { Modal, Button } from "react-bootstrap";
import React, { useEffect,useState } from "react";
import isEmpty from 'validator/lib/isEmpty';
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from '../../../../../helpers/message';
import { ADD_SPONSORS } from "../../../../../redux/actions/EventsActions";
import{Link} from 'react-router-dom'

const background={
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #23334f'
}

const option={
    cursor: 'pointer',
fontWeight: '400',
lineHeight: '40px',
background: 'transparent',
listStyle: 'none',
minHeight: '40px',
outline: 'none',
paddingLeft: '18px',
paddingRight: '29px',
textAlign: 'left',
color: 'blue',
transition:' all 0.2s'
}
const   AcceptConfirmation = ({ showModal, hideModal, confirmModal,idEvents, message }) => {
    const dispatch = useDispatch();
    const [clientSideError, setClientSideError] = useState('');
    const  email  = useSelector(state=> state.auth);
    console.log(email._id,idEvents)
  const { successMsg, errorMsg } = useSelector(state => state.messages);

const [SponsorData, setSponsorData] = useState({
    Name: '',
    Type: '',
    Logo :null
});
const {
    Name,
    Type,
    Logo
} = SponsorData;
const handlefileName = evt => {
  console.log(evt.target.files[0]);
  for (let i = 0; i < evt.target.files.length; i++) {
    setSponsorData({
      ...SponsorData,
      [evt.target.name]: evt.target.files[i]  
  });}
};
  const handleSponsorChange = evt => {
    setSponsorData({
        ...SponsorData,
        [evt.target.name]: evt.target.value,
    });
};

  const handleEventSubmit = evt => {
    evt.preventDefault();
console.log(Name , Type,Logo)
        let formData = new FormData();
        formData.append('Name', Name);
        formData.append('Type', Type);
        formData.append('Logo', Logo);
    
        dispatch(ADD_SPONSORS(idEvents,formData));
    
        setSponsorData({
            Name: '',
            Type: '',
            Logo :null
        });
    
};
    return (
        <Modal show={showModal} onHide={hideModal}  >
        <Modal.Header >
          <Modal.Title>Détails du commanditaire</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundImage: `url("assets/images/account/account-bg.jpg")`}}>   
                
        <form onSubmit={handleEventSubmit} >
                {clientSideError && showErrorMsg(clientSideError)}

                {errorMsg && showErrorMsg(errorMsg)}
							{successMsg && showSuccessMsg(successMsg)}

                         
                                                            <div class="form-group">
                            <libel>Nom </libel>
                                <input 
                                type="text" 
                                   class="form-control"
                                 onChange={handleSponsorChange}
                                 value={Name}
                                 id="Name"
                                 name="Name"/>
                            </div>
                            <div class="form-group">
                            <label for="ville">Type de Sponsor</label>
                           
                            <select  class="form-control" style={background} onChange={handleSponsorChange}
                                                    value={Type}
                                                    name="Type"  id="Type">
                                       
                                        <option style={option} >Platinum</option>
                                        <option style={option} >gold</option>
                                        <option style={option} >silver</option>
                                </select>
                        </div>
                                                <div class="form-group">
                                                <libel>Logo</libel>
                                                    <input type="file" 
                                                        class="form-control"
                                                     onChange={handlefileName}
                                                     accept="image/*"
                                                     id="Logo"
                                                     name="Logo"/>
                                                </div>
                      
                <br/>
        <a ><input style={{width:"120px"}} type="submit"  onClick={() => window.location.reload(false)}  class="btn btn-lg btn-success btn-block" variant="success" value="Ajouter" />
      </a>  
          </form>
          <br/>
          <br/>
      
              </Modal.Body>
     
      </Modal>
    )
}
 
export default AcceptConfirmation;