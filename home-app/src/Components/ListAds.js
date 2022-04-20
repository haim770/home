import React from "react";
import Ad from "./Ad";
import "./ListAds.css";
class ListAds extends React.Component {
  constructor(props) {
    super(props);
  }
  makeListOfAds = () => {
    let code = "";
    console.log(this.props.adsArr[1][0]);
    code = this.props.adsArr.map((item) => (
      <Ad
        key={item[0]}
        id={item[0]}
        city={item[1]}
        street={item[2]}
        number={item[3]}
        price={item[4]}
        createTime={item[5]}
        adLink={item[6]}
      />
    ));

    return code;
  };
  render() {
    return <ul className={this.props.className}>{this.makeListOfAds()}</ul>;
  }
}
ListAds.defaultProps = {
  adsArr: [
    [1, "haifa", "hatichon", "1", 1000, "01/04/1111", "haim.co.il"],
    [2, "afula", "lidors street", "5", 101200, "01/04/2001", "lidor.co.il"],
  ],
};
export default ListAds;
