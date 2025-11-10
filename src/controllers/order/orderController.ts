import { Request, Response } from "express";
import orderCreateService from "../../services/order/orderCreateService";
import pokemonRepository from "../../Model/Pokemon/pokemonRepository";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import orderRepository from "../../Model/Order/orderRepository";
import crypto from "crypto";
import updateOrderService from "../../services/order/updateOrderService";
import getAllOrdersService from "../../services/order/getAllOrdersService";
import mercadoPagoConfig from "../../config/mercadoPagoConfig";

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;

    const validPayload = orderCreateService.validPayload(body);

    if (!validPayload) {
      res.status(200);
      res.json({
        message: "Você precisa enviar o id e name",
      });
      return;
    }

    const pokemon = await pokemonRepository.findByName(req.body.name, {
      pokemonId: req.body.id,
    });

    if (!pokemon) {
      res.status(400);
      res.json({
        message: "Houve um erro ao gerar o checkout",
      });
      return;
    }

    const reference = crypto.randomUUID();
    const newOrder = {
      pokemonId: pokemon.id,
      name: req.body.name,
      total: pokemon.price,
      reference: reference,
      price: pokemon.price,
      status: "pendente",
      nickname: req.body.nickname,
    };

    const client = mercadoPagoConfig();

    if (!client) {
      res.status(500);
      res.json({
        message: "Ocorreu um erro interno",
      });
      return;
    }

    const preference = new Preference(client as MercadoPagoConfig);
    const result = await preference.create({
      body: {
        items: [
          {
            id: reference,
            title: pokemon.name,
            unit_price: pokemon.price,
            quantity: 1,
          },
        ],
        external_reference: `F-${reference}`,
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
      },
    });

    const order = await orderCreateService.create(newOrder);

    if (!order) {
      res.status(500);
      res.json({
        message: "Ocorreu um erro tente novamente",
      });
      return;
    }

    res.json({
      message: "Rota de geração de pedidos",
      linkCheckout: result.init_point,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      message: "Ocorreu um erro interno",
    });
  }
};

const notify = async (req: Request, res: Response): Promise<void> => {
  const externalReference = req.body.data.external_reference;
  const order = await orderRepository.findByReference(externalReference);

  if (!order) {
    res.status(400);
    res.json({
      message: "order não existe",
    });
    return;
  }

  const orderUpdate = await orderRepository.update(
    {
      status: req.body.data.status,
    },
    order.id
  );

  if (!orderUpdate) {
    res.json({
      message: "Não foi possivel atualizar o status",
    });
    return;
  }

  res.json({
    message: order,
  });
};

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await getAllOrdersService.getOrders();

    res.json({
      total: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: "ocorreu um erro interno",
    });
  }
};

const getOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const reference = req.params.reference;

    const client = mercadoPagoConfig();

    if (!client) {
      res.json({
        message: "ocorreu um erro interno",
      });
      return;
    }

    const payment = new Payment(client as MercadoPagoConfig);
    const orderMercadoPago = await payment.search({
      options: {
        external_reference: reference,
      },
    });

    const order = await orderRepository.findByReference(reference);

    res.json({
      order,
      orderMercadoPago,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: "ocorreu um erro interno",
    });
  }
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    if (!id || !status) {
      res.status(400);
      res.json({
        message: "O parametro id e status são obrigatórios",
      });
      return;
    }

    const orderUpdate = await updateOrderService.update(req.body, parseInt(id));

    if (!orderUpdate) {
      res.status(500);
      res.json({
        message: "Não foi possivel atualizar",
      });
      return;
    }

    res.json({
      message: "Atualizado com sucesso",
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: "ocorreu um erro interno",
    });
  }
};

export default {
  create,
  notify,
  getAllOrders,
  getOrder,
  updateOrder,
};
