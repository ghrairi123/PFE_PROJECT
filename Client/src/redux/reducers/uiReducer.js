import {
    SET_ERRORS,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    LOADING_UI,
    ORGANIZER_REGISTER_REQUEST,
    ORGANIZER_REGISTER_SUCCESS,
    ORGANIZER_REGISTER_FAILURE,
    SERVER_ERROR,
    SIGNUP_SUCCESS,
    SET_ERROR,
    Update_User_SUCCESS,
    SET_ERROR_CATEGORY,
    SET_ERRORS_SIGNUP_Organizer,
  } from "../types";
  
  const initialState = {
    loading: false,
    savedUser:{},
    serverError: false,
    errors: null,
    errorsOrganizer: null,
    signup:"",
    usersData:[],
    signUpSuccess: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_ERRORS:
        return {
          ...state,
          loading: false,
          errors: action.payload.errors,
          serverError: false,
        };
      case SET_ERROR:
        return {
          ...state,
          loading: false,
          errors: action.payload.message,
          serverError: false,
        };
      case ORGANIZER_REGISTER_FAILURE:
        return {
          ...state,
          loading: false,
          errorsOrganizer: action.payload,
          serverError: false,
        };
      case SERVER_ERROR:
        return {
          ...state,
          loading: false,
          serverError: true,
          errors: null,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          loading: false,
          errors: null,
          errorsOrganizer: null,
        };
      case LOADING_UI:
        return {
          ...state,
          loading: true,
          serverError: false,
          signUpSuccess: false,
        };
      case ORGANIZER_REGISTER_REQUEST:
          return {
            ...state,
            loading: true,
            serverError: false,
            signUpSuccess: false,
          };
      case ORGANIZER_REGISTER_SUCCESS:
        return {
          ...state,
          signUpSuccess: true,
          signup:"Succeess"
        };
      case Update_User_SUCCESS:
          return {
            ...state,
            savedUser: action.payload.savedUser,
            loading: false,
          };
      default:
        return state;
    }
  }
  