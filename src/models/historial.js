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
  estado: { type: Boolean, default: true },
  claseServicio: { type: String, required: true },
  totalPrice: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const FlightHistory = mongoose.model('FlightHistory', flightHistorySchema);
export default FlightHistory;