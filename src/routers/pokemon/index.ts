import express, { Router } from "express";
import pokemonController from "../../controllers/pokemon/pokemonController";
import authUser from "../../middleware/authUser";

const pokemonRouter: Router = express.Router();

pokemonRouter.post('/pokemon', authUser, pokemonController.createPokemon);

pokemonRouter.get('/pokemons', authUser, pokemonController.getPokemons);

pokemonRouter.get('/pokemon/me/:id', authUser, pokemonController.getPokemon);

pokemonRouter.patch('/pokemon/me/:id', authUser, pokemonController.updatePokemon);

pokemonRouter.delete('/pokemon/me/:id', authUser, pokemonController.destroyPokemon);

export default pokemonRouter;
