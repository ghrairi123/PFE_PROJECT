import { LOADING_DATA, GET_NOTIFICATION_SUCCESS } from "../types";
import axios from "../../util/axios";
export const getNotifications = (IDorgan) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/api/Notifications/${IDorgan}/`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: GET_NOTIFICATION_SUCCESS,
          payload: {
            notifyevent: res.data.notifyevent,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
