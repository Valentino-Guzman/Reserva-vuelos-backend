import { Router } from "express";
import { addUser, deleteUser, getUser, getUserById } from "../controller/cliente.controller.js";

const router = Router()

router.get('/usuarios', getUser)
router.get('/usuarios/:id', getUserById)

router.post('/usuarios', addUser)

router.delete('/usuarios/:id', deleteUser)

export default router