import React from "react";

import "../styles/blogList.css";
class BlogList extends React.Component {
  constructor(props) {
    super(props);
    console.log("in blogs");
  }
  // makeListOfBlogs = () => {
  //   console.log(this.props.VisibleListAds);
  //   let code = "";
  //   code = this.props.adsArr.map((item) => (
  //     <Ad
  //       key={item[0]}
  //       id={item[0]}
  //       city={item[1]}
  //       street={item[2]}
  //       number={item[3]}
  //       price={item[4]}
  //       createTime={item[5]}
  //       adLink={item[6]}
  //     />
  //   ));

  //   return code;
  // };
  render() {
    return (
      <ul className={this.props.className}>
        {this.props.blogArr[0][0]} fsfsssf
      </ul>
    );
  }
}
BlogList.defaultProps = {
  blogArr: [
    [1, "blog name1", "autor1", "01/04/1111", "content1"],
    [2, "afula", "lidors street", "5", 101200, "01/04/2001", "lidor.co.il"],
  ],
  className: "visibleList",
};
export default BlogList;
