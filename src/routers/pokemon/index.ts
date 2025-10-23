import express, { Router } from "express";
import pokemonController from "../../controllers/pokemon/pokemonController";

const pokemonRouter: Router = express.Router();

pokemonRouter.post('/pokemon', pokemonController.createPokemon)

pokemonRouter.post('/pokemon/auth', pokemonController.authPokemon)

pokemonRouter.get('/pokemon/:name', pokemonController.getPokemon)

pokemonRouter.get('/pokemons', pokemonController.getPokemons)

pokemonRouter.delete('/pokemon/:name', pokemonController.destroyPokemon)

pokemonRouter.put('/pokemon/:name', pokemonController.updatePokemon)

export default pokemonRouter