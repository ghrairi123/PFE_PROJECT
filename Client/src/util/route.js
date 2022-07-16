import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export const OrganizerRoute = ({ component: Component, ...rest }) => {
  const {
    authenticated,
    account: { role },
  } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true && role === "admin" ? (
          <Redirect to="/admin" />
        ) : authenticated === true && role === "client" ? (
          <Redirect to="/UserHome" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export const AdminRoute = ({ component: Component, ...rest }) => {
  const {
    authenticated,
    account: { role },
  } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true && role === "organisateur" ? (
          <Redirect to="/organiser" />
        ) : authenticated === true && role === "client" ? (
          <Redirect to="/ClientHome" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export const UserRoute = ({ component: Component, ...rest }) => {
  const {
    authenticated,
    account: { role },
  } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true && role === "organisateur" ? (
          <Redirect to="/organiser" />
        ) : authenticated === true && role === "admin" ? (
          <Redirect to="/admin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
