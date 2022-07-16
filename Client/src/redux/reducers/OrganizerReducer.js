import {
    GET_ALL_ORGANIZER_SUCCESS,
    GET_ALL_ORGANIZER_FAILURE,     
    GET_ORGANIZER_SUCCESS,
    GET_ORGANIZER_FAILURE,
    GET_THREE_ORGANIZER_FAILURE,
    GET_THREE_ORGANIZER_SUCCESS,
    DELETE_Invitation,
    DELETE_ORGANIZER,
    SHOW_ORGANIZERS_SUCCESS,
    SHOW_ORGANIZERS_FAILURE
   
  } from "../types";

const initialState ={
    organizers : [],
    SHOWorganizers : [],
    threeorganizers: [],
    organizer: {},
    message: null,
    error : null 
}

export default function (state = initialState ,action)  {
    switch(action.type){
        case GET_ALL_ORGANIZER_SUCCESS :
        state = {
            ...state,
            organizers : action.payload.organizers
        }
        break;

        case SHOW_ORGANIZERS_SUCCESS :
            state = {
                ...state,
                organizers : action.payload.organizers
            }
            break;
            case SHOW_ORGANIZERS_FAILURE :
                state = {
                    ...state,
                    error : action.payload.error
                }
                break;
        case GET_ALL_ORGANIZER_FAILURE :
            state = {
                ...state,
                error : action.payload.error
            }
            break;

            case GET_THREE_ORGANIZER_SUCCESS :
        state = {
            ...state,
            threeorganizers : action.payload.threeorganizers
        }
       
        break;

        case GET_THREE_ORGANIZER_FAILURE :
            state = {
                ...state,
                error : action.payload.error
            }
            break;

            case GET_ORGANIZER_SUCCESS : 
            state = {
                ...state,
                organizer : action.payload.organizer
               
            }
            case GET_ORGANIZER_FAILURE : 
            state = {
                ...state,
                error : action.payload.error
            }
            case DELETE_Invitation:
                return {
                    organizers: state.organizers.filter(
                        p => p._id !== action.payload._id
                    ),
                };

                case DELETE_ORGANIZER:
                    return {
                        organizers: state.organizers.filter(
                            p => p._id !== action.payload._id
                        ),
                    };
        default :
        console.log("default")
         
    }
    return state;
} 



/*
/*
const buildNewCenter = ( centers , center ) => {
    //idees.push(idee)
    
    let mycenters = [];
    for(let mycenter of Object.keys(centers) ){
        //console.log(myidee);
        let cen = centers[mycenter];
        mycenters.push(cen)
       
    }
    mycenters[0].push(center)
    return mycenters;
}
  case centersConstants.GET_MES_CENTERS_FAILURE :
            state = {
                ...state ,
                error : action.payload.error 
            }
        break;
        case centersConstants.GET_MES_CENTERS_SUCCESS :
            state = {
                ...state,
                centers : action.payload.centers
            }
            break;
            case centersConstants.ADD_NEW_CENTER_REQUEST :
                state = {
                    ...state ,
                    loading : true 
                }
            break;
        case centersConstants.ADD_NEW_CENTER_SUCCESS :
            const updatedCenters = buildNewCenter(state.centers,action.payload.center)
            console.log("Updated Centers => : ")
            console.log(updatedCenters)
            state = {
                ...state ,
                centers : updatedCenters,
                loading : false 
            }
        break;
        case centersConstants.ADD_NEW_CENTER_FAILURE :
            state = {
                ...initialState, 
            }
        break;
        case centersConstants.VALIDATE_CENTER_SUCCESS :
            state = {
                ...state,
                message : action.payload.message 
            }
        break;
        case centersConstants.VALIDATE_CENTER_FAILURE :
            state = {
                ...state,
                error : action.payload.error 
            }
        break;
        case centersConstants.DELETE_CENTER_SUCCESS :
            state = {
                ...state,
                message : action.payload.message 
            }
        break;
        case centersConstants.DELETE_CENTER_FAILURE :
            state = {
                ...state,
                error : action.payload.error 
            }
        break;
        case centersConstants.GET_CENTER_SUCCESS :
            state = {
                ...state,
                center : action.payload.center 
            }
        break;
        case centersConstants.GET_CENTER_FAILURE :
            state = {
                ...state,
                error : action.payload.error 
            }
        break;

        */