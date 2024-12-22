import mongoose from 'mongoose';

const vueloSchema = new mongoose.Schema({
  fechaVuelo: {
    type: Date,
    set: (date) => {
      const d = new Date(date);
      return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); 
    },
  },
  horario: String,
  codigoVuelo: String,
  lugarPartida: String,
  lugarDestino: String,
  precio: Number,
  duracion: String,
  escalas: Number,
  aerolinea: String,
  estadoVuelo: String,
  asientosDisponibles: Number,
  tipoAvion: String,
  claseServicio: String,
  baggageInfo: String,
  serviciosIncluidos: String,
});

const Vuelo = mongoose.model('Vuelo', vueloSchema);

export default Vuelo;
