import {  Request, Response } from "express";
import createPokemonService from "../../services/pokemon/createPokemonService";

const createPokemon = async (req:Request, res: Response): Promise<void> => {
    const validPayLoad = createPokemonService.validPayLoad(req.body);

    if (!validPayLoad){
        res.status(400)
        res.json({
            message: "Email, password and name is required"
        })
        return;
    }

    const PokemonExist = await createPokemonService.pokemonExist(req.body.name);

    if (PokemonExist){
        res.status(409)
        res.json({
            message: "Pokemon já Existente"
        })
        return;
    }

    const newPokemon = await createPokemonService.createPokemonService(req.body);

    if (!newPokemon){
        res.status(500)
        res.json({
            message: "Erro ao criar Pokemon"
        })
        return;
    }

    res.json({
        message: "Pokemon criado com sucesso",
        pokemon: newPokemon
    })
}

const authPokemon = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "Pokemon autenticado com sucesso"
    })
}

const getPokemon = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "Pokemon obtido com sucesso"
    })
}

const getPokemons = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "Pokemons obtidos com sucesso"
    })
}

const destroyPokemon = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "Pokemon deletado com sucesso"
    })
}   

const updatePokemon = async (req: Request, res: Response): Promise<void> => {
    res.json({
        message: "Pokemon atualizado com sucesso"
    })
}

export default {
    createPokemon,
    authPokemon,
    getPokemon,
    getPokemons,
    destroyPokemon,
    updatePokemon
}