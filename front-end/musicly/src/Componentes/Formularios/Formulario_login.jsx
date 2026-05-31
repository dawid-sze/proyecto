import React, { Fragment, useState, useContext } from "react";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
import logo from '../../assets/imagenes/musicly-logo.png';
import { Link } from "react-router-dom";
import './formularios.css';

const FormularioLogin = () => {
    const usuarioInicial = { email: "", password: "" };
    const [usuario, setUsuario] = useState(usuarioInicial);
    const { iniciarSesion } = useContext(AuthContext);

    const actualizarDato = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    return (
        <Fragment>
            <section className="login-page">
                <div className="form-card login-card">

                    <div className="login-logo">
                        <img src={logo} alt="Musicly" />
                    </div>

                    <h2>Bienvenido</h2>
                    <p className="login-subtitle">Inicia sesión en tu cuenta</p>

                    <form>
                        <div className="form-row">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="tu@email.com"
                                value={usuario.email}
                                onChange={actualizarDato}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={usuario.password}
                                onChange={actualizarDato}
                                required
                            />
                        </div>

                        <input
                            type="button"
                            value="Iniciar sesión"
                            style={{ width: "100%", marginTop: "0.5rem" }}
                            onClick={() => iniciarSesion(usuario)}
                        />

                        <p className="login-registro">
                            ¿No tienes cuenta?{" "}
                            <Link to="/registro">Regístrate</Link>
                        </p>
                    </form>
                </div>
            </section>
        </Fragment>
    );
};

export { FormularioLogin };
