import 'dotenv/config'
import connection from "../config/database";
import Pokemon from './Pokemon/Pokemon';


connection.sync({
    force: false,
    alter: true
}).then(() => {
    console.log("Tabelas Sincronizadas")
})

export default {
    Pokemon
}