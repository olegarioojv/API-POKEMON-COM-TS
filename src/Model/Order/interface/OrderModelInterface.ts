import { Model } from "sequelize";

interface OrderModelInterface extends Model {
    id: number,
    reference: string
    name: string;
    price: number;
    status: string;
    nickname: string;
    pokemonId: number;
}

export default OrderModelInterface