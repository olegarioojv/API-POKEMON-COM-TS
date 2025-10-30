import express, { Router } from "express";
import pokemonController from "../../controllers/pokemon/pokemonController";
import auth from "../../middleware/auth";

const pokemonRouter: Router = express.Router();

pokemonRouter.post('/pokemon', pokemonController.createPokemon)

pokemonRouter.post('/pokemon/auth', pokemonController.authPokemon)

pokemonRouter.get('/me', auth, pokemonController.getPokemon)

pokemonRouter.get('/me',  auth, pokemonController.getPokemons)

pokemonRouter.delete('/me', auth, pokemonController.destroyPokemon)

pokemonRouter.patch('/me',  auth, pokemonController.updatePokemon)

export default pokemonRouter