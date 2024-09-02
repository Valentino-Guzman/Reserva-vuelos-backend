import { pool } from "../../config/config.js"
import { validateClient } from "../../schemas/user.schema.js"

export const getUser = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM cliente')
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error al obtener usuarios' })
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const [result] = await pool.query('SELECT id, nombre, apellido, email FROM cliente WHERE id = ?', [id])
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error al obtener el usuario' })
    }
}

export const addUser = async (req, res) => {
    const result = validateClient(req.body)

    if(result .error) {
        return res.status(400).json({ error: JSON.parse(result .error.message) })
    }

    try {
        const {nombre, apellido, contrasena, email } = result.data
        const [rows] = await pool.query('INSERT INTO cliente (nombre, apellido, contrasena, email) VALUES (?, ?, ?, ?)', [nombre, apellido, contrasena, email])
        res.status(201).json({
            id: rows.insertId,
            nombre,
            apellido,
            email
        })  
    } catch (error) {
        console.log(error)
        res.status(500).json({mesagge: 'error al añadir usuario'})
    }
}

export const deleteUser = async (req,res) => {
    try {
        const { id } = req.params
        const [result] = await pool.query('DELETE FROM cliente WHERE id = ?', [id])
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'No se encontro usuario'
            }) 
        } 
        res.sendStatus(204)    
    } catch (error) {
        console.log(error)
        res.status(500).json({mesagge: 'error al eliminar usuario'})
    }
}