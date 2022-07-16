import {
  SET_USER,
  SET_ACCOUNT,
  LOADING_USER,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  getOneOrganizer_SUCCESS,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  account: {},
  name: "",
  address: {},
  imageUrl: [],
  UserByname: [],
  _id: "",
  firstName: "",
  lastName: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case getOneOrganizer_SUCCESS:
      return {
        ...state,
        loading: false,
        UserByname: action.payload.UserByname,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
