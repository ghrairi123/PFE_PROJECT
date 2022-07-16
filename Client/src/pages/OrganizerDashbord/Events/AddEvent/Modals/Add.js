
import { Modal, Button } from "react-bootstrap";
import React, { useEffect,useState } from "react";
import isEmpty from 'validator/lib/isEmpty';
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from '../../../../../helpers/message';
import { clearMessages } from '../../../../../redux/actions/messageActions';
import { addEvents } from "../../../../../redux/actions/EventsActions";
import { useHistory } from "react-router-dom";
import ADDModal from './addClass';
import{Link} from 'react-router-dom'


const   AcceptConfirmation = ({ showModal, hideModal, confirmModal,id,Prentid, message }) => {
    console.log(id,Prentid)
    const [idEvents, setIdEvents] = useState(null);

    const [DisplayConfirmationAddModal, setDisplayConfirmationAddModal] = useState(false);
    const [ADDMessage, setADDMessage] = useState(null);
    const [ADDedMessage, setADDedMessage] = useState(null);
    const dispatch = useDispatch();
    const [clientSideError, setClientSideError] = useState('');

    const history = useHistory();
    const  email  = useSelector(state=> state.auth);
    
  const { successMsg, errorMsg } = useSelector(state => state.messages);
  const Events = useSelector(state => state.event.savedEvents);
  console.log(Events)
  console.log(Events._id)
  const [EventData, setEventData] = useState({
    Promo: false,
    Title: '',
    Description: '',
     Location: '',
    city: '',
    Fillingrate: '', 
    StartDate: '',
    StartTime: '',
    EndTime: '',
    vidéo :null,
    images :null 
  });
  const {
    Title,
    Description,
    Location,
    city,
    Fillingrate, 
    StartDate,
    StartTime
    ,EndTime
    ,Promo,
/*     category,
    createdBy,
    scategory,*/
    vidéo,
    images 
} = EventData;
 
  const handleMessages = evt => {
      dispatch(clearMessages());
      setClientSideError('');
  };
  const showADDModal = (id) => {
    setIdEvents(id);
  setADDMessage(null);
  setADDedMessage(`Partagez les détails de votre événement  :D`);  
  setDisplayConfirmationAddModal(true);
};
const hideConfirmationADDModal = () => {
  setDisplayConfirmationAddModal(false);
};
const submitADD = ( ) => {
  setADDedMessage(` added successfully.`);   
  setDisplayConfirmationAddModal(false);
};
  
  const handleEventChange = evt => {
    setEventData({
        ...EventData,
        [evt.target.name]: evt.target.value,
    });
};

  const handleEventSubmit = evt => {
    evt.preventDefault();

        let formData = new FormData();
        formData.append('Title', Title);
        formData.append('Description', Description);
        formData.append('Location', Location);
        formData.append('city', city);       
        formData.append('Fillingrate', Fillingrate.toString());  
        formData.append('StartDate', StartDate.toString());
        formData.append('StartTime', StartTime.toString());
        formData.append('EndTime', EndTime.toString());
        formData.append('vidéo', vidéo);
        formData.append('images', images);   
        dispatch(addEvents(email._id,id,Prentid,formData));
        console.log(Events._id)
        showADDModal(Events._id)
        setEventData({
            Title: '',
            Description: '',
             Location: '',
            city: '',
            Fillingrate: '',  
            StartDate: '',
            StartTime: '',
            EndTime: '',
            vidéo :null,
            images :null 
        });
    
};
const handlefileName = evt => {
    console.log(evt.target.files[0]);
    for (let i = 0; i < evt.target.files.length; i++) {
    setEventData({
        ...EventData,
        [evt.target.name]: evt.target.files[i]  
    });}
};

    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header >
          <Modal.Title>Partagez les détails de votre événement  </Modal.Title>
        </Modal.Header>
        <Modal.Body>   
                
        <form onSubmit={handleEventSubmit} style={{backgroundImage: `url("assets/images/account/account-bg.jpg")`}}>
                {clientSideError && showErrorMsg(clientSideError)}

                {errorMsg && showErrorMsg(errorMsg)}
							{successMsg && showSuccessMsg(successMsg)}

                         
                <div class="form-group">
                                                            <libel>Titre </libel>
                                                               <input type="text" 
                                                                class="form-control"
                                                                    id="Title"
                                                                    name="Title"
                                                                    label="Titre"
                                                                    placeholder="Titre"
                                                                    onChange={handleEventChange}
                                                                    value={Title}
                                                                    fullWidth
                                                                    required
                                                                    />
                                                            </div>
                                                            <div class="form-group">
                                                                <libel>Date </libel>
                                                                <input type="Date" 
                                                                    id="StartDate"
                                                                    name="StartDate"
                                                                    label="Date"
                                                                    class="form-control"
                                                                    placeholder="Date"
                                                                    onChange={handleEventChange}
                                                                    value={StartDate}
                                                                    fullWidth
                                                                    
                                                                />
                                                            </div>
                                                            <div class="form-group">
                                                                <libel>Heure de début</libel>
                                                                <input type="time" 
                                                                 class="form-control"
                                                                    id="StartTime"
                                                                    name="StartTime"
                                                                    label="Heure de début"
                                                                    placeholder="Heure de début"
                                                                    onChange={handleEventChange}
                                                                    value={StartTime}
                                                                    fullWidth
                                                                    
                                                                />
                                                            </div>

                                                            <div class="form-group">
                                                                <libel>Heure de fin</libel>
                                                                <input 
                                                                 class="form-control"
                                                                    type="time"
                                                                    id="EndTime"
                                                                    name="EndTime"
                                                                    label="Heure de fin"
                                                                    placeholder="Heure de fin"
                                                                    onChange={handleEventChange}
                                                                    value={EndTime}
                                                                    fullWidth
                                                                    />
                                                            </div>
                                                            <div class="form-group">
                                                             <libel>Images</libel>
                                                                <input type="file"
                                                                 class="form-control" 
                                                                id="images"
                                                                    name="images"
                                                                    label="Images"
                                                                    placeholder="Images"
                                                                    accept="image/*"
                                                                    onChange={handlefileName}                                                                   
                                                                    fullWidth
                                                                    multiple/>
                                                            </div>
                                                           
                                                            <div class="form-group">
                                                                <libel>Vidéo</libel>
                                                                <input type="file"
                                                                 class="form-control"
                                                                    name="vidéo"   
                                                                    id="vidéo"
                                                                    label="vidéo"
                                                                    placeholder="vidéo"
                                                                    onChange={handlefileName}
                                                                    accept="video/*"
                                                                    fullWidth
                                                                    
                                                                    />
                                                            </div>
                                                            <div class="form-group">
                                                                <label>Taux de remplissage</label>
                                                                <input type="Number"
                                                                    id="Fillingrate"
                                                                    name="Fillingrate"
                                                                    class="form-control"
                                                                    placeholder="Taux de remplissage"
                                                                    onChange={handleEventChange}
                                                                    value={Fillingrate}
                                                                    fullWidth/> 
                                                                    
 
                                                            </div>    
                                                            <div class="form-group">
                                                                <label>Ville</label>
                                                                <input type="text"
                                                                 class="form-control"
                                                                    id="city"
                                                                    name="city"
                                                                    onChange={handleEventChange}
                                                                    value={city}
                                                                    fullWidth/>
                                                                    
 
                                                            </div>  
                                                            <div class="form-group">
                                                                <libel>Emplacement</libel>
                                                                <input type="text"
                                                                 class="form-control"
                                                                    name="Location"   
                                                                    id="Location"
                                                                    onChange={handleEventChange}
                                                                    value={Location}
                                                                    fullWidth
                                                                    />
                                                            </div> 
                                                            <div class="form-group">
                                                                <libel>Description</libel>
                                                                <textarea 
                                                                 class="form-control"
                                                                     name="Description"   
                                                                     id="Description"
                                                                     onChange={handleEventChange}
                                                                     value={Description}
                                                                     fullWidth
                                                                     />
                                                            </div>
                                                          
               

                <br/>
                <a> <Button variant="default" onClick={hideModal}>
         Annuler
          </Button></a>  &nbsp;
        <a ><input style={{width:"120px"}}  type="submit"   class="btn btn-lg btn-success btn-block" variant="success" value="Ajouter" />
      </a>  
      <ADDModal showModal={DisplayConfirmationAddModal} confirmModal={submitADD} hideModal={hideConfirmationADDModal} idEvents={Events._id} message={ADDedMessage}  />
   
          </form>
              </Modal.Body>
     
      </Modal>
    )
}
 
export default AcceptConfirmation;