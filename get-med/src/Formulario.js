import React, {useState, useEffect} from 'react';

const Formulario = () => {
	const [inputNombre, cambiarInputNombre] = useState('');
	const [inputFecha, cambiarInputFecha] = useState('');
	const [inputHora, cambiarInputHora] = useState('');
	const [inputMensaje, cambiarInputMensaje] = useState('');
	const [inputEspecialidad, cambiarInputEspecialidad] = useState('');
	const [especialidades, setEspecialidades] = useState([]);
	const [doctores, setDoctores] = useState([]);
	const [inputDoctor, setInputDoctor] = useState('');
	const [doctoresDisabled, setDoctoresDisabled] = useState(true);

	useEffect(() => {
		fetch('http://localhost:3001/especialidad') 
		  .then((response) => response.json())
		  .then((data) => {
			// Extraer el nombre de la especialidad de cada objeto
			const especialidadesLista = data.map((especialidad) => especialidad.Nom_Espe);
			setEspecialidades(especialidadesLista);
		  })
		  .catch((error) => console.error('Error al obtener especialidades:', error));
	  }, []);

	  useEffect(() => {
		if (inputEspecialidad) {
			fetch(`http://localhost:3001/doctores?especialidad=${inputEspecialidad}`)
			  .then((response) => response.json())
			  .then((data) => {
				setDoctores(data);
				setDoctoresDisabled(false); // Desbloquea el select de doctores
			  })
			  .catch((error) => console.error('Error al obtener doctores:', error));
		} else {
			setDoctoresDisabled(true); // Bloquea si no hay especialidad seleccionada
			setDoctores([]);
		}
	}, [inputEspecialidad]);


	// validar y enviar formulario
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Formulario Enviado!');
	}

	// cambiar el estado del inputNombre
	const handleInputNombre = (e) => {
		cambiarInputNombre(e.target.value);
	}
	
	const handleInputEspecialidad = (e) => {
		cambiarInputEspecialidad(e.target.value);
	}

	const handleInputFecha = (e) => {
        const selectedDate = new Date(e.target.value);
        const dayOfWeek = selectedDate.getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado

        if (dayOfWeek === 5 || dayOfWeek === 6) {
            alert('Por favor, selecciona un día de lunes a viernes.');
        } else {
            cambiarInputFecha(e.target.value);
        }
	}

	const handleInputHora = (e) => {
		cambiarInputHora(e.target.value);
	}

	const handleInputMensaje = (e) => {
		cambiarInputMensaje(e.target.value);
	}

	const handleCancelarCita = () => {
		alert('La cita ha sido cancelada.');
	}

	return (
		<>
			<form action="" onSubmit={handleSubmit} className="formulario">
				<div>
					<label htmlFor="nombre">¿Quién asistirá a la visita?</label>
					<input
						type="text"
						name="nombre"
						placeholder="Nombre"
						id="nombre"
						value={inputNombre}
						onChange={handleInputNombre}
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
				    <label htmlFor="fecha">Fecha Deseada</label>
					<input
						type="date"
						name="fecha"
						id="fecha"
						value={inputFecha}
						onChange={handleInputFecha}
					/>
				</div>

				<div>
				    <label htmlFor="hora">Hora Deseada (9 am - 17:30 pm) </label>
					<input
						type="time"
						name="hora"
						step="1800"
						min="09:00"
						max="17:30"
						id="hora"
						value={inputHora}
						onChange={handleInputHora}
					/>
				</div>

				<div>
				    <label htmlFor="mensaje">Razón o motivo de la visita </label>
					<textarea
						type="text"
						name="mensaje"
						id="mensaje"
						className='input-grande'
						maxLength={500}
						value={inputMensaje}
						onChange={handleInputMensaje}
					/>
				</div>

				<button type="submit">Solicitar Hora Médica</button>
				<button
					type="button"
					onClick={handleCancelarCita}
					className="btn-cancelar"
				>
					Cancelar Cita
				</button>
			</form>
		</>
	);
}
 
export default Formulario;