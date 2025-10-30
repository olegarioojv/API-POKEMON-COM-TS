import ValidPayLoadPokemonInterface from "../../Model/Pokemon/Interface/ValidPayLoadPokemonInterface";
import PokemonModelInterface from "../../Model/Pokemon/Interface/PokemonModelInterface";
import pokemonRepository from "../../Model/pokemonRepository";
import bcrypt from "bcrypt";

// Função para validar se o payload é válido
const validPayLoad = (pokemon: ValidPayLoadPokemonInterface): boolean => {
    if (!pokemon.name || !pokemon.password) {
        return false;
    }
    return true;
};

// Função principal que cria o Pokémon
const createPokemonService = async (
    pokemon: Partial<PokemonModelInterface>
): Promise<PokemonModelInterface | null> => {
    try {
        if (
            !pokemon.name ||
            !pokemon.password ||
            !pokemon.nature ||
            !pokemon.tipo ||
            !pokemon.sexo ||
            !pokemon.level
        ) {
            return null;
        }

        // Criptografa a senha antes de salvar
        pokemon.password = await bcrypt.hash(pokemon.password, 10);

        const newPokemon = await pokemonRepository.create(pokemon);

        return newPokemon;
    } catch (error: any) {
        throw new Error(error);
    }
};

// Verifica se o Pokémon já existe
const pokemonExist = async (name: string): Promise<boolean> => {
    const pokemon = await pokemonRepository.findByName(name);
    if (pokemon) {
        return true;
    }
    return false;
};

export default {
    createPokemonService,
    pokemonExist,
    validPayLoad,
};
