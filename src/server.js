import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import vuelosRoutes from './routes/vuelosRoutes.js';
import flightHistoryRoutes from './routes/historialRoutes.js';
//import statusRouter from "./routes/statusRoutes.js";

dotenv.config();

//const express = require('express');

const app = express();

//const URL_FRONT = process.env.URL_FRONT;
// || 'http://localhost:3000'
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.URL_FRONT, 'https://front-end-despliegue-git-main-ornellas-projects-5126821e.vercel.app','https://front-end-despliegue.vercel.app',
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`CORS no permite el origen: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`Ruta solicitada: ${req.method} ${req.url}`);
  next();
});

//app.use(verifyApikeyMiddleware)
app.get('/', (req, res) => {
  res.send('API está corriendo');
});


//app.use('/api/status', statusRouter)

app.use('/api/auth', authRoutes);

app.use('/api/vuelos', vuelosRoutes);

app.use('/api/history', flightHistoryRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.log('Error de conexión a MongoDB:', err);
});


// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });

export default app;