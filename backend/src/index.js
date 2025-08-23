import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import globalRoute from './routes/globalRoute.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './utils/database.js';

const app = express();
dotenv.config();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
const port = 3000;

app.get('/', (req,res)=> {
  res.json({text: "Halo ges"});
})

app.use('/api', globalRoute)
app.use('/api', authRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});