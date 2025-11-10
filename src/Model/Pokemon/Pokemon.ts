import {DataTypes} from "sequelize";
import connection from "../../config/database";
import PokemonModelInterface from "./Interface/PokemonModelInterface";
import User from "../User/User";


const Pokemon = connection.define<PokemonModelInterface>('pokemon', {

    name:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
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
    },
    status:
    {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId: { // <-- nova coluna
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: User,
        key: "id",
        },
    },
    });

    Pokemon.belongsTo(User, { foreignKey: "userId" });
    User.hasMany(Pokemon, { foreignKey: "userId" });

export default Pokemon;
