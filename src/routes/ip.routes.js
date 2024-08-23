import { Router } from 'express';
import { addIP } from '../controllers/ip.controller.js';
const router = Router();

router.route('/add-ip-address').post(addIP);

export default router
