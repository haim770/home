import React from "react";
import Button from "./Button";
class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav>
        <Button
          content="go to all ads"
          onClick={this.props.changeListAdsVisibility}
        />
      </nav>
    );
  }
}
export default Nav;
