import ValidPayLoadAuthInterface from "../../Model/Pokemon/Interface/ValidPayLoadAuthInterface"
import pokemonRepository from "../../Model/pokemonRepository";
import PokemonModelInterface from "../../Model/Pokemon/Interface/PokemonModelInterface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const validPayLoad = (payLoad?: ValidPayLoadAuthInterface): boolean => {
  if (!payLoad || !payLoad.password) {
    return false;
  }

  return true;
};

const authPokemonService = async (name:string, password:string): Promise<PokemonModelInterface | null> => {

    const pokemon = await pokemonRepository.findByName(name);

    if(!pokemon){
        return null;
    }

    const match = await bcrypt.compare(password, pokemon.password);

    if (!match){
        return null;
    }

    return pokemon;
}

// Vamos gerar um token

const createToken = (pokemon: PokemonModelInterface): boolean | object => {

    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

    if(!JWT_SECRET) {
      return false
    }

    const payload = {
      // Aqui podemos colocar as informações que queremos no token
      name: pokemon.name
    }

    const expiresIn = '1h';

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn})

    return {
      token,
      expiresIn
    }
}


export default{
    validPayLoad,
    authPokemonService,
    createToken
}