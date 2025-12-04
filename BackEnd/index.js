import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import postRoutes from './routes/post.js';
import putRoutes from './routes/put.js';
import getRoutes from './routes/get.js';
import deleteRoutes from './routes/delete.js';

const app = express();

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));

// Connect to MongoDB DataBase..........
mongoose.connect("mongodb://localhost:27017/E-commerce")
    .then(() => console.log('Successfully Connected to MongoDB'))
    .catch(err => console.log(err));

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/post', postRoutes);
app.use('/put', putRoutes);
app.use('/get', getRoutes);
app.use('/delete', deleteRoutes);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});