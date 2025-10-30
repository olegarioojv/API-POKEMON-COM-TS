import express, {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import pokemonRepositorys from '../Model/pokemonRepository';
import Pokemon from '../Model/Pokemon/Pokemon';
import PokemonModelInterface from '../Model/Pokemon/Interface/PokemonModelInterface';

declare global {
    namespace Express {
        export interface Request {
            pokemon: PokemonModelInterface
        }
    }
}


interface decodedInterface extends JwtPayload {
    name: string
}

const auth = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401);
        res.json({ 
            message: "Token não fornecido"
         });
        return;
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        res.status(401);
        res.json({ 
            message: "Token malformado"
         });
        return;
    }
    
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

    if(!JWT_SECRET) {
        res.status(500);
        res.json({ 
            message: "Erro no servidor"
         });
        return;
    }

     const decoded = jwt.verify(token, JWT_SECRET) as decodedInterface;

     if(!decoded) {
        res.status(401);
        res.json({ 
            message: "Token inválido"
         });
        return;
     }

     const pokemon = await pokemonRepositorys.findByName(decoded.name);
     if (!pokemon){
        res.status(401);
        res.json({ 
            message: "Token inválido"
         });
        return;
     }

     if(!pokemon.sexo) {
        res.status(401);
        res.json({
            message: "Não autorizado"
         });
        return;
     }

     req.pokemon = pokemon


    } catch (error) {
        res.status(401);
        res.json({ 
            message: "Token inválido"
         });
        return;
     }

      next();
    }

export default auth;