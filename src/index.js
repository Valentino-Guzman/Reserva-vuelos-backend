import app from "./app.js"
import { PORT } from "../config/dotenv.js"

app.listen(PORT, () => {
    console.log(`el servidor se abrio en el puerto: http://localhost:${PORT}`)
})