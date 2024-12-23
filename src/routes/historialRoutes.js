import express from 'express';
import { addFlightToHistory,verifyAuthenticationController,deleteFlightController,getFlightHistoryController} from '../controllers/historialController.js';
//import { verifyMailValidationTokenController } from '../controllers/authController.js';

const router = express.Router();

router.post('/agregar', verifyAuthenticationController, addFlightToHistory);
router.get('/historial', verifyAuthenticationController, getFlightHistoryController);
router.delete('/eliminar/:id', verifyAuthenticationController, deleteFlightController);



export default router;
