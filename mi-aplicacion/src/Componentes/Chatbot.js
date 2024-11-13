import React, { useState } from 'react';
import './Chatbot.css';
import responses from './responses';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' }]);
  const [userInput, setUserInput] = useState('');

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleUserInput = (event) => {
    if (event.key === 'Enter' && userInput.trim() !== '') {
      const userMessage = userInput.trim();
      const reply = responses[userMessage] || 'Lo siento, no entiendo esa pregunta. ¿Podrías reformularla?';
      
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: userMessage },
        { sender: 'bot', text: reply }
      ]);
      
      setUserInput(''); // Limpiar el campo de entrada después de enviar el mensaje
    }
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleChatbot}>{isOpen ? 'Cerrar' : 'Abrir Chatbot'}</button>
      {isOpen && (
        <div className="chatbot-content">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleUserInput}
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
