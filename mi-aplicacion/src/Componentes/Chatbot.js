import React, { useState, useEffect, useContext } from 'react';
import './Chatbot.css';
import responses from './responses';
import { UserContext } from './UserContext';
import { useTheme } from '@mui/material/styles';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  // Cargar preguntas disponibles cuando el chatbot está abierto
  useEffect(() => {
    if (isOpen) {
      setQuestions(Object.keys(responses).filter((key) => key !== 'default'));
    }
  }, [isOpen]);

  // Si no hay usuario autenticado, no mostrar el chatbot
  if (!user) return null;

  const toggleChatbot = () => setIsOpen(!isOpen);

  // Manejar entrada del usuario
  const handleUserInput = (event) => {
    if (event.key === 'Enter' && userInput.trim() !== '') {
      handleMessage(userInput.trim());
    }
  };

  const handleMessage = (message) => {
    // Busca la respuesta en el conjunto de respuestas o usa la predeterminada
    const response = responses[message] || responses.default;
    const replyText = response.text;

    // Agrega nuevo mensaje del usuario y respuesta del bot
    setMessages([
      { sender: 'user', text: message },
      { sender: 'bot', text: replyText },
    ]);

    // Limpiar el campo de entrada
    setUserInput('');
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`} style={{ color: primaryColor }}>
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        {isOpen ? '×' : '💬'}
      </button>
      {isOpen && (
        <div className="chatbot-content">
          <div className="chatbot-header">Asistente Virtual</div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-questions">
            <p>Preguntas disponibles (escribe una de ellas):</p>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
          <div className="chatbot-input-container">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleUserInput}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;


