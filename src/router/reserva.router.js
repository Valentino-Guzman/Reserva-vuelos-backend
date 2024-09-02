import { Router } from "express";
import { addBooking, deleteBooking, getBooking } from "../controller/reserva.controller.js";

const router = Router()

router.get('/reserva', getBooking)
router.get('/reserva/:id', getBooking)

router.post('/reserva', addBooking)

router.delete('/reserva/:id', deleteBooking)

export default router
