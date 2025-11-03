import { Request, Response } from "express";
import pokemonRepository from "../../Model/pokemonRepository";
import updatePokemonService from "../../services/pokemon/updatePokemonService";
import destroyPokemonService from "../../services/pokemon/destroyPokemonService";

// Criar Pokémon
const createPokemon = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, nature, tipo, sexo, level } = req.body;
        const userId = req.user.id; // pega o userId do middleware authUser

        // Verifica se já existe
        const exists = await pokemonRepository.pokemonExist(name);
        if (exists) {
            res.status(409).json({ message: "Pokemon já existente" });
            return;
        }

        // Cria o Pokémon associado ao usuário
        const newPokemon = await pokemonRepository.create({ 
            name, 
            nature, 
            tipo, 
            sexo, 
            level, 
            userId 
        });

        if (!newPokemon) {
            res.status(500).json({ message: "Erro ao criar Pokemon" });
            return;
        }

        res.status(201).json({ message: "Pokemon criado com sucesso", pokemon: newPokemon });
    } catch (error: any) {
        console.error("Erro ao criar Pokémon:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};


// Obter todos os Pokémons
const getPokemons = async (_req: Request, res: Response): Promise<void> => {
    try {
        const pokemons = await pokemonRepository.findAll();
        res.status(200).json({ message: "Pokemons obtidos com sucesso", pokemons });
    } catch (error: any) {
        console.error("Erro ao obter Pokemons:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

// Obter um Pokémon específico (por id)
const getPokemon = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const pokemon = await pokemonRepository.findById(Number(id));
        if (!pokemon) {
            res.status(404).json({ message: "Pokemon não encontrado" });
            return;
        }
        res.status(200).json({ pokemon });
    } catch (error: any) {
        console.error("Erro ao obter Pokémon:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

// Atualizar Pokémon
const updatePokemon = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const update = await updatePokemonService.updatePokemon(req.body, Number(id));

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

// Deletar Pokémon
const destroyPokemon = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const destroyed = await destroyPokemonService.destroy(Number(id));

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

export default {
    createPokemon,
    getPokemons,
    getPokemon,
    updatePokemon,
    destroyPokemon,
};
