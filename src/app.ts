import express, { Express } from "express"
import pokemonRouter from "./routers/pokemon"


const app: Express = express()

app.use(express.json())
app.use(pokemonRouter)

export default app