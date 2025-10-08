import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js'; // note the .js extension
import cors from 'cors';


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // allow your frontend
  credentials: true
}));
app.use(bodyParser.json());

const MONGO_URI = 'mongodb+srv://rujutamedhi:Tripnest@cluster0.4gcogcx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Server running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
