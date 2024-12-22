import express from 'express';
import { addFlightToHistory,verifyAuthenticationController} from '../controllers/historialController.js';
//import { verifyMailValidationTokenController } from '../controllers/authController.js';
//,verifyMailValidationController
import { sendEmail } from '../utils/mail.util.js';
//, getFlightHistory 
const router = express.Router();

router.post('/agregar', verifyAuthenticationController, addFlightToHistory);

//router.post('/send-email', sendEmail);


//router.get('/historial', verifyMailValidationTokenController, getFlightHistory);


export default router;
