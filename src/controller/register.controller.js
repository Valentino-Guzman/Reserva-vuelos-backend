import { pool } from "../../config/config.js";
import { validateUser } from "../../schemas/register.user.schema.js";
import { JWT_SECRET } from "../../config/dotenv.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const result = validateUser(req.body)
        if(result .error) {
            return res.status(400).json({ error: JSON.parse(result .error.message) })
        }
        const { email, contrasena } = result.data

        //verificacion si el email existe
        const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
    
        if (rows.length > 0) {
            return res.status(400).json('El email está en uso. Intente con otro');
        }
        const hashedPassword = await bcrypt.hash(contrasena, 10);
    
        await pool.query('INSERT INTO usuario (email, contrasena) VALUES (?, ?)', [email, hashedPassword]);
    
        res.status(201).json({ message: 'Usuario creado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en la base de datos' });
    }
}

export const loginUser = async (req, res) => {
    try {
        const result = validateUser(req.body)
        const { email, contrasena } = result.data
    
        //verificacion si existe un usuario
        const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
        }
        //verificacion de la contraseña
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);
    
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos.' });
        }
        //token jwt para intercambiar informacion / decodificar-verificar y dar un estado
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en la base de datos' });
    }
}