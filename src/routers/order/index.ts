import express, { Router } from 'express'
import orderController from '../../controllers/order/orderController'
import authUser from '../../middleware/authUser'
import authAdmin from '../../middleware/authAdmin'

const orderRouter: Router = express.Router()

orderRouter.post("/order", authUser,orderController.create)

orderRouter.post("/order/notify", orderController.notify)

//ADM

orderRouter.post("/orders", authAdmin, orderController.getAllOrders)

orderRouter.post("/order/:reference", authAdmin, orderController.getOrder)

orderRouter.patch("/order/:id", authAdmin, orderController.updateOrder)


export default orderRouter