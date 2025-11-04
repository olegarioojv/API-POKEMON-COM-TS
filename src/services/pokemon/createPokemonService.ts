import { where } from "sequelize";
import PokemonModelInterface from "../../Model/Pokemon/Interface/PokemonModelInterface";
import pokemonRepository from "../../Model/pokemonRepository";

const createPokemonService = async (
    pokemon: Partial<PokemonModelInterface>,
    userId: number
): Promise<PokemonModelInterface | null> => {
    try {
        if (
            !pokemon.name ||
            !pokemon.price ||
            !pokemon.nature ||
            !pokemon.tipo ||
            !pokemon.sexo ||
            !pokemon.level
        ) {
            return null;
        }

        const newPokemon = await pokemonRepository.create({
            ...pokemon,
            userId // vincula o Pokémon ao usuário
        });

        return newPokemon;
    } catch (error: any) {
        throw new Error(error.message || "Erro ao criar Pokémon");
    }
};


const validPayload = (body: Partial<PokemonModelInterface>): { valido: boolean; faltando?: string[] } => {

    const camposObrigatorios: (keyof PokemonModelInterface)[] = [
        "name",
        "price",
        "nature",
        "tipo",
        "sexo",
        "level"
    ];

    const faltando: string[] = [];

    for (const campo of camposObrigatorios) {
        if (body[campo] === undefined || body[campo] === "") {
            faltando.push(campo);
        }
    }

    if (faltando.length > 0) {
        return { valido: false, faltando };
    }

    return { valido: true };
    };
        
    const pokemonExist = async (name: string, userId:number): Promise<boolean> => {
    const pokemon = await pokemonRepository.pokemonExist(name, userId);
    return !!pokemon;
};  

export default {
    createPokemonService,
    pokemonExist,
    validPayload, 
};
