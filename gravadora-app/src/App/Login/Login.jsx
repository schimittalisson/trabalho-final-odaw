import React from "react";
import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            pass: "",
            isAuthenticated: false,
            errorMessage: "",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { user, pass } = this.state;

        axios
            .post("http://localhost:3001/login", { user, pass })
            .then((response) => {
                if (response.data.success) {
                    // Usuário autenticado com sucesso
                    this.setState({ isAuthenticated: true });
                } else {
                    // Caso contrário, mostre mensagem de erro
                    this.setState({ errorMessage: "Usuário ou senha inválidos" });
                }
            })
            .catch((error) => {
                console.error("Erro ao tentar fazer login:", error);
                this.setState({ errorMessage: "Erro ao tentar fazer login" });
            });
    };

    render() {
        const { isAuthenticated, errorMessage } = this.state;

        if (isAuthenticated) {
            // Redireciona para a página /home
            return <Redirect to="/home" />;
        }

        return (
            <div className="login-form">
                <div className="sign-in-htm">
                    <form onSubmit={this.handleSubmit}>
                        <div className="group">
                            <label htmlFor="user" className="label">Nome de Usuário<br /></label>
                            <input
                                id="user"
                                name="user"
                                type="text"
                                className="input"
                                onChange={this.handleChange}
                                value={this.state.user}
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Senha<br /></label>
                            <input
                                id="pass"
                                name="pass"
                                type="password"
                                className="input"
                                onChange={this.handleChange}
                                value={this.state.pass}
                            />
                        </div>
                        <div className="group">
                            <input id="check" type="checkbox" className="check" checked />
                            <label htmlFor="check"><span className="icon"></span> Mantenha-me conectado</label>
                        </div>
                        <div className="group">
                            <input type="submit" className="button" value="Entrar" />
                        </div>
                    </form>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="hr"></div>
                    <div className="foot-lnk">
                        <a href="#forgot">Forgot Password?</a>
                    </div>
                    <div className="foot-lnk">Não tem conta?
                        <a href="../register">Registrar</a>
                    </div>
                </div>
            </div>
        );
    }
}
