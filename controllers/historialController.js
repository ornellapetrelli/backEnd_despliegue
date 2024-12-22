// import FlightHistory from './../models/historial.js';
// import User from '../models/user.js';
// import nodemailer from 'nodemailer';
import FlightHistory from './../models/historial.js';
import User from '../models/user.js';
import nodemailer from 'nodemailer';
import ResponseBuilder from "../utils/builders/responseBuilder.js";
// // Validación adicional de los datos de vuelo
// const validateFlightData = (flights, totalPrice) => {
//   if (!Array.isArray(flights) || flights.length === 0) {
//     throw new Error('No flights data provided or data is invalid');
//   }
//   if (typeof totalPrice !== 'number' || totalPrice <= 0) {
//     throw new Error('Invalid total price');
//   }
// };

// // Function to add a flight to the history
// export const addFlightToHistory = async (req, res) => {
//   try {
//     const { flights, totalPrice } = req.body;
//     console.log(req.user);


//     if (!req.user || !req.user.email) {
//       return res.status(400).json({ message: 'Usuario no autenticado o email no encontrado' });
//     }

//     const userEmail = req.user.email; // Obtenemos el email del token
//     const newFlightHistory = new FlightHistory({
//       userEmail: userEmail,
//       flights: flights,
//       totalPrice: totalPrice,
//     });

//     await newFlightHistory.save();
//     return res.status(201).json({ message: 'Historial de vuelos actualizado exitosamente' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error al agregar el historial de vuelos' });
//   }
// };



// // Function to get the user's flight history
// export const getFlightHistory = async (req, res) => {
//   try {
//     // Find the flight history of a specific user
//     const history = await FlightHistory.find({ userId: req.user._id })
//       .sort({ flightDate: -1 }); // Sort by flight date in descending order (latest first)

//     if (history.length === 0) {
//       return res.status(404).json({ message: 'No flight history found for this user' });
//     }

//     return res.status(200).json(history); // Respond with the flight history
//   } catch (error) {
//     console.error('Error fetching flight history:', error);
//     return res.status(500).json({ message: 'There was an error fetching the flight history' });
//   }
// };

// // Function to process the payment, save the flight, and send the email
// // Function to process the payment, save the flight, and send the email
// export const processPayment = async (req, res) => {
//   const { fechaVuelo, horario, codigoVuelo, lugarPartida, lugarDestino, precio, duracion, aerolinea, estadoVuelo, claseServicio, estadoPago } = req.body;

//   // Validación de los datos de vuelo
//   if (!fechaVuelo || !horario || !codigoVuelo || !lugarPartida || !lugarDestino || !precio || !duracion || !aerolinea || !estadoVuelo || !claseServicio) {
//     return res.status(400).json({ message: 'All flight details are required' });
//   }

//   try {
//     // Crear un nuevo vuelo en el historial
//     const newFlight = new FlightHistory({
//       fechaVuelo,
//       horario,
//       codigoVuelo,
//       lugarPartida,
//       lugarDestino,
//       precio,
//       duracion,
//       aerolinea,
//       estadoVuelo,
//       claseServicio,
//       estadoPago: 'abonado',  // Establecer el estado de pago a "abonado"
//       userId: req.user._id,  // Asociar el vuelo con el usuario autenticado
//     });

//     // Guardar el nuevo vuelo en el historial
//     await newFlight.save();

//     // Enviar el correo al usuario (si lo necesitas)
//     const user = await User.findById(req.user._id);
//     if (user && user.email) {
//       await sendEmail(user.email, {
//         fechaVuelo,
//         horario,
//         codigoVuelo,
//         lugarPartida,
//         lugarDestino,
//         precio,
//         duracion,
//         aerolinea,
//         estadoVuelo,
//         claseServicio
//       });
//       return res.status(200).json({ message: 'Flight registered and email sent successfully' });
//     } else {
//       return res.status(400).json({ message: 'User not found or email not available' });
//     }
//   } catch (error) {
//     console.error('Error processing payment and saving flight:', error);
//     return res.status(500).json({ message: 'There was an error processing the payment or saving the flight' });
//   }
// };



// // Function to send the email with flight details
// const sendEmail = async (email, flightData) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER, // Usa las variables de entorno para la seguridad
//       pass: process.env.EMAIL_PASS,
//     },
//   });
  
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Flight Confirmation',
//     html: `
//       <h1>Flight Confirmation</h1>
//       <p>Your flight has been successfully booked. Here are the details:</p>
//       <table>
//         <tr><th>Flight Date</th><td>${flightData.fechaVuelo}</td></tr>
//         <tr><th>Flight Time</th><td>${flightData.horario}</td></tr>
//         <tr><th>Flight Code</th><td>${flightData.codigoVuelo}</td></tr>
//         <tr><th>Departure Location</th><td>${flightData.lugarPartida}</td></tr>
//         <tr><th>Destination Location</th><td>${flightData.lugarDestino}</td></tr>
//         <tr><th>Price</th><td>$${flightData.precio}</td></tr>
//         <tr><th>Duration</th><td>${flightData.duracion}</td></tr>
//         <tr><th>Airline</th><td>${flightData.aerolinea}</td></tr>
//         <tr><th>Flight Status</th><td>${flightData.estadoVuelo}</td></tr>
//         <tr><th>Service Class</th><td>${flightData.claseServicio}</td></tr>
//       </table>
//       <p>Thank you for trusting us!</p>
//     `,
//   };
//   console.log('Sending email to:', email);
//   console.log('Email content:', mailOptions.html);

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Error sending email');
//   }
// };

const jwt = require('jsonwebtoken');
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

export const verifyAuthenticationController = async (req, res) => {
  try {
    const token = req.headers.authorization; // Obtener el token desde el encabezado de la solicitud

    if (!token) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(401)
        .setMessage('No se proporcionó token')
        .setPayload({ detail: 'El token de autenticación es requerido' })
        .build();
      return res.status(401).json(response); // Responde con 401 si no hay token
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token usando la clave secreta

    // Buscar al usuario en la base de datos utilizando el ID decodificado del token
    const user = await User.findById(decoded.userId);
    if (!user) {
      const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(404)
        .setMessage('Usuario no encontrado')
        .setPayload({ detail: 'No se encontró el usuario asociado al token' })
        .build();
      return res.status(404).json(response); // Responde con 404 si el usuario no existe
    }

    // Si el token es válido y el usuario existe, respondemos con éxito
    const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage('Usuario autenticado correctamente')
      .setPayload({ user })
      .build();
    res.json(response); // Responde con los detalles del usuario

  } catch (error) {
    console.error('Error en la autenticación:', error);
    const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setMessage('Error en la autenticación')
      .setPayload({ detail: error.message })
      .build();
    return res.status(500).json(response); // Responde con 500 si hubo un error
  }
};

// Función para enviar el correo con los detalles del vuelo
const sendEmail = async (email, flightData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Usa las variables de entorno para la seguridad
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Flight Confirmation',
    html: `
      <h1>Flight Confirmation</h1>
      <p>Your flight has been successfully booked. Here are the details:</p>
      <table>
        <tr><th>Flight Date</th><td>${flightData.fechaVuelo}</td></tr>
        <tr><th>Flight Time</th><td>${flightData.horario}</td></tr>
        <tr><th>Flight Code</th><td>${flightData.codigoVuelo}</td></tr>
        <tr><th>Departure Location</th><td>${flightData.lugarPartida}</td></tr>
        <tr><th>Destination Location</th><td>${flightData.lugarDestino}</td></tr>
        <tr><th>Price</th><td>$${flightData.precio}</td></tr>
        <tr><th>Duration</th><td>${flightData.duracion}</td></tr>
        <tr><th>Airline</th><td>${flightData.aerolinea}</td></tr>
        <tr><th>Flight Status</th><td>${flightData.estadoVuelo}</td></tr>
        <tr><th>Service Class</th><td>${flightData.claseServicio}</td></tr>
      </table>
      <p>Thank you for trusting us!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Función para agregar un vuelo al historial y enviar un correo
export const addFlightToHistory = async (req, res) => {
  try {
    const { fechaVuelo, horario, codigoVuelo, lugarPartida, lugarDestino, precio, duracion, aerolinea, estadoVuelo, claseServicio } = req.body;

    // Validación de los datos de vuelo
    if (!fechaVuelo || !horario || !codigoVuelo || !lugarPartida || !lugarDestino || !precio || !duracion || !aerolinea || !estadoVuelo || !claseServicio) {
      return res.status(400).json({ message: 'All flight details are required' });
    }

    // Verificar que el usuario esté autenticado y que tenga un correo asociado
    if (!req.user || !req.user.email) {
      return res.status(400).json({ message: 'Usuario no autenticado o email no encontrado' });
    }

    const userEmail = req.user.email; // Obtener el correo del usuario desde el token

    // Crear un nuevo vuelo en el historial
    const newFlightHistory = new FlightHistory({
      fechaVuelo,
      horario,
      codigoVuelo,
      lugarPartida,
      lugarDestino,
      precio,
      duracion,
      aerolinea,
      estadoVuelo,
      claseServicio,
      userEmail, // Asociar el vuelo con el email del usuario
    });

    // Guardar el nuevo vuelo en el historial
    await newFlightHistory.save();

    // Enviar el correo de confirmación
    await sendEmail(userEmail, {
      fechaVuelo,
      horario,
      codigoVuelo,
      lugarPartida,
      lugarDestino,
      precio,
      duracion,
      aerolinea,
      estadoVuelo,
      claseServicio,
    });

    // Responder con éxito
    return res.status(200).json({ message: 'Flight added to history and email sent successfully' });
  } catch (error) {
    console.error('Error adding flight to history:', error);
    return res.status(500).json({ message: 'Error al agregar el vuelo al historial' });
  }
};