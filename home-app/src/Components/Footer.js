import React from "react";
import Button from "./Button";
class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <Button content="haim" />
      </footer>
    );
  }
}
export default Footer;
