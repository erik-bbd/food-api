import express from "express"
import { routing } from './api/api';
import dotenv from "dotenv"
import session from 'express-session';


dotenv.config()
const PORT = process.env.PORT || 8080

const app = express()

routing(app)

app.listen(+PORT, "localhost", () => {
    console.log("Listening on port " + PORT)
})