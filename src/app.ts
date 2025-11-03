import express, { Express } from "express"
import pokemonRouter from "./routers/pokemon"
import userRouter from "./routers/user/index"


const app: Express = express()

app.use(express.json())
app.use(pokemonRouter)
app.use(userRouter)


export default app