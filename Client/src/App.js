import "./App.css";
import React, { useState, useContext, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//components
import AppBar from "./components/AppBar";
import AllEvents from "./components/AllEvents";
import SearchPage from "./components/SearchPage";
import EventByTitle from "./components/EventByTitle";
import OrganiserInfo from "./components/OrganiserInfo";
import Detailsevt from "./components/Details";
import Footer from "./components/Footer";
import login from "./pages/login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/signup";
import contact from "./pages/contact";
import about from "./pages/about";
import Propos from "./pages/Propos";
import home from "./pages/home";
import ListCategories from "./pages/Categories/List";
import CategoriesItem from "./pages/Categories/CategoriesItem";
import ListSubCategories from "./pages/SubCategories/List";
import DetailsSubCategories from "./pages/SubCategories/Details";
import UpdateSubCategory from "./pages/SubCategories/UpdateSubCategory";
import SubCategories from "./pages/SubCategories/SubCategoryList";
import AddCategories from "./pages/Categories/Add";
import UpdateCategories from "./pages/Categories/Update";
import OrganizerList from "./pages/Organizer/List";
import ClientList from "./pages/Organizer/ClientList";
import ClientInfo from "./pages/Organizer/ClientInfo";
import ActiveEvents from "./pages/Events/Events";
import EquipeDetail from "./pages/Events/EquipeDetail";
import OrganizerDetail from "./pages/Events/OrganizerDetail";
import DetailsEvents from "./pages/Events/Event-details";
import RequestEvent from "./pages/Events/RequestEvent";
import ContactUs from "./pages/Events/ContactUs";
import OrganizerDash from "./pages/OrganizerDashboard";
import AdminDash from "./pages/AdminDash";
import Myevents from "./pages/OrganizerDashbord/Events/Myevents";
import Historique from "./pages/OrganizerDashbord/Events/Historique";
import EventsDetails from "./pages/OrganizerDashbord/Events/EventsDetails";
import DRAFT_EVENTS from "./pages/OrganizerDashbord/Events/DRAFT_EVENTS";
import PENDING_EVENTS from "./pages/OrganizerDashbord/Events/PENDING_EVENTS";
import Avis from "./pages/OrganizerDashbord/Avis/Avis";
import CommentDetails from "./pages/OrganizerDashbord/Avis/CommentDetails";
import AddEvents from "./pages/OrganizerDashbord/Events/AddEvent/AddEvents";
import CategoList from "./pages/OrganizerDashbord/Events/AddEvent/CategoList";
import Addons from "./pages/OrganizerDashbord/Addons";
import evnt from "./pages/OrganizerDashbord/Events/AddEvent/evnt";
import Eventss from "./pages/OrganizerDashbord/Events/AddEvent/Eventss";
import Class_Details from "./pages/OrganizerDashbord/Events/AddEvent/Class_Details";
import EquipeDetails from "./pages/OrganizerDashbord/Events/AddEvent/EquipeDetails";
import Sponsor_Details from "./pages/OrganizerDashbord/Events/AddEvent/Sponsor_Details";
import Event_Details from "./pages/OrganizerDashbord/Events/AddEvent/Event_Details";
import UpdateEvnt from "./pages/OrganizerDashbord/Events/UpdateEvents/MyeventUpdate";
import updateEquipes from "./pages/OrganizerDashbord/Events/UpdateEvents/updateEquipes";
import UpdateClasse from "./pages/OrganizerDashbord/Events/UpdateEvents/UpdateClasse";
import UpdateSponsors from "./pages/OrganizerDashbord/Events/UpdateEvents/UpdateSponsors";
import OrganizerProfile from "./pages/OrganizerDashbord/Account";
import AllNotifications from "./pages/OrganizerDashbord/AllNotifications";
import updateAccount from "./pages/OrganizerDashbord/updateAccount";
import UserHome from "./pages/home";
import Account from "./pages/compte";
import Invitations from "./pages/Organizer/Invitations";
import DataList from "./pages/Categories/DataList";
import InvitationInfo from "./pages/Organizer/InvitaionInfo";
import SignupCustomer from "./pages/SignupCustomer";
import AccountType from "./pages/AccountType";
import ClientHome from "./pages/ClientDashbord/Home";
import EventsList from "./pages/ClientDashbord/EventsList";
import Exmpl from "./pages/ClientDashbord/Exmpl";
import Evaluate from "./pages/ClientDashbord/Evaluate";
import EvaluationDetails from "./pages/ClientDashbord/EvaluationDetails";
import Check_Out from "./pages/ClientDashbord/Event/Check_Out";
import Billet from "./pages/ClientDashbord/Event/Billet";
import PaymentHistory from "./pages/ClientDashbord/PaymentHistory";
import EventsPrice from "./pages/ClientDashbord/EventsPrice";
import Event_Price from "./pages/ClientDashbord/Event_Price";
import Events_Category from "./pages/ClientDashbord/Events_Category";
import categoEvt from "./pages/ClientDashbord/categoevt";

import Details from "./pages/ClientDashbord/Event/Details";
import Profile from "./pages/ClientDashbord/Profile";
import UpdateProdileModal from "./pages/ClientDashbord/UpdateProdileModal";
import List from "./pages/ClientDashbord/Event/List";
import AccountSetting from "./pages/user_account_setting";
import OrganizerInfo from "./pages/Organizer/OrganizerInfo";
import apps_mailbox from "./pages/apps_mailbox";
import MessageDetails from "./pages/MessageDetails";
//util
import ScrollToTop from "./util/scrollToTop";
import { Provider } from "react-redux";
import error404 from "./pages/404";
import store from "./redux/store";
//axios
import axios from "./util/axios";
//jwt-decode
import jwtDecode from "jwt-decode";
//restrict routes
import { AuthRoute, OrganizerRoute, UserRoute, AdminRoute } from "./util/route";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutAction, getUserData } from "./redux/actions/authActions";
const token = localStorage.jwt;

if (token) {
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutAction());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
    console.log(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppBar />
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/AllEvents" component={AllEvents} />
          <AuthRoute exact path="/login" component={login} />
          <AuthRoute exact path="/forgot_password" component={ForgotPassword} />
          <Route path="/reset/:token" component={ResetPassword} />
          <AuthRoute exact path="/SignUpOrg" component={SignUp} />
          <AuthRoute exact path="/SignupCustomer" component={SignupCustomer} />
          <AuthRoute exact path="/AccountType" component={AccountType} />
          <UserRoute exact path="/UserHome" component={UserHome} />
          <UserRoute exact path="/ClientHome" component={ClientHome} />
          <UserRoute exact path="/Exmpl" component={Exmpl} />
          <UserRoute exact path="/Evaluate" component={Evaluate} />
          <UserRoute
            exact
            path="/EvaluationDetails"
            component={EvaluationDetails}
          />
          <UserRoute exact path="/EventList" component={List} />
          <UserRoute exact path="/Check_Out" component={Check_Out} />
          <UserRoute exact path="/Billet" component={Billet} />
          <UserRoute exact path="/PaymentHistory" component={PaymentHistory} />
          <Route exact path="/EventsPrice" component={EventsPrice} />
          <UserRoute exact path="/Event_Price" component={Event_Price} />
          <UserRoute
            exact
            path="/Events_Category"
            component={Events_Category}
          />
          <UserRoute exact path="/categoEvt" component={categoEvt} />
          <UserRoute exact path="/EventsList" component={EventsList} />
          <UserRoute exact path="/Details" component={Details} />
          <UserRoute exact path="/Profile" component={Profile} />
          <UserRoute exact path="/UpdateUser" component={UpdateProdileModal} />
          <OrganizerRoute exact path="/organiser" component={OrganizerDash} />
          <OrganizerRoute exact path="/AddEvents" component={AddEvents} />
          <OrganizerRoute exact path="/evnt" component={evnt} />
          <OrganizerRoute exact path="/Eventss" component={Eventss} />
          <OrganizerRoute
            exact
            path="/Class_Details"
            component={Class_Details}
          />
          <OrganizerRoute
            exact
            path="/EquipeDetails"
            component={EquipeDetails}
          />
          <OrganizerRoute
            exact
            path="/Sponsor_Details"
            component={Sponsor_Details}
          />
          <OrganizerRoute
            exact
            path="/Event_Details"
            component={Event_Details}
          />
          <OrganizerRoute exact path="/UpdateEvnt/:id" component={UpdateEvnt} />
          <OrganizerRoute
            exact
            path="/updateEquipes/:id/:FirstName/:Lastname/:JobName/:Photo/:Description"
            component={updateEquipes}
          />
          <OrganizerRoute
            exact
            path="/UpdateClasse/:id/:ClassName/:Price"
            component={UpdateClasse}
          />
          <OrganizerRoute
            exact
            path="/UpdateSponsors/:id/:Name/:Logo/:Type"
            component={UpdateSponsors}
          />
          <OrganizerRoute exact path="/Avis" component={Avis} />
          <OrganizerRoute
            exact
            path="/CommentDetails"
            component={CommentDetails}
          />
          <OrganizerRoute exact path="/Addons" component={Addons} />
          <OrganizerRoute exact path="/Myevents" component={Myevents} />
          <OrganizerRoute exact path="/Historique" component={Historique} />
          <OrganizerRoute exact path="/EventByTitle" component={EventByTitle} />
          <OrganizerRoute
            exact
            path="/EventsDetails"
            component={EventsDetails}
          />
          <AdminRoute exact path="/CategoList" component={CategoList} />
          <OrganizerRoute
            exact
            path="/OrganizerProfile"
            component={OrganizerProfile}
          />
          <OrganizerRoute
            exact
            path="/updateAccount"
            component={updateAccount}
          />
          <OrganizerRoute
            exact
            path="/AllNotifications"
            component={AllNotifications}
          />
          <OrganizerRoute exact path="/DRAFT_EVENTS" component={DRAFT_EVENTS} />
          <OrganizerRoute
            exact
            path="/PENDING_EVENTS"
            component={PENDING_EVENTS}
          />
          <Route exact path="/Category/add" component={AddCategories} />
          <Route exact path="/CategoriesItem" component={CategoriesItem} />
          <AdminRoute exact path="/OrganizerList" component={OrganizerList} />
          <AdminRoute exact path="/ClientList" component={ClientList} />
          <AdminRoute exact path="/ClientInfo" component={ClientInfo} />
          <AdminRoute exact path="/RequestEvent" component={RequestEvent} />
          <AdminRoute exact path="/ContactUs" component={ContactUs} />
          <AdminRoute exact path="/EquipeDetail" component={EquipeDetail} />
          <AdminRoute
            exact
            path="/OrganizerDetail"
            component={OrganizerDetail}
          />
          <AdminRoute exact path="/OrganizerInfo" component={OrganizerInfo} />
          <AdminRoute exact path="/SearchPage" component={SearchPage} />
          <AdminRoute
            exact
            path="/DataList/:id/:name/:filename"
            component={DataList}
          />
          <AdminRoute
            exact
            path="/Update/:id/:name/:Descriptions/:filename"
            component={UpdateSubCategory}
          />
          <AdminRoute
            exact
            path="/DetailsSubCategories"
            component={DetailsSubCategories}
          />
          <AdminRoute exact path="/Invitations" component={Invitations} />
          <AdminRoute exact path="/InvitationInfo" component={InvitationInfo} />
          <Route exact path="/categories" component={ListCategories} />
          <AdminRoute
            exact
            path="/ListSubCategories"
            component={ListSubCategories}
          />
          <AdminRoute exact path="/SubCategories" component={SubCategories} />
          <AdminRoute exact path="/Account" component={Account} />
          <Route exact path="/ActiveEvents" component={ActiveEvents} />
          <Route exact path="/contact" component={contact} />
          <Route exact path="/about" component={about} />
          <Route exact path="/Propos" component={Propos} />
          <AdminRoute exact path="/AccountSetting" component={AccountSetting} />
          <AdminRoute exact path="/apps_mailbox" component={apps_mailbox} />
          <AdminRoute exact path="/MessageDetails" component={MessageDetails} />
          <AdminRoute
            exact
            path="/Categoryupdate"
            component={UpdateCategories}
          />
          <AdminRoute exact path="/DetailsEvents" component={DetailsEvents} />
          <AdminRoute exact path="/admin" component={AdminDash} />
          <Route exact path="/OrganiserInfo" component={OrganiserInfo} />
          <Route exact path="/Detailsevt" component={Detailsevt} />
          <Route component={error404} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
