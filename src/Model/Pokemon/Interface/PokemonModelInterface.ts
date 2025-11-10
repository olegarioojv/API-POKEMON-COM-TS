import {Model} from "sequelize";

interface PokemonModelInterface extends Model {
    id: number;
    name: string;
    price: number;
    nature: string;
    tipo: string;
    status: boolean;
    sexo: string;
    level: number;
    userId: number;
}

export default PokemonModelInterface;