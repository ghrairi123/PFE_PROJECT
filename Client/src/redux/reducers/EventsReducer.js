import {
  GET_EVENTS_FAILURE,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_Events_Par_Category_SUCCESS,
  GET_Events_Par_Category_REQUEST,
  GET_Events_Par_Category_FAILURE,
  Get_Class_Par_Events_SUCCESS,
  Get_Class_Par_Events_REQUEST,
  Get_Class_Par_Events_FAILURE,
  Get_Sponsors_Par_Events_SUCCESS,
  Get_Sponsors_Par_Events_REQUEST,
  Get_Sponsors_Par_Events_FAILURE,
  Get_Equipe_Par_Events_SUCCESS,
  Get_Equipe_Par_Events_REQUEST,
  Get_Equipe_Par_Events_FAILURE,
  Get_Addons_Par_Events_SUCCESS,
  Get_Addons_Par_Events_REQUEST,
  Get_Addons_Par_Events_FAILURE,
  GET_EVENT_PROMO_FAILURE,
  GET_EVENT_PROMO_REQUEST,
  GET_EVENT_PROMO_SUCCESS,
  Get_Organizer_Par_Event_SUCCESS,
  Get_Organizer_Par_Event_REQUEST,
  Get_Organizer_Par_Event_FAILURE,
  Get_Organizer_Account_REQUEST,
  Get_Organizer_Account_SUCCESS,
  Get_Organizer_Account_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  Show_Request_Events_REQUEST,
  Show_Request_Events_SUCCESS,
  Show_Request_Events_FAILURE,
  Show_Three_Request_Events_REQUEST,
  Show_Three_Request_Events_SUCCESS,
  Show_Three_Request_Events_FAILURE,
  ACCEPT_EVENT_REQUEST,
  ACCEPT_EVENT_SUCCESS,
  MY_EVENT_REQUEST,
  MY_EVENT_SUCCESS,
  Trach_EVENT_REQUEST,
  Trach_EVENT_SUCCESS,
  DRAFT_EVENTS_REQUEST,
  DRAFT_EVENTS_SUCCESS,
  Reactivate_EVENT_REQUEST,
  Reactivate_EVENT_SUCCESS,
  PENDING_EVENTS_REQUEST,
  PENDING_EVENTS_SUCCESS,
  SHOW_SUCCESS_MESSAGE,
  ADD_EVENT_SUCCESS,
  Post_Class_SUCCESS,
  Post_Equipe_SUCCESS,
  Post_SPONSORS_SUCCESS,
  Post_ADDONS_SUCCESS,
  get_one_hundred_Events_SUCCESS,
  get_twenty_Events_SUCCESS,
  get_ten_Events_SUCCESS,
  get_fifty_Events_SUCCESS,
  GET_Sort_EVENTS_REQUEST,
  GET_Sort_EVENTS_SUCCESS,
  GET_Sort_EVENTS_FAILURE,
  GET_EVENTS_BYID_FAILURE,
  GET_EVENTS_BYID_SUCCESS,
  GET_LAST_EVENT_REQUEST,
  GET_LAST_EVENT_SUCCESS,
  getEventReview_SUCCESS,
  Delete_Equipe_REQUEST,
  Delete_Equipe_SUCCESS,
  Delete_Classe_SUCCESS,
  Delete_Classe_REQUEST,
  Delete_Sponsor_REQUEST,
  Delete_Sponsor_SUCCESS,
  Delete_Reviews_REQUEST,
  Delete_Reviews_SUCCESS,
  GET_Events_By_price_SUCCESS,
  GET_Events_By_price_REQUEST,
} from "../types";

const initialState = {
  Events_By_price: [],
  twenty_Events: [],
  one_hundred_Events: [],
  EventReview: [],
  ten_Events: [],
  fifty_Events: [],
  events: [],
  Addon: [],
  classes: [],
  Sponsors: [],
  Equipes: [],
  Addons: [],
  error: null,
  message: null,
  event: {},
  LastEvents: {},
  eventById: {},
  promo: [],
  Eventorganizer: [],
  organizerAccount: [],
  RequestEvt: [],
  threeEvents: [],
  MyEvents: [],
  SortEvents: [],
  Classe: [],
  Equipe: [],
  sposnor: [],
  DRAFT_Events: [],
  PENDING_EVENTS: [],
  savedEvents: {},
  Reviws: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LAST_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        savedEvents: action.payload.savedEvents,
        loading: false,
      };
    case Post_Class_SUCCESS:
      return {
        ...state,
        Classe: action.payload.class,
        loading: false,
      };
    case Post_ADDONS_SUCCESS:
      return {
        ...state,
        Addon: action.payload.Addons,
        loading: false,
      };
    case Post_Equipe_SUCCESS:
      return {
        ...state,
        Equipe: action.payload.equipe,
        loading: false,
      };
    case Post_SPONSORS_SUCCESS:
      return {
        ...state,
        sposnor: action.payload.Sponsors,
        loading: false,
      };
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload.Events,
      };
    case GET_LAST_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        LastEvents: action.payload.LastEvents,
      };
    case getEventReview_SUCCESS:
      return {
        ...state,
        loading: false,
        EventReview: action.payload.EventReview,
      };
    case GET_EVENTS_BYID_SUCCESS:
      return {
        ...state,
        loading: false,
        eventById: action.payload.Event,
      };
    case GET_Sort_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        SortEvents: action.payload.Events,
      };
    case get_one_hundred_Events_SUCCESS:
      return {
        ...state,
        loading: false,
        one_hundred_Events: action.payload.Events,
      };
    case get_fifty_Events_SUCCESS:
      return {
        ...state,
        loading: false,
        fifty_Events: action.payload.Events,
      };
    case get_ten_Events_SUCCESS:
      return {
        ...state,
        loading: false,
        ten_Events: action.payload.Events,
      };
    case GET_Events_By_price_SUCCESS:
      return {
        ...state,
        loading: false,
        Events_By_price: action.payload.Events_By_price,
      };
    case GET_Events_By_price_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case get_twenty_Events_SUCCESS:
      return {
        ...state,
        loading: false,
        twenty_Events: action.payload.Events,
      };
    case GET_EVENTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case GET_Events_Par_Category_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_Events_Par_Category_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload.Events,
      };
    case GET_Events_Par_Category_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case Get_Class_Par_Events_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Get_Class_Par_Events_SUCCESS:
      return {
        ...state,
        loading: false,
        classes: action.payload.Classe,
      };
    case Get_Class_Par_Events_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case Get_Sponsors_Par_Events_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Get_Sponsors_Par_Events_SUCCESS:
      return {
        ...state,
        loading: false,
        Sponsors: action.payload.Sponsor,
      };
    case Get_Sponsors_Par_Events_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case Get_Equipe_Par_Events_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Get_Equipe_Par_Events_SUCCESS:
      return {
        ...state,
        loading: false,
        Equipes: action.payload.Equipe,
      };
    case Get_Equipe_Par_Events_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case Get_Addons_Par_Events_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Get_Addons_Par_Events_SUCCESS:
      return {
        ...state,
        loading: false,
        Addons: action.payload.Addons,
      };
    case Get_Addons_Par_Events_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case GET_EVENT_PROMO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_EVENT_PROMO_SUCCESS:
      return {
        ...state,
        loading: false,
        promo: action.payload.promo,
      };
    case GET_EVENT_PROMO_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case Get_Organizer_Par_Event_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Get_Organizer_Par_Event_SUCCESS:
      return {
        ...state,
        loading: false,
        Eventorganizer: action.payload.Eventorganizer,
      };
    case Get_Organizer_Par_Event_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case Get_Organizer_Account_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Get_Organizer_Account_SUCCESS:
      return {
        ...state,
        loading: false,
        organizerAccount: action.payload.organizerAccount,
      };
    case Get_Organizer_Account_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        Events: state.Events.filter((p) => p._id !== action.payload._id),
      };
    case ACCEPT_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCEPT_EVENT_SUCCESS:
      return {
        Events: state.Events.filter((p) => p._id !== action.payload._id),
      };
    case Trach_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Trach_EVENT_SUCCESS:
      return {
        Events: state.Events.filter((p) => p._id !== action.payload._id),
      };
    case Delete_Equipe_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Delete_Equipe_SUCCESS:
      return {
        Equipes: state.Equipes.filter((p) => p._id !== action.payload._id),
      };
    case Delete_Classe_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Delete_Classe_SUCCESS:
      return {
        Classes: state.Classe.filter((p) => p._id !== action.payload._id),
      };
    case Delete_Sponsor_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Delete_Sponsor_SUCCESS:
      return {
        Sponsors: state.Sponsors.filter((p) => p._id !== action.payload._id),
      };
    case Delete_Reviews_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Delete_Reviews_SUCCESS:
      return {
        Reviws: state.Reviws.filter((p) => p._id !== action.payload._id),
      };
    case Show_Request_Events_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Show_Request_Events_SUCCESS:
      return {
        ...state,
        loading: false,
        RequestEvt: action.payload.RequestEvent,
      };
    case Show_Request_Events_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case Show_Three_Request_Events_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Show_Three_Request_Events_SUCCESS:
      return {
        ...state,
        loading: false,
        threeEvents: action.payload.threeEvents,
      };
    case Show_Three_Request_Events_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case MY_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        MyEvents: action.payload.MyEvents,
      };
    case DRAFT_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DRAFT_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        DRAFT_Events: action.payload.DRAFT_Events,
      };
    case Reactivate_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Reactivate_EVENT_SUCCESS:
      return {
        Events: state.Events.filter((p) => p._id !== action.payload._id),
      };
    case PENDING_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PENDING_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        PENDING_EVENTS: action.payload.PENDING_EVENTS,
      };

    default:
      return state;
  }
}
