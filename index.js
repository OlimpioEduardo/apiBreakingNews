import express from 'express'
import dotenv from "dotenv"
import connectDatabase from './src/database/db.js'

import userRoute from "./src/routes/user.route.js"
import authRoute from "./src/routes/auth.route.js"
import newsRoute from "./src/routes/news.routes.js"
import swaggerRoute from "./src/routes/swagger.route.cjs"
import cors from "cors"

dotenv.config()
const app = express()

const port = process.env.PORT || 3001

connectDatabase()

app.use(express.json())

app.use(cors())

app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/news", newsRoute)
app.use("/doc", swaggerRoute)


app.listen(port, ()=> console.log(`Servidor rodando no endereco localhost: ${port}`))