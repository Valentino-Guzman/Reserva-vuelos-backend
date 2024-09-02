import { createPool } from "mysql2/promise"
import { DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } from "./dotenv.js";

export const pool = createPool({
        host: DB_HOST,
        user: DB_USER,
        port: DB_PORT,
        password: DB_PASSWORD,
        database:  DB_DATABASE
})