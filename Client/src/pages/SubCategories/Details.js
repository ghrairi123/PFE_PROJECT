import React from 'react';
import { useLocation } from "react-router-dom";
function Details(props) {
    
    const { state } = useLocation();
    return (
        <div>
             <section class="event-about padding-top padding-bottom">
        <div class="container">
            <div class="row justify-content-between flex-wrap-reverse">
                <div class="col-lg-7 col-xl-6">
                    <div class="event-about-content">
                        <div class="section-header-3 left-style m-0">
                          
                            <h2 class="title">{state.category.name}</h2>
                            <p>{state.category.Descriptions}
                            </p>
                            <a href="/ListSubCategories" class="custom-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-down-left"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg> &nbsp; revenir</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 col-md-7">
                    <div class="event-about-thumb">
                        <img src={`uploads/${state.category.fileName}`} style={{height: "400px",textAlign:"center",margin:"auto",display:"flex"}} alt="sports" />
                    </div>
                </div>
            </div>
        </div>
    </section>
        </div>
    );
}

export default Details;