import { LOADING_DATA, GET_NOTIFICATION_SUCCESS } from "../types";

const initialState = {
  notifyevent: [],
  error: null,
  message: null,
  city: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifyevent: action.payload.notifyevent,
      };
    default:
      return state;
  }
}
