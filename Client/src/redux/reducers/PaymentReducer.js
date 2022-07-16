import { PAYMENT_REQUEST, PAYMENT_FAILURE, PAYMENT_SUCCESS } from "../types";

const initialState = {
  notifyevent: [],
  error: null,
  message: null,
  city: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
