import React from "react";
import { NavData } from "./NavBar.js";
import { withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  state = {
    Data: NavData,
  };

  handleLoginClick = () => {
    // Redireciona para o path "/login"
    this.props.history.push("/login");
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
          </ul>
          <div>
            <i className="far fa-user" onClick={this.handleLoginClick}></i>
          </div>
        </nav>
      );
    });
    return <div className="nav">{response}</div>;
  }
}

// Usando withRouter para acessar o `history` no componente de classe
export default withRouter(NavBar);
