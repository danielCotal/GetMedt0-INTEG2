import React, { useState, useContext } from 'react';
import './Chatbot.css';
import responses from './responses';
import { UserContext } from './UserContext'; // Importar contexto de usuario

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' }]);
  const [userInput, setUserInput] = useState('');
  const { user } = useContext(UserContext); // Obtener información de usuario

  if (!user) {
    // Si no hay un usuario autenticado, no mostrar el chatbot
    return null;
  }

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleUserInput = (event) => {
    if (event.key === 'Enter' && userInput.trim() !== '') {
      const userMessage = userInput.trim();
      const response = responses[userMessage] || responses.default;
      const replyText = response.text; // Accede solo a la propiedad `text`

      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: userMessage },
        { sender: 'bot', text: replyText }
      ]);

      setUserInput(''); // Limpiar el campo de entrada después de enviar el mensaje
    }
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
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
