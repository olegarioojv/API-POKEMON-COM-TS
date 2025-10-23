import {Model} from "sequelize";

interface PokemonModelInterface extends Model {
    id: number;
    name: string;
    nature: string;
    tipo: string;
    sexo: string;
    level: number;
}

export default PokemonModelInterface;