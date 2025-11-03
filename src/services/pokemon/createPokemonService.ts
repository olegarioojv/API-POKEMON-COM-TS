import PokemonModelInterface from "../../Model/Pokemon/Interface/PokemonModelInterface";
import pokemonRepository from "../../Model/pokemonRepository";


const createPokemonService = async (pokemon: Partial<PokemonModelInterface>, userId: number):Promise<PokemonModelInterface | null> => {
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


const pokemonExist = async (name: string): Promise<boolean> => {
    const pokemon = await pokemonRepository.pokemonExist(name);
    return !!pokemon;
};

export default {
    createPokemonService,
    pokemonExist,
};
