import {DataTypes} from "sequelize";
import connection from "../../config/database";
import OrderModelInterface from "./interface/OrderModelInterface";


const Order = connection.define<OrderModelInterface>('order', {
    reference:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    pokemonId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    });

export default Order;
