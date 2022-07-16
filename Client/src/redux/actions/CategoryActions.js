import {
  SERVER_ERROR,
  LOADING_DATA,
  DELETE_CATEGORIES_REQUEST,
  Show_Events_Category_REQUEST,
  Show_Events_Category_SUCCESS,
  Show_Events_Category_FAILURE,
  Show_All_Events_Category_REQUEST,
  Show_All_Events_Category_SUCCESS,
  Show_All_Events_Category_FAILURE,
  Get_Categories_SUCCESS,
  Get_Categories_FAIL,
  ADD_Category,
  DELETE_CATEGORIES_SUCCESS,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_CATEGORIES_SUCCESS,
} from "../types";
import { SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE } from "../messageConstant";
import axios from "../../util/axios";

export const fetchCategory = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/api/category")
    .then((res) => {
      dispatch({
        type: Get_Categories_SUCCESS,
        payload: { categories: res.data },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Get_Categories_FAIL,
        payload: { error: err.data },
      });
    });
};
export const GetCategory = (CategoryId) => async (dispatch) => {
  dispatch({ type: GET_CATEGORY_REQUEST });
  axios
    .get(`/api/category/${CategoryId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_CATEGORY_SUCCESS,
        payload: { category: res.data },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_CATEGORY_FAILURE,
        payload: { error: err.data.error },
      });
    });
};

export const Show_Events_Category = (CategoryId) => async (dispatch) => {
  try {
    dispatch({ type: Show_Events_Category_REQUEST });
    const response = await axios.get(`/api/categoryEvent/${CategoryId}`);
    console.log(response.data);
    dispatch({
      type: Show_Events_Category_SUCCESS,
      payload: { category_event: response.data.event },
    });
  } catch (err) {
    dispatch({
      type: SHOW_ERROR_MESSAGE,
    });
  }
};
export const Show_All_Events_Category = (CategoryId) => async (dispatch) => {
  dispatch({ type: Show_All_Events_Category_REQUEST });
  axios
    .get(`/api/categoryEvent/${CategoryId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Show_All_Events_Category_SUCCESS,
        payload: { All_category_event: res.data.event },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Show_All_Events_Category_FAILURE,
        payload: { error: err.data.error },
      });
    });
};
export const addCategory = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });
    axios.post(`/api/category`, formData).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: res.data.successMessage,
        });
        dispatch({
          type: ADD_Category,
          payload: res.data.category,
        });
        alert("Succès ! catégorie ajoutée avec succès");
        //this.props.history.push("/Account")
        history.push({ pathname: "/categories" });
        window.location.reload();
      } else if (res.status === 405) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: res.data.errorMessage,
        });
      }
    });
  } catch (err) {
    console.log("createProduct api error: ", err);
    dispatch({
      type: SHOW_ERROR_MESSAGE,
    });
  }
};

export const deleteCategories = (CategoryId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORIES_REQUEST });
    const response = await axios.delete(`/api/category/${CategoryId}`);

    dispatch({
      type: DELETE_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    console.log("deleteCategorie api error: ", err);

    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};

export const editCategory = (categoryData, id) => (dispatch) => {
  axios
    .put(`/api/category/${id}`, categoryData)
    .then((res) => {
      dispatch({
        type: SHOW_SUCCESS_MESSAGE,
        payload: res.data.successMessage,
      });
      dispatch({
        type: UPDATE_CATEGORIES_SUCCESS,
        payload: res.data.item,
      });
      alert(res.data.successMessage);
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: UPDATE_CATEGORY_FAILURE,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};
