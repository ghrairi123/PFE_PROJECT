import {
    LOADING_DATA,
    Get_Categories,
    Get_Categories_SUCCESS,
    DELETE_CATEGORIES_SUCCESS,
    ADD_Category,
    SET_ERROR_CATEGORY,
    Get_Categories_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILURE,
    UPDATE_CATEGORY_FAILURE,
    UPDATE_CATEGORIES_SUCCESS,
    Show_Events_Category_REQUEST,
    Show_Events_Category_SUCCESS,
    Show_Events_Category_FAILURE,  
    Show_All_Events_Category_REQUEST,
    Show_All_Events_Category_SUCCESS,
    Show_All_Events_Category_FAILURE
  } from "../types";
  
  const initialState = {
    categories: [],
    category_Events: [],
    All_category_Events: [],
    error: null,
    message: null,
    category:{}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true,
        };
      case Get_Categories_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: action.payload.categories
        };
        case GET_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          category: action.payload.category
        };
        
        case Show_Events_Category_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case Show_Events_Category_SUCCESS:
          return {
            ...state,
            loading: false,
            category_Events: action.payload.category_event
          };
          case Show_All_Events_Category_REQUEST:
            return {
              ...state,
              loading: true,
            };
            case Show_Events_Category_FAILURE:
              return {
                ...state,
                error: action.payload.error
              }; 
              case Show_All_Events_Category_FAILURE:
                return {
                  ...state,
                  error: action.payload.error
                }; 
          case Show_All_Events_Category_SUCCESS:
          return {
            ...state,
            loading: false,
            All_category_Events: action.payload.All_category_event
          };
        case ADD_Category:
          return {
            ...state,
            categories: [action.payload],
            loading: false,
          };
          case SET_ERROR_CATEGORY:
            return {
              ...state,
              loading: false,
              error: action.payload.error,
            };
      case Get_Categories_FAIL:
        return {
          ...state,
          error: action.payload.error
        }; 
        case GET_CATEGORY_FAILURE:
          return {
            ...state,
            error: action.payload.error
          };
         case DELETE_CATEGORIES_SUCCESS:
        return {
          categories: state.categories.filter(
                p => p._id !== action.payload._id
            ),
        };

        case UPDATE_CATEGORIES_SUCCESS:
          return {
            category: state.category.filter(
                  p => p._id !== action.payload._id
              ),
          };
          case UPDATE_CATEGORY_FAILURE:
            return {
              ...state,
              error: action.payload.error
            };
       default:
        return state;
    }
  }
  