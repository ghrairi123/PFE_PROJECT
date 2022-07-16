import {
    LOADING_DATA,
    Get_Cties_SUCCESS,
    Get_cities_FAIL
  } from "../types";
  
  const initialState = {
    cities: [],
    error: null,
    message: null,
    city:{}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true,
        };
      case Get_Cties_SUCCESS:
        return {
          ...state,
          loading: false,
          cities: action.payload.cities
        };
  
      
      case Get_cities_FAIL:
        return {
          ...state,
          error: action.payload.error
        };
       default:
        return state;
    }
  }
  