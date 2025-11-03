import PokemonModelInterface from "../../Model/Pokemon/Interface/PokemonModelInterface";
import pokemonRepository from "../../Model/pokemonRepository";

// Função principal que cria o Pokémon
const createPokemonService = async (
    pokemon: Partial<PokemonModelInterface>,
    userId: number // <- adiciona o ID do usuário autenticado
): Promise<PokemonModelInterface | null> => {
    try {
        if (
            !pokemon.name ||
            !pokemon.nature ||
            !pokemon.tipo ||
            !pokemon.sexo ||
            !pokemon.level
        ) {
            return null;
        }

        const newPokemon = await pokemonRepository.create({
            ...pokemon,
            userId // <- vincula o Pokémon ao usuário
        });

        return newPokemon;
    } catch (error: any) {
        throw new Error(error);
    }
};

// Verifica se o Pokémon já existe
const pokemonExist = async (name: string): Promise<boolean> => {
    const pokemon = await pokemonRepository.pokemonExist(name);
    return !!pokemon;
};

export default {
    createPokemonService,
    pokemonExist,
};
