import {
   POST_MESSAGE_SUCCESS,
   POST_MESSAGE_REQUEST,
   POST_MESSAGE_FAILURE,
   GET_MESSAGE_SUCCESS,
   GET_MESSAGE_REQUEST,
   GET_MESSAGE_FAILURE,
   GET_THREE_MESSAGE_SUCCESS,
   GET_THREE_MESSAGE_REQUEST,
   GET_THREE_MESSAGE_FAILURE,
   DELETE_message


  } from "../types";

   const initialState = {
    messages: [],
    three_messages: []
  };
  


   export default function (state = initialState, action) {
       switch (action.type) {
  case GET_MESSAGE_REQUEST:
        return {
          ...state,
          loading: true,
        };
  case GET_MESSAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          messages: action.payload.messages
        };
  case GET_MESSAGE_FAILURE:
        return {
          ...state,
          error: action.payload.error
        }; 


case  GET_THREE_MESSAGE_REQUEST:
        return {
          ...state,
          loading: true,
        };
  case  GET_THREE_MESSAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          three_messages: action.payload.threeMessage
        };
  case  GET_THREE_MESSAGE_FAILURE:
        return {
          ...state,
          error: action.payload.error
        }; 

       case POST_MESSAGE_SUCCESS:
          return {
            ...state,
            messages: [...state.messages, action.payload],
            loading: false,
          };
        case POST_MESSAGE_FAILURE:
        return {
          ...state,
          
        }; 
        case DELETE_message:
          return {
              messages: state.messages.filter(
                  p => p._id !== action.payload._id
              ),
          };

         default:
        return state;
    }
  }
  