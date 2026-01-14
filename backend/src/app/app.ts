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
app.use(cors({
     origin: [
    'http://localhost:5173',
    'https://inventory-app-b1xc-git-main-achraf27s-projects.vercel.app'
  ]
}));

app.options('*',cors({
     origin: [
    'http://localhost:5173',
    'https://inventory-app-b1xc-git-main-achraf27s-projects.vercel.app'
  ]
}));

app.use(express.json());
app.get('/', (req, res) => {res.send('Hello Express!');});
app.use('/auth', authRoutes);
app.use('/user',userRoutes);
app.use('/article',articleRoutes);
app.use('/inventory',inventoryRoutes);
app.use('/supplier',supplierRoutes);


export default app;