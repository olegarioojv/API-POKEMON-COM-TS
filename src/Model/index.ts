import 'dotenv/config'
import connection from "../config/database";
import Pokemon from './Pokemon/Pokemon';
import User from './User/User';
import Order from './Order/Order';

User.hasMany(Pokemon, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Pokemon.hasOne(Order)

connection.sync({
    force: false,
    alter: true
}).then(() => {
    console.log("Tabelas Sincronizadas")
})

export default {
    Pokemon,
    User
}