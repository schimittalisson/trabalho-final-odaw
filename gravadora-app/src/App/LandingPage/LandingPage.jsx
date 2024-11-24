import React from "react";
import { LandingPageData } from "./LandingPage.js";

export default class LandingPage extends React.Component {
  state = {
    Data: LandingPageData,
  };

  render() {
    let response = this.state.Data.map((obj, index) => {
      return (
        <div className="landing-page-text" key={index}>
          <h1>
            {obj.h1} <br /> {obj.h2}
          </h1>
          <p>
          Na NossaBossa, somos apaixonados por música e dedicados a apoiar talentos <br/>
          musicais em cada etapa de sua jornada. Explore nossa plataforma e descubra <br/>
          um novo nível de controle e criatividade para a sua carreira musical!
          </p>
          <button className="g-btn"> {obj.BtnText} </button>
        </div>
      );
    });
    return <section> {response} </section>;
  }
}
