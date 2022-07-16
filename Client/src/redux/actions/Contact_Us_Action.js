import {
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_REQUEST,
  POST_MESSAGE_FAILURE,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_FAILURE,
  DELETE_message,
  LOADING_DATA,
  GET_THREE_MESSAGE_SUCCESS,
  GET_THREE_MESSAGE_REQUEST,
  GET_THREE_MESSAGE_FAILURE,
} from "../types";
import {
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  CLEAR_MESSAGES,
} from "../messageConstant";
import axios from "../../util/axios";

export const GET_THREE_MESSAGE = () => {
  return async (dispatch) => {
    dispatch({ type: GET_THREE_MESSAGE_REQUEST });
    axios
      .get(`/api/threemessage`)
      .then((res) => {
        if (res.status === 200) {
          // succes de chargements des evaluations
          dispatch({
            type: GET_THREE_MESSAGE_SUCCESS,
            payload: { threeMessage: res.data.messag },
          });
        } else if (res.status === 400) {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: res.data.errorMessage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
          });
        }
      });
  };
};
export const GET_MESSAGES = () => async (dispatch) => {
  dispatch({ type: GET_MESSAGE_REQUEST });
  axios
    .get(`/api/message`)
    .then((res) => {
      if (res.status === 200) {
        // succes de chargements des evaluations
        dispatch({
          type: GET_MESSAGE_SUCCESS,
          payload: { messages: res.data.messag },
        });
      } else if (res.status === 400) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: res.data.errorMessage,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log(err.response);
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: err.response.data.errorMessage,
        });
      }
    });
};
export const POST_MESSAGE = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: POST_MESSAGE_REQUEST });
    const res = await axios.post(`/api/message`, formData);
    if (res.status === 201) {
      dispatch({
        type: SHOW_SUCCESS_MESSAGE,
        payload: res.data.successMessage,
      });
      dispatch({
        type: POST_MESSAGE_SUCCESS,
        payload: res.data.docs,
      });
      alert("message envoyé avec succès");
      history.push({
        pathname: "/contact",
      });
    } else if (res.status === 500) {
      dispatch({
        type: SHOW_ERROR_MESSAGE,
        payload: res.data.errorMessage,
      });
    }
  } catch (err) {
    dispatch({
      type: POST_MESSAGE_FAILURE,
    });
  }
};

export const deleteMessage = (InvitationId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });
    const response = await axios.delete(`/api/message/${InvitationId}`);
    if (response.status === 200) {
      dispatch({
        type: DELETE_message,
        payload: { messages: response.data.messag },
      });
      alert("réclamation supprimée avec succès");
    }
  } catch (err) {
    console.log("deleteInvitation api error: ", err);

    dispatch({
      type: SHOW_ERROR_MESSAGE,
    });
  }
};
