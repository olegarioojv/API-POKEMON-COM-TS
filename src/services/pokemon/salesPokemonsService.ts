import pokemonRepository from "../../Model/Pokemon/pokemonRepository";
import PokemonModelInterface from "../../Model/Pokemon/Interface/PokemonModelInterface";

const getAllId = async (id: number): Promise<PokemonModelInterface[]> => {
  try {
    const pokemons = await pokemonRepository.findAll({ 
        userId: id });
    return pokemons;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao buscar Pokémons por usuário");
  }
};

export default {
  getAllId
};
