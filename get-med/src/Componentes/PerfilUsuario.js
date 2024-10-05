import React from 'react';
import './PerfilUsuario.css'; 


function PerfilUsuario({ onBack }) {
    const usuario = {
        nombre: "José Calfiman",
        rut: "12345678-9",
        hora: "20-10-2024",
        doctor: "Juan Lopez",
    };

    return (
        <div className="perfil-page">
            <header className="perfil-header">
                <h1>Perfil de {usuario.nombre}</h1>
                <button onClick={onBack} className="btn-uno">Volver</button> 
            </header>
            
            <main className="perfil-main">
                <section className="perfil-info">
                    <h2>Información de Usuario</h2>
                    <p><strong>Nombre:</strong> {usuario.nombre}</p>
                    <p><strong>RUT:</strong> {usuario.rut}</p>
                </section>

                <button className="btn-uno">Editar Perfil</button> 
                <section className="perfil-info">
                    <h2>Información de Citas</h2>
                    <p><strong>Hora:</strong> {usuario.hora}</p>
                    <p><strong>Doctor:</strong> {usuario.doctor}</p>
                </section>

                <button className="btn-uno">Cancelar hora</button> 
            </main>
        </div>
    );
}

export default PerfilUsuario;
