import express from 'express'
import {register, login, logout, profile} from './controllers/auth.controller.js'
import { registerSquema, loginSquema } from './squemas/auth.squema.js'
import { validateSquema } from './midlewares/auth.midleware.js'
import { authenticateToken } from './midlewares/validToken.js'
import {conectDB} from './db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express()

conectDB()

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
  }));

app.post('/api/register',validateSquema(registerSquema), register);
app.post('/api/login',validateSquema(loginSquema), login);
app.post('/api/logout', logout);
app.get('/api/profile', authenticateToken, profile);

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
});