import React  , {useState,useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useLocation } from "react-router-dom";
import { GetAllEvents } from '../../redux/actions/EventsActions';
import { fetchCategory } from '../../redux/actions/CategoryActions';
import{Link} from 'react-router-dom'
import { connect } from 'react-redux';

function EventList() {
    const  evnt  = useSelector(state=> state.event.events);
    const dispatch = useDispatch();
   
  useEffect(() => {
    dispatch(GetAllEvents());
}, []);
    return (
        <div>
                <section class="banner-section">
        <div class="banner-bg bg_img" data-background="assets/images/banner/banner05.jpg"></div>
        <div class="container">
            <div class="banner-content event-content">
                <h1 class="title bold">obtenir <span class="color-theme">des billets</span>  d'événements </h1>
                <p>Achetez des billets d'événement à l'avance, trouvez les horaires des événements et bien plus encore</p>
            </div>
        </div>
    </section>
    <section class="search-ticket-section padding-top pt-lg-0">
        <div class="container">
            <div class="search-tab bg_img" data-background="assets/images/ticket/ticket-bg01.jpg">
                <div class="row align-items-center mb--20">
                    <div class="col-lg-6 mb-20">
                        <div class="search-ticket-header">
                            <h6 class="category">bienvenue à Boleto</h6>
                            <h3 class="title">que cherchez-vous</h3>
                        </div>
                    </div>
                    <div class="col-lg-6 mb-20">
                        <ul class="tab-menu ticket-tab-menu">
                            <li>
                                <div class="tab-thumb">
                                    <img src="assets/images/ticket/ticket-tab01.png" alt="ticket"/>
                                </div>
                                <span>movie</span>
                            </li>
                            <li class="active">
                                <div class="tab-thumb">
                                    <img src="assets/images/ticket/ticket-tab02.png" alt="ticket"/>
                                </div>
                                <span>events</span>
                            </li>
                            <li>
                                <div class="tab-thumb">
                                    <img src="assets/images/ticket/ticket-tab03.png" alt="ticket"/>
                                </div>
                                <span>sports</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-area">
                    <div class="tab-item">
                        <form class="ticket-search-form">
                            <div class="form-group large">
                                <input type="text" placeholder="Search fo Movies"/>
                                <button type="submit"><i class="fas fa-search"></i></button>
                            </div>
                            <div class="form-group">
                                <div class="thumb">
                                    <img src="assets/images/ticket/city.png" alt="ticket"/>
                                </div>
                                <span class="type">city</span>
                                <select class="select-bar">
                                    <option value="london">London</option>
                                    <option value="dhaka">dhaka</option>
                                    <option value="rosario">rosario</option>
                                    <option value="madrid">madrid</option>
                                    <option value="koltaka">kolkata</option>
                                    <option value="rome">rome</option>
                                    <option value="khoksa">khoksa</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div class="thumb">
                                    <img src="assets/images/ticket/date.png" alt="ticket"/>
                                </div>
                                <span class="type">date</span>
                                <select class="select-bar">
                                    <option value="26-12-19">23/10/2020</option>
                                    <option value="26-12-19">24/10/2020</option>
                                    <option value="26-12-19">25/10/2020</option>
                                    <option value="26-12-19">26/10/2020</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div class="thumb">
                                    <img src="assets/images/ticket/cinema.png" alt="ticket"/>
                                </div>
                                <span class="type">cinema</span>
                                <select class="select-bar">
                                    <option value="Awaken">Awaken</option>
                                    <option value="dhaka">dhaka</option>
                                    <option value="rosario">rosario</option>
                                    <option value="madrid">madrid</option>
                                    <option value="koltaka">kolkata</option>
                                    <option value="rome">rome</option>
                                    <option value="khoksa">khoksa</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="tab-item active">
                        <form class="ticket-search-form">
                            <div class="form-group large">
                                <input type="text" placeholder="Search fo Events"/>
                                <button type="submit"><i class="fas fa-search"></i></button>
                            </div>
                            <div class="form-group">
                                <div class="thumb">
                                    <img src="assets/images/ticket/city.png" alt="ticket"/>
                                </div>
                                <span class="type">city</span>
                                <select class="select-bar">
                                    <option value="london">London</option>
                                    <option value="dhaka">dhaka</option>
                                    <option value="rosario">rosario</option>
                                    <option value="madrid">madrid</option>
                                    <option value="koltaka">kolkata</option>
                                    <option value="rome">rome</option>
                                    <option value="khoksa">khoksa</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div class="thumb">
                                    <img src="assets/images/ticket/date.png" alt="ticket"/>
                                </div>
                                <span class="type">date</span>
                                <select class="select-bar">
                                    <option value="26-12-19">23/10/2020</option>
                                    <option value="26-12-19">24/10/2020</option>
                                    <option value="26-12-19">25/10/2020</option>
                                    <option value="26-12-19">26/10/2020</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div class="thumb">
                                    <img src="assets/images/ticket/cinema.png" alt="ticket"/>
                                </div>
                                <span class="type">event</span>
                                <select class="select-bar">
                                    <option value="angular">angular</option>
                                    <option value="startup">startup</option>
                                    <option value="rosario">rosario</option>
                                    <option value="madrid">madrid</option>
                                    <option value="koltaka">kolkata</option>
                                    <option value="Last-First">Last-First</option>
                                    <option value="wish">wish</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="tab-item">
                        <form class="ticket-search-form">
                            <div class="form-group large">
                                <input type="text" placeholder="Search fo Sports"/>
                                <button type="submit"><i class="fas fa-search"></i></button>
                            </div>
                            <div class="form-group">
                                <div class="thumb">
                                    <img src="assets/images/ticket/city.png" alt="ticket"/>
                                </div>
                                <span class="type">city</span>
                                <select class="select-bar">
                                    <option value="london">London</option>
                                    <option value="dhaka">dhaka</option>
                                    <option value="rosario">rosario</option>
                                    <option value="madrid">madrid</option>
                                    <option value="koltaka">kolkata</option>
                                    <option value="rome">rome</option>
                                    <option value="khoksa">khoksa</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div class="thumb">
                                    <img src="assets/images/ticket/date.png" alt="ticket"/>
                                </div>
                                <span class="type">date</span>
                                <select class="select-bar">
                                    <option value="26-12-19">23/10/2020</option>
                                    <option value="26-12-19">24/10/2020</option>
                                    <option value="26-12-19">25/10/2020</option>
                                    <option value="26-12-19">26/10/2020</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div class="thumb">
                                    <img src="assets/images/ticket/cinema.png" alt="ticket"/>
                                </div>
                                <span class="type">sports</span>
                                <select class="select-bar">
                                    <option value="football">football</option>
                                    <option value="cricket">cricket</option>
                                    <option value="cabadi">cabadi</option>
                                    <option value="madrid">madrid</option>
                                    <option value="gadon">gadon</option>
                                    <option value="rome">rome</option>
                                    <option value="khoksa">khoksa</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>   

    <section class="event-section padding-top padding-bottom">
        <div class="container">
            <div class="row flex-wrap-reverse justify-content-center">
               <div class="col-lg-9 mb-50 mb-lg-0">
                    <div class="filter-tab">
                        <div class="filter-area">
                            <div class="filter-main">
                                <div class="left w-100 justify-content-between">
                                    <div class="item">
                                        <span class="show">Show :</span>
                                        <select class="select-bar">
                                            <option value="12">12</option>
                                            <option value="15">15</option>
                                            <option value="18">18</option>
                                            <option value="21">21</option>
                                            <option value="24">24</option>
                                            <option value="27">27</option>
                                            <option value="30">30</option>
                                        </select>
                                    </div>
                                    <div class="item mr-0">
                                        <span class="show">Sort By :</span>
                                        <select class="select-bar">
                                            <option value="showing">now showing</option>
                                            <option value="exclusive">exclusive</option>
                                            <option value="trending">trending</option>
                                            <option value="most-view">most view</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-10 justify-content-center">
                       
      {                     
            evnt  &&   evnt.length > 0 ? 
            evnt.map((evt)=>{
            const  imagealeatoir=evt.images[Math.floor(Math.random() * evt.images.length)];
        //    console.log(imagealeatoir)
            let date1 = new Date(evt.StartDate);
            let jourMois = date1.getDate();
            let mois = date1.getMonth();
            let annee = date1.getFullYear();
            let heures = date1.getHours();
            const evvt = new Date(Date.UTC(annee, mois, jourMois, heures, 0, 0));
            const Y={month: 'long'}
            const d={day: 'numeric'}
                return(
                <> 

                            <div class="col-sm-6 col-lg-4">
                                <div class="event-grid">
                                    <div class="movie-thumb c-thumb">
                                        <a href="event-details.html">
                                        {
                                               console.log( evt.images[0]),
                                               evt.images  &&   evt.images.length > 0 ?                            
                                               evt.images.map((img)=>{ 
                                                console.log("img")
                                 return(
                                    <>                                       
                                       <img src={`Events/${img.filename}`} alt="event"/>                             
                        </>)
                }): null}
                </a>
                                        <div class="event-date">
                                            <h6 class="date-title">{evvt.toLocaleDateString(undefined, d)}</h6>
                                            <span>{evvt.toLocaleDateString(undefined, Y)}</span>
                                        </div>
                                    </div>
                                    <div class="movie-content bg-one">
                                        <h5 class="title m-0">
                                            <a href="event-details.html">{evt.Title}</a>
                                        </h5>
                                        <div class="movie-rating-percent">
                                        <Link ><i class="fas fa-calendar-check"></i> Reserver</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>        </>)
                    }):null
                     }  
                        </div>
                        <div class="pagination-area text-center">
                            <a href="#0"><i class="fas fa-angle-double-left"></i><span>Prev</span></a>
                            <a href="#0">1</a>
                            <a href="#0">2</a>
                            <a href="#0" class="active">3</a>
                            <a href="#0">4</a>
                            <a href="#0">5</a>
                            <a href="#0"><span>Next</span><i class="fas fa-angle-double-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}

export default EventList
