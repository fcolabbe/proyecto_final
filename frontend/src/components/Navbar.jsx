import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/navbar.css"

const Navbar = () => {

    const navigate = useNavigate()
    const {currentUser, logoutUser} = useAuth()

    const handleLogout = () => {
        logoutUser()
        navigate('/')
    }

    const setActiveClass = ({isActive}) => (isActive ? "active" : "notActive")

    const renderLinks = () => {
        return (
          <>
            <NavLink className={setActiveClass} to="/">
              🐾 Peluditos shop
            </NavLink>
            {currentUser && (
              <>
                <NavLink className={setActiveClass} to="/productos">
                  Productos
                </NavLink>
                <NavLink className={setActiveClass} to="/perfil">
                  Mi perfil
                </NavLink>
                <NavLink className={setActiveClass} to="/carrito">
                  Carrito
                </NavLink>
              </>
            )}
          </>
        );
    }
    const isLogin = () => {
        if(!currentUser){
            return (
            <>
                        <NavLink 
                            className={setActiveClass}
                            to="/login">
                                Iniciar sesión
                        </NavLink>
                        <NavLink 
                            className={setActiveClass}
                            to="/registrarse">
                            Registrarse
                        </NavLink>
            </>
            )
        }

        return (
           <>
                         <button
                            className="primary-button"
                            to="/carrito">
                            Ir a pagar
                        </button>
                        
                        <button 
                            className="secondary-button" 
                            onClick={handleLogout}
                            to='/'>
                                Cerrar sesión
                        </button>
                       
            </>      
        )
    }

    return (
        <div>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-links">
                        {renderLinks()}
                    </div>
                    <div>
                        {isLogin()}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar