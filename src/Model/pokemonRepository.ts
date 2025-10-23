import Pokemon from "./Pokemon/Pokemon";
import PokemonModelInterface from "./Pokemon/Interface/PokemonModelInterface";

const create = async (pokemon: Partial<PokemonModelInterface>): Promise<PokemonModelInterface> => {
    try {
        const newPokemon = await (Pokemon as any).create(pokemon);
        return newPokemon;
    } catch (error: any) {
        throw new Error(error);
    }
}

const findByName = async (name: string): Promise<PokemonModelInterface | null> => {
    try {
        const pokemon = await (Pokemon as any).findOne({
            where: {
                name
            }
        })

        return pokemon;
    } catch (error: any) {
        throw new Error(error);
    }
 }

 export default {
    create,
    findByName
 }