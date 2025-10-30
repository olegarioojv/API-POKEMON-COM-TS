import { Request, Response } from "express";
import createPokemonService from "../../services/pokemon/createPokemonService";
import authPokemonService from "../../services/pokemon/authPokemonService";
import destroyPokemonService from "../../services/pokemon/destroyPokemonService";
import updatePokemonService from "../../services/pokemon/updatePokemonService";

const createPokemon = async (req: Request, res: Response): Promise<void> => {
    try {
        const validPayLoad = createPokemonService.validPayLoad(req.body);

        if (!validPayLoad) {
            res.status(400).json({ message: "Pokemon inválido" });
            return;
        }

        const PokemonExist = await createPokemonService.pokemonExist(req.body.name);

        if (PokemonExist) {
            res.status(409).json({ message: "Pokemon já existente" });
            return;
        }

        const newPokemon = await createPokemonService.createPokemonService(req.body);

        if (!newPokemon) {
            res.status(500).json({ message: "Erro ao criar Pokemon" });
            return;
        }

        res.status(201).json({
            message: "Pokemon criado com sucesso",
            pokemon: newPokemon,
        });

    } catch (error: any) {
        console.error("Erro ao criar Pokémon:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

const authPokemon = async (req: Request, res: Response): Promise<void> => {
    try {
        const validPayLoad = authPokemonService.validPayLoad(req.body);

        if (!validPayLoad) {
            res.status(400).json({ message: "ID e senha do pokemon são obrigatórios" });
            return;
        }

        const pokemon = await authPokemonService.authPokemonService(req.body.name, req.body.password);

        if (!pokemon) {
            res.status(400).json({ message: "Falha na autenticação do Pokemon" });
            return;
        }

        const token = authPokemonService.createToken(pokemon);

        if (!token) {
            res.status(500).json({ message: "Erro ao gerar token" });
            return;
        }

        res.status(200).json({
            message: "Pokemon autenticado com sucesso",
            token
        });

    } catch (error: any) {
        console.error("Erro ao autenticar Pokémon:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

const getPokemon = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            message: req.pokemon
        });
    } catch (error: any) {
        console.error("Erro ao obter Pokémon:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

const getPokemons = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            message: "Pokemons obtidos com sucesso"
        });
    } catch (error: any) {
        console.error("Erro ao obter Pokemons:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

const destroyPokemon = async (req: Request, res: Response): Promise<void> => {
    try {
        const destroyed = await destroyPokemonService.destroy(req.pokemon.id);

        if (!destroyed) {
            res.status(400).json({ message: "Não foi possível deletar o Pokemon" });
            return;
        }

        res.status(200).json({ message: "Pokemon deletado com sucesso" });

    } catch (error: any) {
        console.error("Erro ao deletar Pokémon:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

const updatePokemon = async (req: Request, res: Response): Promise<void> => {
    try {
        const update = await updatePokemonService.updatePokemon(req.body, req.pokemon.id);

        if (!update) {
            res.status(400).json({ message: "Não foi possível atualizar o Pokemon" });
            return;
        }

        res.status(200).json({ message: "Pokemon atualizado com sucesso" });

    } catch (error: any) {
        console.error("Erro ao atualizar Pokémon:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

export default {
    createPokemon,
    authPokemon,
    getPokemon,
    getPokemons,
    destroyPokemon,
    updatePokemon,
};
