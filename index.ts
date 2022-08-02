import express from "express"
import { routing } from './api/api';
import dotenv from "dotenv"

dotenv.config()

const app = express()

routing(app)

app.listen(8080, "localhost", () => {
    console.log("Listening on port 8080")
})