import React from "react";
import { NavData } from "./NavBar.js";

export default class NavBar extends React.Component {
  handleUserClick = () => {
    this.props.history.push("/Login");  // Usando this.props.history.push para navegação
  };

  state = {
    Data: NavData,
  };

  render() {
    let response = this.state.Data.map((obj, index) => {
      return (
        <nav key={index}>
          <img src={obj.src} alt="" />
          <ul>
            <li>{obj.li1}</li>
            <li>{obj.li2}</li>
            <li>{obj.li3}</li>
            <li>{obj.li4}</li>
            <li>{obj.li5}</li>
            <li>{obj.li6}</li>
          </ul>
          <div>
            <i className="fas fa-search"></i>
            <i
              className="far fa-user"
              onClick={this.handleUserClick}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </nav>
      );
    });
    return <div className="nav">{response}</div>;
  }
}
