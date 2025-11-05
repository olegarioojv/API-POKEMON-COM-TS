import OrderValidPayLoadInterface from "../../Model/Order/interface/OrderValidPayLoadInterface"
import OrderModelInterface from "../../Model/Order/interface/OrderModelInterface"
import { Order } from "sequelize"
import orderRepository from "../../Model/Order/orderRepository"


const validPayload = (body: OrderValidPayLoadInterface): boolean => {
    try {
        
        if (!body.id || !body.name) {
            return false
    }
        return true
    } catch (error: any) {
        throw new Error(error)
    }
}

const create = async(order: Partial<OrderModelInterface>): Promise<OrderModelInterface> => {
    try {
        const newOrder = await orderRepository.create(order)

        return newOrder
    } catch (error:any) {
        throw new Error(error);
    }
}

export default {
    create,
    validPayload
}
