import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//reducers
import uiReducer from "./reducers/uiReducer";
import userReducer from "./reducers/userReducer";
import CategoriesReducer from "./reducers/CategoriesReducer";
import CityReducer from "./reducers/CityReducer";
import messageReducer from "./reducers/messageReducers";
import OrganizerReducer from "./reducers/OrganizerReducer";
import EventsResucer from "./reducers/EventsReducer";
import Contact_Us_reducer from "./reducers/Contact_Us_reducer";
import StaticReducer from "./reducers/StaticReducer";
import SUB_CATEGORY_REDUCER from "./reducers/SUB_CATEGORY_REDUCER";
import NotificationReducer from "./reducers/NotificationReducer";
import PaymentReducer from "./reducers/PaymentReducer";
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  category: CategoriesReducer,
  Contact: Contact_Us_reducer,
  event: EventsResucer,
  payment: PaymentReducer,
  Static: StaticReducer,
  subcategory: SUB_CATEGORY_REDUCER,
  city: CityReducer,
  auth: userReducer,
  Notification: NotificationReducer,
  UI: uiReducer,
  messages: messageReducer,
  Organizer: OrganizerReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
