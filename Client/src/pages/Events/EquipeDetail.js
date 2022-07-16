import React from 'react'
import { useLocation } from "react-router-dom";
export default function EquipeDetail() {
    const { state} = useLocation();
    console.log(state.Equipe)
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
            {
                                 state.Equipe.Photo  &&  state.Equipe.Photo.length > 0 ?
                                 state.Equipe.Photo.map((vid)=>{ 
                                 return(
                                    <> 
                <div class="speaker-thumb">
                    <img src={`Events/${vid.filename}`} alt="speaker"/>
             
                </div>
            </>)
                }):null}
                <div class="speaker-content">
                    <div class="author">
                        <h2 class="title">{state.Equipe.FirstName}{state.Equipe.Lastname} </h2>
                        <div class="info">{state.Equipe.JobName}</div>
                    </div>
                    <div class="speak-con-wrapper">
                        <div class="speak-con-area">
                            <div class="item">
                                <div class="item-thumb">
                                    <img src="assets/images/event/icon/event-icon03.png" alt="event"/>
                                </div>
                                <div class="item-content">
                                    <span class="up">Cré(e) par:</span>
                                    <a href="MailTo:hello@Boleto .com">{state.Name} {state.LastName}</a>
                                </div>
                            </div>
                         </div>
                    </div>
                    <div class="content">
                        <h3 class="subtitle">À propos de moi</h3>
                        <p>{state.Equipe.Description}</p>
                        </div>
                        <br/>
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}
