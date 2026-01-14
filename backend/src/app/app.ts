import express from 'express';
import authRoutes from '../routes/auth.route.js'
import userRoutes from '../routes/user.route.js'
import articleRoutes from '../routes/article.route.js'
import inventoryRoutes from '../routes/inventory.route.js'
import supplierRoutes from '../routes/supplier.route.js'
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://inventory-app-b1xc-git-main-achraf27s-projects.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    // requêtes serveur → serveur ou curl
    if (!origin) return callback(null, true);

    // localhost
    if (origin === 'http://localhost:5173') {
      return callback(null, true);
    }

    // toutes les URLs vercel.app
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use(express.json());
app.get('/', (req, res) => {res.send('Hello Express!');});
app.use('/auth', authRoutes);
app.use('/user',userRoutes);
app.use('/article',articleRoutes);
app.use('/inventory',inventoryRoutes);
app.use('/supplier',supplierRoutes);


export default app;