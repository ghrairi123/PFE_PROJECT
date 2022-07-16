import React, { useState } from "react";
import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { CreatePayment } from "../../../redux/actions/PaymentAction";
import { saveAs } from "file-saver";
import axios from "../../../util/axios";
function Stripe({
  total,
  cartItem,
  Name,
  LastName,
  date,
  ClassName,
  Title,
  city,
  StartTime,
  Location,
  idClasse,
  Nombre,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const currentUser = localStorage.getItem("idConnected");
  const organizer = localStorage.getItem("organizer");
  const PlaceNumber = 1;
  const image = "assets/images/logo/logo.png";
  const [postSubmitted, setpostSubmitted] = useState(false);
  const [src, setsrc] = useState("");
  const tokenHandler = (token) => {
    //  alert(ticketNumber);
    // alert(organizer);

    const subTotal = total;
    axios
      .post(`/api/Payment/${cartItem}`, {
        token,
        subTotal,
        currentUser,
        cartItem,
        organizer,
      })
      .then((res) => {
        axios.post(`/api/Event_user/${idClasse}/${Nombre}`).then((res) => {
          console.log(res);
          axios
            .post("/api/QrCode", {
              Name,
              Title,
              LastName,
              date,
              Location,
            })
            .then((res) => {
              if (res.status == 200) {
                setsrc(res.data);
                //  alert(res.data);
              }
            });
        });
        axios
          .post("/api/create-pdf", {
            Name,
            src,
            Title,
            StartTime,
            city,
            LastName,
            date,
            ClassName,
            Location,
          })
          .then(() => axios.get("/api/fetch-pdf", { responseType: "blob" }))
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });

            saveAs(pdfBlob, `${Name}_Ticket.pdf`);
          });
        console.log(token);
      })
      .catch((err) => {
        alert(err);
      });

    // dispatch(CreatePayment({ token, total, userid, cartItem, organizer }));
  };

  return (
    <div>
      <StripeCheckout
        amount={total * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51K2sQqKrdFLQBQmgn0REwpbaUsvj2JpMC9EKgPMfPwrT9SN2SfE5QZHaN8VwbVLtE4MetPIdpZnpEiRPs1FMw53f00rvCClTIc"
        currency="EUR"
      >
        <Button> Acheter Maintenant</Button>
      </StripeCheckout>
      <br />
      <br />
      <img src={src} />
    </div>
  );
}

export default Stripe;
