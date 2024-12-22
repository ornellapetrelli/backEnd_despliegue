import mongoose from 'mongoose';

const flightHistorySchema = new mongoose.Schema({
  fechaVuelo: { type: Date, required: true },
  horario: { type: String, required: true },
  codigoVuelo: { type: String, required: true },
  lugarPartida: { type: String, required: true },
  lugarDestino: { type: String, required: true },
  precio: { type: Number, required: true },
  duracion: { type: String, required: true },
  aerolinea: { type: String, required: true },
  estadoVuelo: { type: String, required: true },  
  claseServicio: { type: String, required: true }, 
  estadoPago: { 
    type: String, 
    enum: ['pendiente', 'abonado'], 
    default: 'pendiente' 
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
});

const FlightHistory = mongoose.model('FlightHistory', flightHistorySchema);

export default FlightHistory;
