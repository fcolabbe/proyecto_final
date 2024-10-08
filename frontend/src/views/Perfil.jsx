import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import usuariosData from "../data/usuarios.json";
import perfilImg from "../assets/perfil.png"; 

const Perfil = () => {

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    email: "",
    fecha_registro: "",
  });


  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        // Verifica si currentUser tiene el token
        const token = currentUser.token;
        if (!token) {
          // Si no hay token, redirige al login
          navigate("/login");
          return;
        }
        try {
          
          setUserData(currentUser);
        } catch (error) {
          console.error('Error al validar el token:', error);
          navigate("/login");
        }
      } else {
        // Si currentUser es null, redirige al login
        navigate("/login");
      }
    };

    fetchUserData();
  }, [currentUser, navigate]);


  // Manejar la edición de los campos de usuario
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5">
        
      <div className="row">
        <div className="col-md-4">
          <img src={perfilImg} alt="Perfil" className="img-fluid rounded-circle mb-4" />
        </div>
        <div className="col-md-8">
          <h2>Hola {userData.nombre}! Bienvenido a Peluditos Shop</h2>
          <form>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                value={userData.apellido}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={userData.direccion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={userData.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Fecha de Registro</label>
              <input
                type="text"
                className="form-control"
                name="fecha_registro"
                value={userData.fecha_registro}
                readOnly
              />
            </div>
          </form>
          <div className="mt-4">
            <button className="btn btn-warning me-3" onClick={() => navigate("/mis-productos")}>
              Mis productos
            </button>
            <button className="btn btn-warning me-3" onClick={() => navigate("/favoritos")}>
              Mis favoritos
            </button>
            <button className="btn btn-warning" onClick={() => navigate("/productos")}>
              Ver tienda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
