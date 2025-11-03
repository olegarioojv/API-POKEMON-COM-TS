import { DataTypes } from "sequelize";
import connection from "../../config/database";
import UserModelInterface from "./interface/UserModelInterface";

const User = connection.define<UserModelInterface>('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING, // exemplo: 'admin', 'cliente', 'funcionario'
        allowNull: false,
        defaultValue: "user"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

export default User;
