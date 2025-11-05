import pokemonRepository from "../../Model/Pokemon/pokemonRepository"

const destroy = async (id: number): Promise<boolean> => {
    try {
        return await pokemonRepository.destroy(id)

    } catch (error: any) {
        throw new Error(error)
    }

}

export default {
    destroy
}