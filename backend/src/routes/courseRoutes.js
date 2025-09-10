import express from "express";
import { getCourse } from "../controllers/courseController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const courseRoutes = express.Router();

courseRoutes.get('/courses', verifyToken ,getCourse)

export default courseRoutes