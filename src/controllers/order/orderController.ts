import { Request, Response } from "express";
import orderCreateService from "../../services/order/orderCreateService";

const create = async (req: Request, res: Response): Promise<void> => {
  try {

    const body = req.body

    const validPayload = orderCreateService.validPayload(body)

    if(!validPayload) {
        res.status(200)
        res.json({
            message: "Você precisa enviar o id, name"
        })
        return
    }

    const newOrder = {
        pokemonId: 2,
        name: req.body.name,
        reference: "233",
        price: 12121,
        status: "pendente",
        nickname: "Joao Bolado",
        total: 1212
    }

    const order = await orderCreateService.create(newOrder)

    if(!order) {
        res.status(500)
        res.json({
            message: "Ocorreu um erro tente novamente"
        })
    }

    res.status(200)
    res.json({
      message: "Rota de geração de pedidos",
      order,
      linkCheckout: "url para pagamento"
    });
  } catch (error: any) {
    res.status(500)
    res.json({
      message: "Erro ao acessar rota de pedidos",
      error: error.message
    });
  }
};

export default {
  create
};
