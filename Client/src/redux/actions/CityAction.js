import {
    LOADING_DATA,
    Get_Cties_SUCCESS,
    Get_cities_FAIL
   
  } from "../types";
  import axios from "../../util/axios";
  
  export const fetchcities = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get("/api/city/")
      .then((res) => {
        dispatch({
          type: Get_Cties_SUCCESS,
          payload: {cities:res.data}
    
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Get_cities_FAIL,
        payload:{/*error: err.data.error*/}
        });
      });
  };
  