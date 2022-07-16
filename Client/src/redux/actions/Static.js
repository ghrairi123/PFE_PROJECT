import {
  LOADING_DATA,
  getTypeUser_SUCCESS,
  get_New_Invitation,
  Event_Category_Success,
  getTypeUser_FAIL,
  EVENTS_Pert_SUCCESS,
  MaxReviews_Success,
} from "../types";
import axios from "../../util/axios";

export const TypeStat = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/api/TypeStat/")
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: getTypeUser_SUCCESS,
          payload: {
            OrganAccount: res.data.organisator,
            ClientAccount: res.data.client,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: getTypeUser_FAIL,
        payload: {
          /*error: err.data.error*/
        },
      });
    });
};
export const getNewOrganizer = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/api/NewOrganazer/")
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: get_New_Invitation,
          payload: {
            NewOrganizer: res.data.Invit,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: getTypeUser_FAIL,
        payload: {
          /*error: err.data.error*/
        },
      });
    });
};
export const MaxReviews = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/api/MaxReviews/")
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: MaxReviews_Success,
          payload: {
            MaxReviews: res.data.Event,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const ShowEventsparCategory = (CategoryId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/api/CatEventStat/${CategoryId}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: Event_Category_Success,
          payload: {
            event: res.data.event,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: getTypeUser_FAIL,
        payload: {
          /*error: err.data.error*/
        },
      });
    });
};
export const EVENTS_Pert = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/api/EVENTS_Pert/")
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: EVENTS_Pert_SUCCESS,
          payload: {
            Data: res.data.Data,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: getTypeUser_FAIL,
        payload: {
          /*error: err.data.error*/
        },
      });
    });
};
