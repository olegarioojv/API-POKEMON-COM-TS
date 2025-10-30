import PokemonModelInterface from "../../Model/Pokemon/Interface/PokemonModelInterface"
import pokemonRepository from "../../Model/pokemonRepository"


const updatePokemon = async (pokemon: Partial<PokemonModelInterface>, id:number) => {
    
    try {
        return await pokemonRepository.update(pokemon, id)
    } catch (error: any) {
        throw new Error(error);
    }
}

export default {
    updatePokemon
}