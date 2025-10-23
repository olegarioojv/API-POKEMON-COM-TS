import ValidPayLoadPokemonInterface from "../../Model/Pokemon/Interface/ValidPayLoadPokemonInterface";
import PokemonModelInterface from "../../Model/Pokemon/Interface/PokemonModelInterface";
import pokemonRepository from "../../Model/pokemonRepository";


const validPayLoad = (poekmon: ValidPayLoadPokemonInterface): boolean => {
    if (!poekmon.name) {
        return false;
    }
    return true;
}

const createPokemonService = async (pokemon: Partial<PokemonModelInterface>): Promise<PokemonModelInterface | null> => {
    try {
        if (!pokemon.name || !pokemon.nature || !pokemon.tipo || !pokemon.sexo || !pokemon.level) {
            return null;
        }

        const newPokemon = await pokemonRepository.create(pokemon);
        return newPokemon;
    } catch (error: any) {
        throw new Error(error);
    }
}

    const pokemonExist = async (name: string): Promise<boolean> => {
        const pokemon = await pokemonRepository.findByName(name);
        if (pokemon) {
            return true;
        }
        return false;
    }

    export default {
        createPokemonService,
        pokemonExist,
        validPayLoad
    }

