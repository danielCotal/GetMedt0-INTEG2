import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


function Calendario({ onDateChange }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const API_KEY = 'fpIYTu6oCnpG3j7zd6gsmOq6Xg6ZADh1';
    const [holidays, setHolidays] = useState([]);

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

    // Función para obtener días festivos desde la API
    useEffect(() => {
        async function fetchHolidays() {
            try {
                const response = await axios.get(`https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=CL&year=2024`);
                const holidaysData = response.data.response.holidays.map(holiday => new Date(holiday.date.iso)); 
                setHolidays(holidaysData);
                console.log("Días festivos en Chile:", holidaysData); 
            } catch (error) {
                console.error("Error al obtener los días festivos:", error);
            }
        }
        fetchHolidays();
    }, [API_KEY]);

    // Función para desactivar los días festivos en el calendario
    function isHoliday(date) {
        return holidays.some(holiday => holiday.toDateString() === date.toDateString());
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
            filterDate={(date) => !isHoliday(date)}
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