import PokemonModelInterface from "../../Model/Pokemon/Interface/PokemonModelInterface"
import Pokemon from "../../Model/Pokemon/Pokemon";



const updatePokemon = async (pokemonData: Partial<PokemonModelInterface>, id: number): Promise<boolean> => {
    try {
        const [rowsUpdated] = await Pokemon.update(pokemonData, {
            where: { id }
        });
        return rowsUpdated > 0;
    } catch (error: any) {
        throw new Error(error);
    }
};

export default {
    updatePokemon
}