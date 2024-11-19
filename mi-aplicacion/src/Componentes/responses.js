const responses = {
  '¿Cómo puedo obtener una cita médica?': {
    text: 'Puedes obtener una cita médica accediendo a la sección “Citas” en nuestra aplicación, donde podrás seleccionar un médico, el día y la hora disponibles.',
    category: 'citas'
  },
  '¿Puedo cancelar o editar una cita?': {
    text: 'Sí, puedes cancelar o editar tu cita desde la sección “Mis Citas” en tu perfil de usuario. Solo asegúrate de hacerlo con suficiente anticipación.',
    category: 'gestión de citas'
  },
  '¿Qué médicos están disponibles?': {
    text: 'Puedes ver la lista de médicos disponibles en la sección “Citas” al seleccionar el día y hora que prefieras.',
    category: 'disponibilidad'
  },
  '¿Qué debo hacer si no encuentro una hora disponible?': {
    text: 'Si no encuentras una hora disponible, te recomendamos revisar otros días o contactar al centro hospitalario para más opciones.',
    category: 'disponibilidad'
  },
  '¿Cómo selecciono la causa de mi cita?': {
    text: 'Al reservar tu cita, puedes seleccionar la causa específica en el formulario de solicitud.',
    category: 'selección de causa'
  },
  '¿Puedo ver mi historial de citas?': {
    text: 'Sí, puedes ver tu historial de citas en la sección “Mis Citas”, donde tendrás acceso a todas tus citas pasadas y futuras.',
    category: 'historial'
  },
  default: {
    text: 'Lo siento, no entiendo esa pregunta. Por favor, reformula tu consulta.',
    category: 'desconocido'
  }
};

export default responses;
