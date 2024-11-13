const { body } = require('express-validator');

// Validación para crear o actualizar un usuario
const validarUsuario = [
  body('email')
    .isEmail()
    .withMessage('El email debe ser válido'), // Verifica que sea un email válido
  body('contraseña')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'), // Contraseña mínima de 6 caracteres
  body('nombre')
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'), // Nombre con mínimo 3 caracteres
  body('telefono')
    .isNumeric()
    .withMessage('El teléfono debe ser numérico') // Verifica que sea numérico
    .isLength({ min: 9, max: 15 })
    .withMessage('El teléfono debe contener entre 9 y 15 dígitos'), // Longitud del teléfono
  body('rut')
    .matches(/^\d{7,8}-[0-9kK]$/)
    .withMessage('El RUT debe tener un formato válido (ejemplo: 12345678-9)') // RUT en formato válido
];

// Validación para crear una reserva
const validarReserva = [
  body('ID_User')
    .isInt({ gt: 0 })
    .withMessage('El ID_User debe ser un número entero positivo'), // ID_User debe ser un entero positivo
  body('ID_Horario')
    .isInt({ gt: 0 })
    .withMessage('El ID_Horario debe ser un número entero positivo') // ID_Horario debe ser un entero positivo
];

// Exportar las validaciones
module.exports = {
  validarUsuario,
  validarReserva,
};