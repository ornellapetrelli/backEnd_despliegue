import FlightHistory from '../models/historial.js';
import User from '../models/user.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';


export const verifyAuthenticationController = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ ok: false, message: 'Token de autenticación no proporcionado o mal formado' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.error('Error de autenticación:', error.message);
    return res.status(403).json({ ok: false, message: 'Token inválido o expirado', payload: { detail: error.message } });
  }
};

export const addFlightToHistory = async (req, res) => {
  try {
    const { flights } = req.body;

    if (!flights || flights.length === 0) {
      return res.status(400).json({ message: 'Se requiere al menos un vuelo para procesar la compra' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const savedFlights = [];

    for (const flight of flights) {
      const { fechaVuelo, horario, codigoVuelo, lugarPartida, lugarDestino, precio, duracion, aerolinea, estadoVuelo, claseServicio } = flight;

      if (!fechaVuelo || !horario || !codigoVuelo || !lugarPartida || !lugarDestino || !precio || !duracion || !aerolinea || !estadoVuelo || !claseServicio) {
        return res.status(400).json({ message: 'Todos los detalles del vuelo son requeridos' });
      }

      // // Verificar duplicados
      // const existingFlight = await FlightHistory.findOne({ userId: req.userId, codigoVuelo });
      // if (existingFlight) {
      //   console.log(`El vuelo con código ${codigoVuelo} ya existe en el historial del usuario`);
      //   continue; // Saltar vuelos duplicados
      // }

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
        userId: req.userId,
      });

      await newFlightHistory.save();
      savedFlights.push(newFlightHistory);
    }

    if (savedFlights.length > 0) {
      for (const flight of savedFlights) {
        await sendEmail(user.email, flight);
      }
    }

    return res.status(200).json({ message: 'Vuelos registrados y correos enviados exitosamente', savedFlights });
  } catch (error) {
    console.error('Error al agregar vuelos al historial:', error);
    return res.status(500).json({ message: 'Error en el servidor al guardar los vuelos', error: error.message });
  }
};

const sendEmail = async (email, flightData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Confirmación de vuelo',
    html: `
      <h1>Confirmación de vuelo</h1>
      <p>Tu vuelo ha sido exitosamente reservado. Aquí los detalles:</p>
      <table>
        <tr><th>Fecha de vuelo</th><td>${flightData.fechaVuelo}</td></tr>
        <tr><th>Horario de vuelo</th><td>${flightData.horario}</td></tr>
        <tr><th>Código de vuelo</th><td>${flightData.codigoVuelo}</td></tr>
        <tr><th>Lugar de partida</th><td>${flightData.lugarPartida}</td></tr>
        <tr><th>Lugar de destino</th><td>${flightData.lugarDestino}</td></tr>
        <tr><th>Precio</th><td>$${flightData.precio}</td></tr>
        <tr><th>Duración del vuelo</th><td>${flightData.duracion}</td></tr>
        <tr><th>Aerolínea</th><td>${flightData.aerolinea}</td></tr>
        <tr><th>Estado de vuelo</th><td>${flightData.estadoVuelo}</td></tr>
        <tr><th>Clase de servicio</th><td>${flightData.claseServicio}</td></tr>
      </table>
      <p>¡Gracias por confiar en nosotros!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente:', email);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Fallo al enviar correo');
  }
};


export const getFlightHistoryController = async (req, res) => {

  const userId = req.userId; 

  try {
    const vuelos = await FlightHistory.find({ userId, estado: true }); 
    res.status(200).json(vuelos);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo el historial de vuelos', error });
  }
};


export const deleteFlightController = async (req, res) => {
  const { id } = req.params;

  try {
    const vuelo = await FlightHistory.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );

    if (!vuelo) {
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    }

    res.status(200).json({ message: 'Vuelo eliminado correctamente', vuelo });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando el vuelo', error });
  }
};
