import React from "react";
import Button from "./Button";
import Address from "./Address";
import "./Ad.css";
class Ad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="ad" id={this.props.id}>
        <h2>{this.props.id} {this.props.sellerName}</h2>
        <ul>
          <li>price is {this.props.price}</li>
          <li>create time is {this.props.createTime}</li>
          <li>ad link is {this.props.adLink}</li>
          <Address
            street={this.props.street}
            city={this.props.city}
            number={this.props.number}
          />
          <li>rooms are {this.props.rooms}</li>
        </ul>
        <p>
          <Button content="contact seller" />
        </p>
      </section>
    );
  }
}
Ad.defaultProps = {
  sellerName:"seller",
  price: "0",
  createTime: "00/00/00",
  adLink: "null",
  city: "haif",
  street: "ha",
  number: "45",
  rooms: "3",
};
export default Ad;
