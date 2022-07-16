import {
    LOADING_DATA,
    getTypeUser_SUCCESS,
    get_New_Invitation,
    Event_Category_Success,
    EVENTS_Pert_SUCCESS,
    MaxReviews_Success  
  } from "../types"; 
  const initialState = {
    OrganAccount:0,
    ClientAccount:0,
    event:0,
    NewOrganizer:0,
    Data:[],
    MaxReviews:{}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true,
        };
      case getTypeUser_SUCCESS:
        return {
          ...state,
          loading: false,
          OrganAccount: action.payload.OrganAccount,
          ClientAccount: action.payload.ClientAccount
        };
        
        case get_New_Invitation:
            return {
              ...state,
              loading: false,
              NewOrganizer: action.payload.NewOrganizer
            };
            case MaxReviews_Success:
              return {
                ...state,
                loading: false,
                MaxReviews: action.payload.MaxReviews
              };
  
            case Event_Category_Success:
              return {
                ...state,
                loading: false,
                event: action.payload.event
              };
              case EVENTS_Pert_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  Data: action.payload.Data
                };
       default:
        return state;
    }
  }
  