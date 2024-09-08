import React from 'react';
import { useState } from 'react'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css'
import logo from './logo.svg';
import './App.css';

function App() {
  const [date, setDate]= useState(new Date());
  const handleDateChange= (newDate) => {
    setDate(newDate);
    console.log('Fecha escogida:', newDate);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Libreria de calendario adecuada "React Calendar"</h1>
        <Calendar onChange={handleDateChange} value={date}/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
