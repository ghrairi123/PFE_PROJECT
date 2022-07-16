import { SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE } from "../messageConstant";
import axios from "../../util/axios";
import {
  LOADING_DATA,
  PAYMENT_REQUEST,
  PAYMENT_FAILURE,
  PAYMENT_SUCCESS,
} from "../types";

export const CreatePayment =
  (token, subTotal, currentUser, cartItem, organizer) => async (dispatch) => {
    try {
      dispatch({ type: PAYMENT_REQUEST });
      axios
        .post(`/api/Payment`, {
          token,
          subTotal,
          currentUser,
          cartItem,
          organizer,
        })
        .then((res) => {
          dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: res.data.successMessage,
          });
          dispatch({
            type: PAYMENT_SUCCESS,
          });
          console.log(res);
          //alert("Succès ! catégorie ajoutée avec succès");
          //this.props.history.push("/Account")
          /*      history.push({ pathname: "/categories" });
            window.location.reload(); */
        });
    } catch (err) {
      dispatch({
        type: PAYMENT_FAILURE,
      });
      console.log(err);
    }
  };
