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
  ADD_EVENT_SUCCESS,
  LOADING_DATA,
  Post_Class_SUCCESS,
  Post_Equipe_SUCCESS,
  SERVER_ERROR,
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
import {
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  CLEAR_MESSAGES,
} from "../messageConstant";

import axios from "../../util/axios";

export const getEventReview = (UserId) => (dispatch) => {
  dispatch({ type: GET_EVENTS_REQUEST });
  axios
    .get(`/api/EventReview/${UserId}`)
    .then((res) => {
      dispatch({
        type: getEventReview_SUCCESS,
        payload: { EventReview: res.event },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const createEventReview =
  (EventsId, userid, username, FormData, history) => async (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .post(`/api/comments/${EventsId}/${userid}/${username}`, FormData)
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: res.data.successMessage,
          });
          alert("vos avis  créés avec succès");
          history.push({
            pathname: "/Evaluate",
            state: { id: userid },
          });
        } else if (res.status === 400) {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: res.data.errorMessage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
          });
        } else {
          dispatch({
            type: SERVER_ERROR,
          });
        }
      });
  };

export const get_fifty_Events = () => (dispatch) => {
  dispatch({ type: GET_EVENTS_REQUEST });
  axios
    .get("/api/fifty_Events")
    .then((res) => {
      dispatch({
        type: get_fifty_Events_SUCCESS,
        payload: { Events: res.data.Event },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_EVENTS_FAILURE,
        payload: { error: err.data.error },
      });
    });
};

export const get_ten_Events = (EventNumber) => (dispatch) => {
  dispatch({ type: GET_EVENTS_REQUEST });
  axios
    .get(`/api/NEvents/${EventNumber}`)
    .then((res) => {
      dispatch({
        type: get_ten_Events_SUCCESS,
        payload: { Events: res.data.Event },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const get_twenty_Events = () => (dispatch) => {
  dispatch({ type: GET_EVENTS_REQUEST });
  axios
    .get("/api/twenty_Events")
    .then((res) => {
      dispatch({
        type: get_twenty_Events_SUCCESS,
        payload: { Events: res.data.Event },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_EVENTS_FAILURE,
        payload: { error: err.data.error },
      });
    });
};
export const get_one_hundred_Events = () => (dispatch) => {
  dispatch({ type: GET_EVENTS_REQUEST });
  axios
    .get("/api/one_hundred_Events")
    .then((res) => {
      dispatch({
        type: get_one_hundred_Events_SUCCESS,
        payload: { Events: res.data.Event },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_EVENTS_FAILURE,
        payload: { error: err.data.error },
      });
    });
};

export const GetAllEvents = () => (dispatch) => {
  dispatch({ type: GET_EVENTS_REQUEST });
  axios
    .get("/api/Events")
    .then((res) => {
      dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: { Events: res.data.Event },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const get_Events_By_price = (Price, MaxPrice) => (dispatch) => {
  dispatch({ type: GET_Events_By_price_REQUEST });
  axios
    .get(`/api/Events_By_price/${Price}/${MaxPrice}`)
    .then((res) => {
      dispatch({
        type: GET_Events_By_price_SUCCESS,
        payload: { Events_By_price: res.data },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEventsById = (EventId) => (dispatch) => {
  dispatch({ type: GET_EVENTS_REQUEST });
  axios
    .get(`/api/Events/${EventId}`)
    .then((res) => {
      dispatch({
        type: GET_EVENTS_BYID_SUCCESS,
        payload: { Event: res.data.Event },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSortEvents = (OrganizerId) => (dispatch) => {
  dispatch({ type: GET_Sort_EVENTS_REQUEST });
  axios
    .get(`/api/SortEvents/${OrganizerId}`)
    .then((res) => {
      dispatch({
        type: GET_Sort_EVENTS_SUCCESS,
        payload: { Events: res.data.Event },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_Sort_EVENTS_FAILURE,
      });
    });
};
export const Get_Events_Par_Category = (CategoryId) => async (dispatch) => {
  dispatch({ type: GET_Events_Par_Category_REQUEST });
  axios
    .get(`/api/ShowEventsparCategory/${CategoryId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_Events_Par_Category_SUCCESS,
        payload: { Events: res.data.event },
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_Events_Par_Category_FAILURE,
        payload: { error: err.data },
      });
    });
};

export const Get_Class_Par_Events = (EventId) => async (dispatch) => {
  dispatch({ type: Get_Class_Par_Events_REQUEST });
  axios
    .get(`/api/Class/${EventId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Get_Class_Par_Events_SUCCESS,
        payload: { Classe: res.data.classe },
      });
    })
    .catch((err) => {
      dispatch({
        type: Get_Class_Par_Events_FAILURE,
        payload: { error: err.data },
      });
    });
};

export const Get_Sponsors_Par_Events = (EventId) => async (dispatch) => {
  dispatch({ type: Get_Sponsors_Par_Events_REQUEST });
  axios
    .get(`/api/Sponsors/${EventId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Get_Sponsors_Par_Events_SUCCESS,
        payload: { Sponsor: res.data.sponsor },
      });
    })
    .catch((err) => {
      dispatch({
        type: Get_Sponsors_Par_Events_FAILURE,
        payload: { error: err.data },
      });
    });
};

export const Get_Equipe_Par_Events = (EventId) => async (dispatch) => {
  dispatch({ type: Get_Equipe_Par_Events_REQUEST });
  axios
    .get(`/api/Equipe/${EventId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Get_Equipe_Par_Events_SUCCESS,
        payload: { Equipe: res.data.equipe },
      });
    })
    .catch((err) => {
      dispatch({
        type: Get_Equipe_Par_Events_FAILURE,
        payload: { error: err.data },
      });
    });
};

export const Get_Addons_Par_Events = (EventId) => async (dispatch) => {
  dispatch({ type: Get_Addons_Par_Events_REQUEST });
  axios
    .get(`/api/Addons/${EventId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Get_Addons_Par_Events_SUCCESS,
        payload: { Addons: res.data.addons },
      });
    })
    .catch((err) => {
      dispatch({
        type: Get_Addons_Par_Events_FAILURE,
        payload: { error: err.data },
      });
    });
};
export const Get_Event_PROMO = (EventId) => async (dispatch) => {
  dispatch({ type: GET_EVENT_PROMO_REQUEST });
  axios
    .get(`/api/promo/${EventId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_EVENT_PROMO_SUCCESS,
        payload: { promo: res.data.promo },
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_EVENT_PROMO_FAILURE,
        payload: { error: err.data },
      });
    });
};

export const ShowOrganizersparEvents = (EventId) => async (dispatch) => {
  dispatch({ type: Get_Organizer_Par_Event_REQUEST });
  axios
    .get(`/api/ShowOrganizersparEvents/${EventId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Get_Organizer_Par_Event_SUCCESS,
        payload: { Eventorganizer: res.data.organizer },
      });
    })
    .catch((err) => {
      dispatch({
        type: Get_Organizer_Par_Event_FAILURE,
        payload: { error: err.data },
      });
    });
};

export const ShowOrganizersAccount = (AccountId) => async (dispatch) => {
  dispatch({ type: Get_Organizer_Account_REQUEST });
  axios
    .get(`/api/accountuser/${AccountId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Get_Organizer_Account_SUCCESS,
        payload: { organizerAccount: res.data.account },
      });
    })
    .catch((err) => {
      dispatch({
        type: Get_Organizer_Account_FAILURE,
        payload: { error: err.data },
      });
    });
};

export const deleteEvent = (EvntId, history) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });
    const response = await axios.delete(`/api/Events/${EvntId}`).then((res) => {
      if (res.status == 200) {
        console.log(res.data);
        alert("Demande refusée");
        history.push({
          pathname: "/ActiveEvents",
        });

        dispatch({
          type: DELETE_EVENT_SUCCESS,
          payload: response.data,
        });
      }
    });
  } catch (err) {
    /*   dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.data.errorMessage,
    }); */
  }
};

export const deleteEvents = (EvntId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });
    const response = await axios
      .delete(`/api/deleteEvent/${EvntId}`)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          alert("événement supprimé avec succès");
          window.location.reload();

          dispatch({
            type: DELETE_EVENT_SUCCESS,
            payload: response.data,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.data.errorMessage,
    });
  }
};
export const AcceptEvents = (EvntId, history) => async (dispatch) => {
  dispatch({ type: ACCEPT_EVENT_REQUEST });
  const response = await axios
    .post(`/api/AcceptEvents/${EvntId}`)
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data);
        alert("Demande Acceptée");
        history.push({
          pathname: "/ActiveEvents",
        });
        dispatch({
          type: ACCEPT_EVENT_SUCCESS,
          payload: response.data,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: SHOW_ERROR_MESSAGE,
        /*   payload: err.data.errorMessage, */
      });
    });
};
export const getThreeEvents = () => {
  return async (dispatch) => {
    dispatch({ type: Show_Three_Request_Events_REQUEST });
    const res = await axios.get(`/api/ThreeRequestEvents`);

    //console.log("data here");
    console.log(res.data);
    if (res.status === 200) {
      // succes de chargements des evaluations
      dispatch({
        type: Show_Three_Request_Events_SUCCESS,
        payload: { threeEvents: res.data },
      });
    } else {
      // echec de chargements des evaluations
      dispatch({
        type: Show_Three_Request_Events_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
export const addEvents =
  (createdBy, category, scategory, newEventData, history) =>
  async (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .post(`/api/Events/${createdBy}/${category}/${scategory}`, newEventData)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.successMessage);
          // succes de chargements des evaluations
          dispatch({
            type: ADD_EVENT_SUCCESS,
            payload: { savedEvents: res.data.savedEvent },
          });
          history.push({
            pathname: "/Class_Details",
            state: { EventId: res.data.savedEvent },
          });
        } else if (res.status === 405) {
          alert(res.data.errorMessage);
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: res.data.errorMessage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response);
        } else {
          dispatch({
            type: SERVER_ERROR,
          });
        }
      });
  };
export const ADD_Classe = (EventsId, formData) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/api/Classes/${EventsId}`, formData)
    .then((res) => {
      if (res.status === 201) {
        alert(res.data.successMessage);
      } else if (res.status === 400) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: res.data.errorMessage,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log(err.response);
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: err.response.data.errorMessage,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};
export const ADD_Equipe_Member =
  (EventsId, formData, history) => async (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .post(`/api/Equipes/${EventsId}`, formData)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.successMessage);
          history.push({
            pathname: "/Myevents",
          });
        } else if (res.status === 400) {
          alert(res.data.errorMessage);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
          });
        } else {
          dispatch({
            type: SERVER_ERROR,
          });
        }
      });
  };
export const ADD_SPONSORS = (EventsId, formData) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/api/Sponsor/${EventsId}`, formData)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: res.data.successMessage,
        });
      } else if (res.status === 405) {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: res.data.errorMessage,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log(err.response);
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: err.response.data.errorMessage,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};
export const ADD_ADDONS =
  (UserId, { Name, Price, Number, image }) =>
  async (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .post(`/api/Addons/${UserId}`, { Name, Price, Number, image })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: res.data.successMessage,
          });
          // succes de chargements des evaluations
          dispatch({
            type: Post_ADDONS_SUCCESS,
            payload: { Addons: res.data.addons },
          });
        } else if (res.status === 405) {
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: res.data.errorMessage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage,
          });
        } else {
          dispatch({
            type: SERVER_ERROR,
          });
        }
      });
  };
export const Get_Request_Events = () => async (dispatch) => {
  dispatch({ type: Show_Request_Events_REQUEST });
  axios
    .get(`/api/RequestEvents`)
    .then((res) => {
      if (res.status === 200) {
        // succes de chargements des evaluations
        dispatch({
          type: Show_Request_Events_SUCCESS,
          payload: { RequestEvent: res.data.data },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log(err.response);
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload: err.response.data.errorMessage,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const getLastEvents = (OrganizerId) => async (dispatch) => {
  try {
    dispatch({ type: GET_LAST_EVENT_REQUEST });
    const response = await axios.get(`/api/LastEvents/${OrganizerId}`);
    console.log(response.data);
    dispatch({
      type: GET_LAST_EVENT_SUCCESS,
      payload: { LastEvents: response.data.Event },
    });
  } catch (err) {
    dispatch({
      type: SHOW_ERROR_MESSAGE,
    });
  }
};
export const MY_Events = (OrganizerId) => async (dispatch) => {
  try {
    dispatch({ type: MY_EVENT_REQUEST });
    const response = await axios.get(`/api/MyEvent/${OrganizerId}`);
    console.log(response.data);
    dispatch({
      type: MY_EVENT_SUCCESS,
      payload: { MyEvents: response.data.event },
    });
  } catch (err) {
    dispatch({
      type: SHOW_ERROR_MESSAGE,
    });
  }
};
export const DRAFT_EVENTS = (OrganizerId) => async (dispatch) => {
  try {
    dispatch({ type: DRAFT_EVENTS_REQUEST });
    const response = await axios.get(`/api/DRAFT_EVENTS/${OrganizerId}`);
    console.log(response.data);
    dispatch({
      type: DRAFT_EVENTS_SUCCESS,
      payload: { DRAFT_Events: response.data.event },
    });
  } catch (err) {
    dispatch({
      type: SHOW_ERROR_MESSAGE,
    });
  }
};
export const Trach_Events = (EvntId, history) => async (dispatch) => {
  try {
    dispatch({ type: Trach_EVENT_REQUEST });
    const response = await axios
      .post(`/api/DeleteEvt/${EvntId}`)
      .then((res) => {
        if (res.status === 200) {
          alert("événement désactivé avec succès");
          window.location.reload();

          dispatch({
            type: Trach_EVENT_SUCCESS,
            payload: response.data,
          });
        }
      });
  } catch (err) {
    /*   dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.data.errorMessage,
    }); */
  }
};

export const Delete_Equipe = (EquipeId, history) => async (dispatch) => {
  try {
    dispatch({ type: Delete_Equipe_REQUEST });
    axios.delete(`/api/Equipes/${EquipeId}`).then((res) => {
      if (res.status === 200) {
        alert("membre de l'équipe supprimer avec succès");
        history.push({
          pathname: "/Myevents",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const Delete_Classe = (ClasseId, history) => async (dispatch) => {
  try {
    dispatch({ type: Delete_Classe_REQUEST });
    axios.delete(`/api/Classes/${ClasseId}`).then((res) => {
      if (res.status === 200) {
        alert("Classe d'événement  supprimer avec succès");
        history.push({
          pathname: "/Myevents",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const Delete_Reviews = (idReviews) => async (dispatch) => {
  try {
    dispatch({ type: Delete_Reviews_REQUEST });
    axios.delete(`/api/comments/${idReviews}`).then((res) => {
      if (res.status === 200) {
        alert("Avis  supprimer avec succès");
      }
    });
  } catch (err) {
    console.log(err);
  }
};
export const Delete_Sponsor = (SponsorId) => async (dispatch) => {
  try {
    dispatch({ type: Delete_Sponsor_REQUEST });
    const response = await axios.delete(`/api/Sponsor/${SponsorId}`);
    dispatch({
      type: Delete_Sponsor_SUCCESS,
      payload: response.data,
    });
    alert("Sponsor  supprimer avec succès");
  } catch (err) {
    console.log(err);
  }
};
export const Reactivate_Events = (EvntId, history) => async (dispatch) => {
  try {
    dispatch({ type: Reactivate_EVENT_REQUEST });
    const response = await axios
      .post(`/api/ReactivateEvt/${EvntId}`)
      .then((res) => {
        if (res.status === 200) {
          alert("événement réactivé avec succès");
          window.location.reload();
          dispatch({
            type: Reactivate_EVENT_SUCCESS,
            payload: response.data,
          });
        }
      });
  } catch (err) {
    /* dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.data.errorMessage,
    }); */
  }
};
export const PENDING_EVENTS = (OrganizerId) => async (dispatch) => {
  try {
    dispatch({ type: PENDING_EVENTS_REQUEST });
    const response = await axios.get(`/api/PENDING_EVENTS/${OrganizerId}`);
    console.log(response.data);
    dispatch({
      type: PENDING_EVENTS_SUCCESS,
      payload: { PENDING_EVENTS: response.data.event },
    });
  } catch (err) {
    dispatch({
      type: SHOW_ERROR_MESSAGE,
    });
  }
};
