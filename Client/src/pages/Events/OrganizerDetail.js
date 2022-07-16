import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';


import { ShowOrganizersAccount} from '../../redux/actions/EventsActions';
 const OrganizerDetail = ({ShowOrganizersAccount,organizeraccount}) =>{
    const { state} = useLocation();
    console.log(state.organizer.account)
    useEffect(() => {
        ShowOrganizersAccount(state.organizer.account)
       }, [ShowOrganizersAccount]);
       if(organizeraccount && organizeraccount.length>0)
     {  organizeraccount.map((organizer)=>{

        console.log(organizer)

       })}
    return (
        <div>
              <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
                <section class="speaker-single padding-top pt-lg-0">
        <div class="container">
            <div class="speaker-wrapper bg-six padding-top padding-bottom">
          
                <div class="speaker-thumb">
                    <img src={`uploads/${state.organizer.Photo }`} alt="speaker"/>
             
                </div>
            
                <div class="speaker-content">
                    <div class="author">
                        <h2 class="title">{state.organizer.Name} {state.organizer.LastName} </h2><br/>
                        <div class="info"><i class="fas fa-phone"></i>&nbsp;
                         :  {state.organizer.PhoneNumber}  |&nbsp;<i class="fas fa-map-marker-alt"></i> &nbsp;
                         : {state.organizer.Adress}  </div>
                    </div>
                    <div class="speak-con-wrapper">
                        <div class="speak-con-area">
                            <div class="item">
                                <div class="item-thumb">
                                    <img src="assets/images/event/icon/event-icon03.png" alt="event"/>
                                </div>
                                <div class="item-content">
                                    <span class="up">E-mail:</span>
                                    {
        organizeraccount  &&  organizeraccount.length > 0 ? 
        organizeraccount.map((organizer)=>{
                            return(
                            <> 
             
                                    <a href="MailTo:hello@Boleto .com">{organizer.email} {state.LastName}</a>
                                    </>)
                }):null} </div>
                            </div>
                         </div>
                    </div>
                    <div class="content">
                        <h3 class="subtitle">À propos</h3>
                        <p>{state.organizer.Descriptions}</p>
                        </div>
                        <br/>
                </div>
            </div>
        </div>
    </section>
     
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        organizeraccount:  state.event.organizerAccount
    };};
export default connect(mapStateToProps, { ShowOrganizersAccount})(OrganizerDetail);
