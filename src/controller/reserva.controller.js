import { pool } from "../../config/config.js";
import { validateBooking } from "../../schemas/bookin.schema.js";

export const getBooking = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT id, fecha_ida, fecha_vuelta, cliente_id FROM reserva')
        res.send(result)
    } catch (error) {
        res.status(500).json({ message: 'error al obtener las reservas'})
    }   
}

export const getBookingById = async (req, res) => {
    const { id } = req.params
    try {
        const [result] = await pool.query('SELECT id, fecha_ida, fecha_vuelta, cliente_id FROM reserva WHERE id = ?', [id])
        res.send(result)
    } catch (error) {
        res.status(500).json({ message: 'error al obtener las reservas'})
    }
}

export const addBooking = async (req, res) => {
    const result = validateBooking(req.body)
    if(result .error) {
        return res.status(400).json({ error: JSON.parse(result .error.message) })
    }
    const { cliente_id, origen, destino, fecha_ida, fecha_vuelta } = result.data
    try {
        const [row] = await pool.query('INSERT INTO reserva (cliente_id, origen, destino, fecha_ida, fecha_vuelta) VALUES (?, ?, ?, ?, ?)', [cliente_id, origen, destino, fecha_ida, fecha_vuelta])
        res.status(201).json({
            id:row.insertId,
            cliente_id,
            origen,
            destino,
            fecha_ida,
            fecha_vuelta
        })
    } catch (error) {
        res.status(500).json({ message: 'error al añadir una reserva'})
    }
}

export const deleteBooking = async (req,res) => {
    try {
        const { id } = req.params
        const [result] = await pool.query('DELETE FROM reserva WHERE id = ?', [id])
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'No se encontro la reserva'
            }) 
        } 
        res.sendStatus(204)    
    } catch (error) {
        console.log(error)
        res.status(500).json({mesagge: 'error al eliminar la reserva'})
    }
}


