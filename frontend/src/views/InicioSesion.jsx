import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import '../styles/registrarse_iniciar_sesion.css'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const initialForm = { email: '', password: '' }

const InicioSesion = () => {
    const { loginUser } = useAuth()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(initialForm)

    const handleChange = (event) => setCredentials({ ...credentials, [event.target.name]: event.target.value })

    const handleSubmit = async (event) => {
        event.preventDefault()
    
        if (!credentials.email.trim() || !credentials.password.trim()) {
          return alert('Email y contraseña son obligatorios.')
        }
    
        if (!emailRegex.test(credentials.email)) {
          return alert('El formato del email no es correcto!')
        }

        const { success, message } = await loginUser(credentials.email, credentials.password);
        alert(message);

        if (success) {
          navigate('/productos');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
          <h3>Iniciar Sesión</h3>
          <div>
            <input
              value={credentials.email}
              onChange={handleChange}
              type='email'
              name='email'
              className='form-input'
              placeholder='Enter email'
            />
          </div>
          <div>
            <input
              value={credentials.password}
              onChange={handleChange}
              type='password'
              name='password'
              className='form-input'
              placeholder='Password'
            />
          </div>
          <button type='submit' className='form-button'>Iniciar Sesión</button>
        </form>
    )    
}

export default InicioSesion