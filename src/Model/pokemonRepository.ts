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

 const destroy = async (id:number) => {
    
    try {
        const pokemon = await Pokemon.destroy({
        where: {
            id
        }
    })

    if (!pokemon) {
        return false
    }

    return true

    } catch (error:any) {
        throw new Error(error);
    }
 }

 const update = async (pokemonData: Partial<PokemonModelInterface>, id: number) => {
    try {
        // Primeiro argumento: os dados que você quer atualizar
        // Segundo argumento: options, incluindo o "where"
        const [rowsUpdated] = await Pokemon.update(pokemonData, {
            where: { id }
        });

        // Se não atualizou nenhum registro, retorna false
        if (rowsUpdated === 0) {
            return false;
        }

        return true;
    } catch (error: any) {
        throw new Error(error);
    }
};

 const findAll = async (): Promise<PokemonModelInterface[]> => {
    try {
        const pokemons = await Pokemon.findAll();
        return pokemons
    } catch (error:any) {
        throw new Error(error);
    }
 }



 export default {
    create,
    findByName,
    destroy,
    update,
    findAll

 }