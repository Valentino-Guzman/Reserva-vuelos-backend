import express, { json } from 'express'
import clientRouter from './router/cliente.router.js'
import bookingRouter from './router/reserva.router.js'
import registerRouter from './router/register.router.js'
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.disable('x-powered-by')

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.use(clientRouter)
app.use(bookingRouter)
app.use(registerRouter)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro la ruta'
    })
})

export default app