import { PayPalButtons } from "@paypal/react-paypal-js";
import { React, useState } from "react";
import instance from "../api/AxiosInstance";
import useAuth from "../Auth/useAuth";
const PaypalCheckoutButton = (props) => {
  const { product } = props; //must be named product for the api
  const { auth } = useAuth();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(false);
  const handleApprove = async (orderId) => {
    // Call backend function to fulfill order
    const result = await instance.request({
      data: {
        data_type: "buyPack",
        params: {
          package_id: product.packId,
          price: product.price,
          adValue: product.adValue,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result);
    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // setError("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    alert("Thank you for your purchase!");
  }
  if (error) {
    alert("error");
  }
  return (
    <PayPalButtons
      style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill",
      }}
      createOrder={(data, actions) => {
        //react paypal default for access after click on the pay button
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              amount: {
                value: product.price,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        //react paypal default for access after click on the pay has been done
        const order = await actions.order.capture();
        console.log("order", order);
        handleApprove(data.orderID);
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}
      onCancel={() => {
        // Display cancel message, modal or redirect user to cancel page or back to cart
      }}
    />
  );
};
export default PaypalCheckoutButton;
