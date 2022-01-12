import React, { Component } from "react";
import { Navbar} from "reactstrap";

class Header extends Component {
  render() {
    return (
      <Navbar>
        <div className="container-fluid">
          <h3 className="mx-auto">Notes</h3>
        </div>
      </Navbar>
    )
  }
}
export default Header;
