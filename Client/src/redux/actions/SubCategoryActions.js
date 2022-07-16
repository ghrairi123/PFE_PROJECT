import {
    ADD_SUBCategory_REQUEST,
    ADD_SUBCategory_SUCCESS,
    ADD_SUBCategory_FAILURE,
    GET_SUBCATEGORY_SUCCESS,
    GET_SUBCATEGORY_REQUEST,
    GET_SUBCATEGORY_FAILURE,
    UPDATE_SUBCATEGORY_REQUEST,
    UPDATE_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY_FAILURE,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_CATEGORIES_SUCCESS,
    DELETE_CATEGORIES_FAILURE
   
  } from "../types";

  import {
    SHOW_SUCCESS_MESSAGE,
    SHOW_ERROR_MESSAGE,
    CLEAR_MESSAGES,
  } from '../messageConstant';
  import axios from "../../util/axios";

  export const GET_ALL_SUBCategory = () => (dispatch) => {
    dispatch({ type: GET_SUBCATEGORY_REQUEST });
    axios
      .get("/api/SubCategory/Show")
      .then((res) => {
        dispatch({
          type: GET_SUBCATEGORY_SUCCESS,
          payload: {SUBcategories:res.data}
    
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_SUBCATEGORY_FAILURE,
          payload:{error: err}
        });
      });
  };