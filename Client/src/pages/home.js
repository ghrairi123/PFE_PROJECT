import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import HomeStart from "../components/HomeStart";
const UserHome = () => {
 
  const {
    account: { role },
    authenticated,
  } = useSelector((state) => state.auth);
  

  return (
    <>
    {authenticated && role === "organisateur" ? (
      <Redirect to="/organiser" />
    ) : authenticated && role === "admin" ? (
      <Redirect to="/admin" />
    ) : authenticated && role === "client" ? (
    
      
      <Redirect to="/ClientHome" />
   
       ):(<>
        <HomeStart />
       </>)
      };
   </>
  );
};

export default UserHome;
