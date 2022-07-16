import {
    GET_SUBCATEGORY_SUCCESS,
    GET_SUBCATEGORY_REQUEST,
    GET_SUBCATEGORY_FAILURE
   
  } from "../types";

  const initialState = {
    subcategories: [],
    error: null,
    message: null,
    subcategory:{}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_SUBCATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_SUBCATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          subcategories: action.payload.SUBcategories
        }; 
        case GET_SUBCATEGORY_FAILURE:
        return {
          ...state,
          error: action.payload.error
        }; 
       default:
        return state;
    }
  }
  