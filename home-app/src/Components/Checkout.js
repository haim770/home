import PaypalCheckoutButton from "./PaypalCheckoutButton";

const Checkout = (props) => {
  //the product is the pack
  const product = {
    description: props.title,
    price: props.price,
    packId: props.packId,
    adValue:props.adValue,
  };

  return (
    <div>
      <div className="paypal-button-container">
        <PaypalCheckoutButton product={product} />
      </div>
    </div>
  );
};

export default Checkout;
