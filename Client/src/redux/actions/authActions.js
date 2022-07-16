import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  ORGANIZER_REGISTER_REQUEST,
  ORGANIZER_REGISTER_SUCCESS,
  ORGANIZER_REGISTER_FAILURE,
  getOneOrganizer_SUCCESS,
  LOADING_UI,
  SET_ERRORS,
  SERVER_ERROR,
  CLEAR_ERRORS,
  LOADING_USER,
  SET_USER,
  SET_ERROR,
  SET_ACCOUNT,
  SET_UNAUTHENTICATED,
  Update_User_SUCCESS,
} from "../types";
import { SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE } from "../messageConstant";
import axios from "../../util/axios";

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/auth/signup-Client", newUserData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: res.data.successMessage,
        });
        alert("votre compte a été créé avec succès");
        history.push("/login");
      } else if (res.status === 401) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: res.data.errorMessage,
        });
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const signupORGANIZER = (newUserData, history) => (dispatch) => {
  dispatch({ type: ORGANIZER_REGISTER_REQUEST });
  axios
    .post("/auth/signup-organizer", newUserData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: res.data.successMessage,
        });
        alert(res.data.successMessage);
        history.push("/login");
      } else if (res.status === 401) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: res.data.errorMessage,
        });
        alert(res.data.errorMessage);
      }
    })
    .catch((err) => {
      if (err.response) {
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const loginAction = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/auth/login", userData)
    .then((res) => {
      if (res.status === 200) {
        const jwt = `Bearer ${res.data.token}`;
        localStorage.setItem("jwt", jwt);
        axios.defaults.headers.common["Authorization"] = jwt;
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        console.log("Authenticated, check localStorage", jwt);
        history.push("/");
      } else if (res.status === 401) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: res.data.errorMessage,
        });
      }
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: err.response.data.errorMessage,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      console.log(res.data.result);
      localStorage.setItem("idConnected", res.data.result._id);
      dispatch({
        type: SET_USER,
        payload: res.data.result,
      });
    })
    .catch((err) => console.log(err));
};

export const getUserAccount = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/account")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_ACCOUNT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const logoutAction = (history) => (dispatch) => {
  localStorage.removeItem("jwt");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  if (history) history.push("/login");
};

export const updateUserInfo = (UserId) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post(`/user/${UserId}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: res.data.successMessage,
        });
        // succes de chargements des evaluations
        dispatch({
          type: Update_User_SUCCESS,
          payload: { savedUser: res.data.oldUser },
        });
      }
    })
    .catch((err) => console.log(err));
};

export const getOneOrganizers = (UserName) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`/Oneorganizer/${UserName}`)
    .then((res) => {
      if (res.status === 200) {
        // succes de chargements des evaluations
        dispatch({
          type: getOneOrganizer_SUCCESS,
          payload: { UserByname: res.data.data },
        });
      }
    })
    .catch((err) => console.log(err));
};
