import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Calendario({ onDateChange }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());

    // Función para manejar el cambio de fecha
    function handleDateChange(date) {
        setSelectedDate(date);
        onDateChange({ date, time: selectedTime });
    }

    // Función para manejar el cambio de hora
    function handleTimeChange(time) {
        setSelectedTime(time);
        onDateChange({ date: selectedDate, time });
    }

    return (
        <div>
        <h2>Selecciona una fecha</h2>
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            placeholderText="Selecciona una fecha"
            locale="es"
        />
        
        <h2>Selecciona una hora</h2>
        <DatePicker
            selected={selectedTime}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="h:mm aa"
            placeholderText="Selecciona una hora"
            locale="es"
        />

        <p>
            Fecha seleccionada: {selectedDate ? selectedDate.toLocaleDateString() : 'Ninguna'} <br />
            Hora seleccionada: {selectedTime ? selectedTime.toLocaleTimeString() : 'Ninguna'}
        </p>
        <button className='btn-uno'>Guardar Fecha y Hora</button>
        </div>
    );
}

export default Calendario;