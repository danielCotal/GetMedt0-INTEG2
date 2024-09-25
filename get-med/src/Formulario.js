import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Componente del Formulario
const Formulario = () => {
  const [inputNombre, cambiarInputNombre] = useState('');
  const [inputFecha, cambiarInputFecha] = useState('');
  const [inputEspecialidad, cambiarInputEspecialidad] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [inputDoctor, setInputDoctor] = useState('');
  const [doctoresDisabled, setDoctoresDisabled] = useState(true);
  const [inputMotivo, cambiarInputMotivo] = useState('');


  const navigate = useNavigate(); // Hook para navegar a otra página

  // Fetch de especialidades desde el backend
  useEffect(() => {
    fetch('http://localhost:3001/especialidad')
      .then((response) => response.json())
      .then((data) => {
        const especialidadesLista = data.map((especialidad) => especialidad.Nom_Espe);
        setEspecialidades(especialidadesLista);
      })
      .catch((error) => console.error('Error al obtener especialidades:', error));
  }, []);

  // Fetch de doctores basado en la especialidad seleccionada
  useEffect(() => {
    if (inputEspecialidad) {
      fetch(`http://localhost:3001/doctores?especialidad=${inputEspecialidad}`)
        .then((response) => response.json())
        .then((data) => {
          setDoctores(data);
          setDoctoresDisabled(false);
        })
        .catch((error) => console.error('Error al obtener doctores:', error));
    } else {
      setDoctoresDisabled(true);
      setDoctores([]);
    }
  }, [inputEspecialidad]);

  // Manejo del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!inputNombre || !inputFecha || !inputEspecialidad || !inputDoctor || !inputMotivo) {
      alert('Por favor, completa todos los campos.');
      return;
  }

    // Redirigir a la página de confirmación con los datos del formulario
    navigate('/confirmacion', {
      state: {
        nombre: inputNombre,
        fecha: inputFecha,
        especialidad: inputEspecialidad,
        doctor: inputDoctor,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div>
        <label htmlFor="nombre">¿Quién asistirá a la visita?</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          id="nombre"
          value={inputNombre}
          onChange={(e) => cambiarInputNombre(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="especialidad">Especialidad</label>
        <select
          id="especialidad"
          value={inputEspecialidad}
          onChange={(e) => cambiarInputEspecialidad(e.target.value)}
        >
          <option value="">Selecciona una especialidad</option>
          {especialidades.map((especialidad) => (
            <option key={especialidad} value={especialidad}>
              {especialidad}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="doctor">Doctor</label>
        <select
          id="doctor"
          value={inputDoctor}
          disabled={doctoresDisabled}
          onChange={(e) => setInputDoctor(e.target.value)}
        >
          <option value="">Selecciona un doctor</option>
          {doctores.map((doctor) => (
            <option key={doctor.Nom_medic} value={doctor.Nom_medic}>
              {doctor.Nom_medic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="fecha">Fecha y hora deseada</label>
        <input
          type="datetime-local"
          name="fecha"
          id="fecha"
          value={inputFecha}
          onChange={(e) => cambiarInputFecha(e.target.value)}
        />
      </div>

      <div>
                <label htmlFor="motivo">Motivo de la visita</label>
                <textarea
                    id="motivo"
                    value={inputMotivo}
                    onChange={(e) => cambiarInputMotivo(e.target.value)}
                    required
                ></textarea>
            </div>

      <button type="submit">Solicitar Hora Médica</button>
    </form>
  );
};

// Componente de Confirmación
const Confirmacion = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { nombre, fecha, especialidad, doctor} = location.state || {};

  const handleConfirmar = async () => {
    try {
      const response = await fetch('http://localhost:3001/reserva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID_User: 1,
          ID_Horario: 3, 
          FechaCreacion: new Date().toISOString(), // Fecha actual
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la reserva');
      }

      const result = await response.json();
      alert(`Reserva confirmada con ID: ${result.ID_Reserva}`);
      navigate('/'); // Redirige al formulario principal tras confirmar
    } catch (error) {
      console.error(error);
      alert('No se pudo confirmar la reserva. Inténtalo nuevamente.');
    }
  };

  const handleCancelar = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar la cita?')) {
      navigate('/'); // Redirige al formulario principal tras cancelar
    }
  };

  return (
    <div>
      <h2>Confirmación de Cita</h2>
      <p><strong>Nombre:</strong> {nombre}</p>
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Especialidad:</strong> {especialidad}</p>
      <p><strong>Doctor:</strong> {doctor}</p>
      <button onClick={handleConfirmar}>Confirmar y Enviar</button>
      <button onClick={handleCancelar} style={{ marginLeft: '10px' }}>Cancelar Cita</button>
    </div>
  );
};

// Configuración del Router
const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
      </Routes>
    </Router>
  );
};

export default MainApp;