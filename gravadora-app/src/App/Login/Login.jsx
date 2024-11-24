import React from "react";
import { LoginData } from "./Login.js";
import "./Login.css";

export default class Login extends React.Component {
  state = {
    Data: LoginData,
  };

  render() {
    let formFields = this.state.Data.map((field, index) => {
      if (field.type === "checkbox") {
        return (
          <div className="group" key={index}>
            <input
              id={field.id}
              type={field.type}
              className="check"
              defaultChecked={field.checked}
            />
            <label htmlFor={field.id}>
              <span className="icon"></span> {field.label}
            </label>
          </div>
        );
      } else {
        return (
          <div className="group" key={index}>
            <label htmlFor={field.id} className="label">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              className="input"
              placeholder={field.placeholder}
            />
          </div>
        );
      }
    });

    return (
      <div className="login-form">
        <div className="sign-in-htm">
          {formFields}
          <div className="group">
            <input type="submit" className="button" value="Entrar" />
          </div>
          <div className="hr"></div>
          <div className="foot-lnk">
            <a href="#forgot">Forgot Password?</a>
          </div>
          <div className="foot-lnk">
            Não tem conta? <a href="../register/index.html">Registrar</a>
          </div>
        </div>
      </div>
    );
  }
}
