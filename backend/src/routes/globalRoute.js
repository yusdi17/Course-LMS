import express from 'express';
import { helloWorld } from '../controllers/globalController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { exampleSchema } from '../utils/schema.js';

const globalRoute = express.Router();

globalRoute.get('/hello-world', helloWorld)
globalRoute.post('/test-validate', validateRequest(exampleSchema), async (req, res)=>{
  return res.json({message: "success"});
})

export default globalRoute;