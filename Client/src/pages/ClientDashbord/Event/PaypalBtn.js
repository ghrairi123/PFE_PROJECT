import React from "react";
import { useEffect, useRef } from "react";
function PaypalBtn({ MontantTotal }) {
  const refPaypalBtn = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "30",
                },
              },
            ],
          });
        },
      })
      .render(refPaypalBtn.current);
  }, []);
  return <div ref={refPaypalBtn}></div>;
}

export default PaypalBtn;
