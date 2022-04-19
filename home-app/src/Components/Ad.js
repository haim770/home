import React from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import "./Ad.css";
class Ad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="ad" id={this.props.id}>
        <h2>
          {this.props.id} {this.props.sellerName}
        </h2>
        <ul>
          <Parameter paramName="price" paramValue={this.props.price} />
          <Parameter
            paramName="create time"
            paramValue={this.props.createTime}
          />
          <Parameter paramName="ad link" paramValue={this.props.adLink} />
          <Parameter paramName="rooms" paramValue={this.props.rooms} />
          <Parameter />
          <Address
            street={this.props.street}
            city={this.props.city}
            number={this.props.number}
          />
        </ul>
        <p>
          <Button content="contact seller" />
        </p>
      </section>
    );
  }
}
Ad.defaultProps = {
  sellerName: "seller",
  price: "0",
  createTime: "00/00/00",
  adLink: "null",
  city: "haif",
  street: "ha",
  number: "45",
  rooms: "3",
};
export default Ad;
