import Pokemon from "./Pokemon";
import PokemonModelInterface from "./Interface/PokemonModelInterface";

const create = async (pokemon: Partial<PokemonModelInterface>): Promise<PokemonModelInterface> => {
    try {
        const newPokemon = await (Pokemon as any).create(pokemon);
        return newPokemon;
    } catch (error: any) {
        throw new Error(error);
    }
};

const findById = async (id: number): Promise<PokemonModelInterface | null> => {
    try {
        const pokemon = await (Pokemon as any).findOne({
            where: { id }
        });
        return pokemon;
    } catch (error: any) {
        throw new Error(error);
    }
};

const findByName = async (name: string,findById: object): Promise<PokemonModelInterface | null> => {
    try {
        const pokemon = await (Pokemon as any).findOne({
            where: { name }
        });
        return pokemon;
    } catch (error: any) {
        throw new Error(error);
    }
};

const findAll = async (where: object = {}): Promise<PokemonModelInterface[]> => {
    try {
        const pokemons = await Pokemon.findAll({
            where: {
                ...where
            }
        });
        return pokemons;
    } catch (error: any) {
        throw new Error(error);
    }
};

const update = async (pokemonData: Partial<PokemonModelInterface>, id: number): Promise<boolean> => {
    try {
        const [rowsUpdated] = await Pokemon.update(pokemonData, {
            where: { id }
        });
        return rowsUpdated > 0;
    } catch (error: any) {
        throw new Error(error);
    }
};

const destroy = async (id: number): Promise<boolean> => {
    try {
        const deleted = await Pokemon.destroy({
            where: { id }
        });
        return deleted > 0;
    } catch (error: any) {
        throw new Error(error);
    }
};

const pokemonExist = async (name: string, userId: number): Promise<boolean> => {
  try {
    const pokemon = await (Pokemon as any).findOne({
      where: { name, userId } 
    });
    return !!pokemon; 
  } catch (error: any) {
    throw new Error(error.message || "Erro ao verificar se o Pokémon existe");
  }
};


export default {
    create,
    findById,
    findAll,
    update,
    destroy,
    pokemonExist,
    findByName
};
