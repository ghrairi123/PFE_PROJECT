import axios from "../../util/axios";
import {
  LOADING_DATA,
  GET_ALL_ORGANIZER_REQUEST,
  GET_ALL_ORGANIZER_SUCCESS,
  GET_ORGANIZER_SUCCESS,
  GET_ORGANIZER_FAILURE,
  GET_ALL_ORGANIZER_FAILURE,
  GET_THREE_ORGANIZER_FAILURE,
  GET_THREE_ORGANIZER_REQUEST,
  GET_THREE_ORGANIZER_SUCCESS,
  ACEEPT_ORGANIZER_SUCCESS,
  ACEEPT_ORGANIZER_FAILURE,
  DELETE_Invitation,
  DELETE_ORGANIZER,
  SHOW_ORGANIZERS_REQUEST,
  SHOW_ORGANIZERS_FAILURE,
  SHOW_ORGANIZERS_SUCCESS,
} from "../types";
import { SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE } from "../messageConstant";
export const getAllOrganizer = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_ORGANIZER_REQUEST });
    const res = await axios.get(`/organizer`);

    //console.log("data here");
    console.log(res.data);
    if (res.status === 200) {
      // succes de chargements des evaluations
      dispatch({
        type: GET_ALL_ORGANIZER_SUCCESS,
        payload: { organizers: res.data },
      });
    } else {
      // echec de chargements des evaluations
      dispatch({
        type: GET_ALL_ORGANIZER_FAILURE,
        //  payload : { error : res.data }
      });
    }
  };
};

export const ShowOrganizers = () => {
  return async (dispatch) => {
    dispatch({ type: SHOW_ORGANIZERS_REQUEST });
    const res = await axios.get(`/organizers`);

    //console.log("data here");
    console.log(res.data);
    if (res.status === 200) {
      // succes de chargements des evaluations
      dispatch({
        type: SHOW_ORGANIZERS_SUCCESS,
        payload: { organizers: res.data.data },
      });
    } else {
      // echec de chargements des evaluations
      dispatch({
        type: SHOW_ORGANIZERS_FAILURE,
      });
    }
  };
};
export const getThreeOrganizer = () => {
  return async (dispatch) => {
    dispatch({ type: GET_THREE_ORGANIZER_REQUEST });
    const res = await axios.get(`/Invitations`);

    //console.log("data here");
    console.log(res.data);
    if (res.status === 200) {
      // succes de chargements des evaluations
      dispatch({
        type: GET_THREE_ORGANIZER_SUCCESS,
        payload: { threeorganizers: res.data },
      });
    } else {
      // echec de chargements des evaluations
      dispatch({
        type: GET_THREE_ORGANIZER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getOrganizer = (organzerId) => {
  return async (dispatch) => {
    const res = await axios.get(`/userInfo/` + organzerId);
    //console.log("data here");
    console.log(res.data);
    if (res.status === 200) {
      dispatch({
        type: GET_ORGANIZER_SUCCESS,
        payload: { organizer: res.data },
      });
    } else {
      dispatch({
        type: GET_ORGANIZER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const AcceptOrganizer = (organzerId, history) => {
  return async (dispatch) => {
    const res = await axios
      .post(`/AcceptOrganizer/` + organzerId)
      .then((res) => {
        if (res.status === 200) {
          // succes de chargements des evaluations
          alert("invitation acceptée avec succès");
          dispatch({
            type: ACEEPT_ORGANIZER_SUCCESS,
            payload: res.data,
          });
          history.push({
            pathname: "/invitations",
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        /*  dispatch({
          type: ACEEPT_ORGANIZER_FAILURE,
          payload: { error: err.data.error },
        }); */
      });
  };
};

export const deleteInvitation = (InvitationId, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });
    const response = await axios
      .post(`/DeleteInvitation/${InvitationId}`)
      .then((res) => {
        if (res.status === 200) {
          // succes de chargements des evaluations
          alert("invitation refusée avec succès");
          dispatch({
            type: DELETE_Invitation,
            payload: response.data,
          });
          history.push({
            pathname: "/invitations",
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        /*  dispatch({
          type: ACEEPT_ORGANIZER_FAILURE,
          payload: { error: err.data.error },
        }); */
      });
  } catch (err) {
    console.log("deleteInvitation api error: ", err);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });
    const response = await axios.delete(`/user/${userId}`).then((res) => {
      if (res.status === 200) {
        // succes de chargements des evaluations
        alert("utilisateur supprimé avec succès");
        window.location.reload();
        dispatch({
          type: DELETE_ORGANIZER,
          payload: response.data,
        });
      }
    });
  } catch (err) {
    console.log("deleteInvitation api error: ", err);

    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};
