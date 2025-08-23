import express from "express";
import { afterPayment } from "../controllers/handlePayment.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/handle-payment", afterPayment);

export default paymentRoutes;