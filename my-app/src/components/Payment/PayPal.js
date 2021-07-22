import React from "react";
import "./PayPal.css";
import { useRef, useEffect } from "react";
export function PayPal({ totalPrice }) {
  console.log(totalPrice);
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "MyFeline Checkout",
                amount: {
                  currency_code: "INR",
                  value: totalPrice,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return <div className="paypal-div" ref={paypal}></div>;
}
