import express, { Express } from "express"
import pokemonRouter from "./routers/pokemon"
import userRouter from "./routers/user/index"
import orderRouter from "./routers/order"


const app: Express = express()

app.use(express.json())
app.use(pokemonRouter)
app.use(userRouter)
app.use(orderRouter)


export default app