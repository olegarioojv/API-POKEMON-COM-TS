import Order from "./Order";
import OrderModelInterface from "./interface/OrderModelInterface";

const create = async (order: Partial<OrderModelInterface>): Promise<OrderModelInterface> => {
    try {
        const newOrder = await (Order as any).create(order);
        return newOrder;
    } catch (error: any) {
        throw new Error(error);
    }
};

const findById = async (id: number): Promise<OrderModelInterface | null> => {
    try {
        const order = await (Order as any).findOne({
            where: { id }
        });
        return order;
    } catch (error: any) {
        throw new Error(error);
    }
};


const findAll = async (where: object = {}): Promise<OrderModelInterface[]> => {
    try {
        const orders = await Order.findAll({
            where: {
                ...where
            }
        });
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
};

const update = async (orderData: Partial<OrderModelInterface>, id: number): Promise<boolean> => {
    try {
        const [rowsUpdated] = await Order.update(orderData, {
            where: { id }
        });
        return rowsUpdated > 0;
    } catch (error: any) {
        throw new Error(error);
    }
};

const destroy = async (id: number): Promise<boolean> => {
    try {
        const deleted = await Order.destroy({
            where: { id }
        });
        return deleted > 0;
    } catch (error: any) {
        throw new Error(error);
    }
};

const orderExist = async (name: string, userId: number): Promise<boolean> => {
  try {
    const order = await (Order as any).findOne({
      where: { name, userId } 
    });
    return !!order; 
  } catch (error: any) {
    throw new Error(error.message || "Erro ao verificar se o ordem existe");
  }
};

const findByReference = async (reference: string): Promise<OrderModelInterface | null> => {
    try {
        const order = await Order.findOne({
            where: {
                reference
            }
        });
        return order;
    } catch (error: any) {
        throw new Error(error);
    }
}


export default {
    create,
    findById,
    findAll,
    update,
    destroy,
    orderExist,
    findByReference
};
