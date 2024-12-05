import React from "react";
import { NavData } from "./NavBarApp.js";
import { withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  state = {
    Data: NavData,
  };

  handleHomeClick = () => {
    // Redireciona para o path "/home"
    this.props.history.push("/home");
  };

  handleArtistasClick = () => {
    // Redireciona para o path "/artistas"
    this.props.history.push("/artists");
  };

  handleInstrumentsClick = () => {
    // Redireciona para o path "/instruments"
    this.props.history.push("/instruments");
  };

  handleMusicClick = () => {
    // Redireciona para o path "/music"
    this.props.history.push("/music");
  };

  handleAlbumClick = () => {
    // Redireciona para o path "/albums"
    this.props.history.push("/albums");
  };

  render() {
    let response = this.state.Data.map((obj, index) => {
      return (
        <nav key={index}>
          <img src={obj.src} alt="" onClick={this.handleHomeClick} />
          <ul>
            <li onClick={this.handleArtistasClick}>{obj.li1}</li>
            <li onClick={this.handleAlbumClick}>{obj.li2}</li>
            <li onClick={this.handleInstrumentsClick}>{obj.li3}</li>
            <li onClick={this.handleMusicClick}>{obj.li4}</li>
          </ul>
          <div>
            <i className="far fa-user" onClick={this.handleHomeClick}></i> {/* Aqui podemos inserir um logout com o hover do mouse se sobrar tempo*/}
          </div>
        </nav>
      );
    });
    return <div className="nav">{response}</div>;
  }
}

// Usando withRouter para acessar o `history` no componente de classe
export default withRouter(NavBar);
