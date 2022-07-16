import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Component } from 'react';
import { getAllOrganizer } from '../../redux/actions/OrganizerAction';
function Update() {
  const dispatch = useDispatch();
  const organizer = useSelector(state => state.Organizer.organizers);
  console.log(organizer)
  useEffect(() => {
      dispatch(getAllOrganizer());
    
  
  }, []);
  
    return (
      <div class="row layout-spacing">
      <div class="col-lg-12">
          <div class="statbox widget box box-shadow">
              <div class="widget-header">
                  <div class="row">
                      <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                          <h4>Style 2</h4>
                      </div>
                  </div>
              </div>
              <div class="widget-content widget-content-area">
                  <div class="table-responsive mb-4 style-1">
                      <table id="style-1" class="table style-1 table-hover non-hover">
                          <thead>
                              <tr>
                                  <th class="checkbox-column"> Record no. </th>
                                  <th>Name</th>
                                  <th>Customers</th>
                                  <th>Email</th>
                                  <th>Contact</th>
                                  <th class="">Status</th>
                                  <th class="text-center">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                          {
            organizer  &&  organizer.length > 0 ? 
            organizer.map((org,index)=>{
                                return(
                                <>     <tr>
                                <td>{index}</td>
                                <td>{org.Name}</td>
                                <td>{org.LastName}</td>
                                <td>{org.PhoneNumber}</td>
                                <td>{org.email}</td>
                                <td>{org.Adress}</td>
                               <td>
                               <a href="/OrganizerInfo">
                                   <button style={{backgroundColor: "#009688", 
                                    border: "none",
                                     color: "white" , 
                                     width:"50px",
                                     height:"35px",
                                     textAlign: "center",
                                      textDecoration: "none",
                                     display: "inline-block"
                                }}>Détail</button>
                                </a>
                
                &nbsp;&nbsp;   &nbsp;&nbsp;
                                <a href="/">
                                <button style={{backgroundColor: "transparent", 
                                    border: "none",
                                     color: "white" , 
                                     width:"50px",
                                     height:"35px",
                                     textAlign: "center",
                                      textDecoration: "none",
                                     display: "inline-block"
                                }}>
                                     <svg style={{color: "#8B0000"
                                }}
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>     
                               </button>
                
                               </a>
                              </td>
                                                                            
                            </tr>
                         </>)
                        }):null
                        } </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
  </div>

    )
}

export default Update
