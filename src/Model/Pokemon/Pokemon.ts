import {DataTypes} from "sequelize";
import connection from "../../config/database";
import PokemonModelInterface from "./Interface/PokemonModelInterface";


const Pokemon = connection.define<PokemonModelInterface>('pokemon', {
 
    name:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    nature: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    level:
    {
        type: DataTypes.DECIMAL(10,3),
        allowNull: false
    }
});

export default Pokemon;
