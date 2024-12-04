import React from "react";
import "./Register.css";
import axios from "axios";

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            cpf: "",
            email: "",
            pass: "",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { user, cpf, email, pass } = this.state;

        axios
            .post("http://localhost:3001/register", { user, cpf, email, pass })
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                console.error("Erro ao registrar usuário:", error);
                alert("Erro ao registrar o usuário.");
            });
    };

    render() {
        return (
            <form id="registerForm" method="POST" className="sign-up-htm center" onSubmit={this.handleSubmit}>
                <div>
                    <div className="group">
                        <label htmlFor="user" className="label">Nome de Usuário<br /></label>
                        <input id="user" name="user" type="text" className="input" onChange={this.handleChange} />
                    </div>
                    <div className="group">
                        <label htmlFor="cpf" className="label">CPF<br /></label>
                        <input id="cpf" name="cpf" type="text" className="input" onChange={this.handleChange} />
                    </div>
                    <div className="group">
                        <label htmlFor="email" className="label">Email<br /></label>
                        <input id="email" name="email" type="email" className="input" onChange={this.handleChange} />
                    </div>
                    <div className="group">
                        <label htmlFor="pass" className="label">Senha<br /></label>
                        <input id="pass" name="pass" type="password" className="input" onChange={this.handleChange} />
                    </div>
                    <div className="group">
                        <button type="submit">Registrar</button>
                    </div>
                    <div className="hr"></div>
                    <div className="foot-lnk">Já tem conta?
                        <a href="../login">Entre agora</a>
                    </div>
                </div>
            </form>
        );
    }
}
