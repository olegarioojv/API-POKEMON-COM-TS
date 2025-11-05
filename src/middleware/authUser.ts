import express, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userRepository from '../Model/User/userRepository';
import UserModelInterface from '../Model/User/interface/UserModelInterface';

declare global {
    namespace Express {
        export interface Request {
            user: UserModelInterface
        }
    }
}

interface DecodedInterface extends JwtPayload {
    email: string
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401)
            res.json({ message: "Token não fornecido" });
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401)
            res.json({ message: "Token malformado" });
            return;
        }

        const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            res.status(500)
            res.json({ message: "Erro no servidor" });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as DecodedInterface;

        if (!decoded) {
            res.status(401)
            res.json({ message: "Token inválido" });
            return;
        }

        const user = await userRepository.findByEmail(decoded.email);

        if (!user) {
            res.status(401)
            res.json({ message: "Token inválido" });
            return;
        }

        // Você pode usar outras verificações específicas se quiser,
        // como se o usuário está ativo, confirmado, etc.
        if (!user.status) {
            res.status(401)
            res.json({ message: "Usuário não autorizado" });
            return;
        }

        req.user = user;

    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        res.status(401)
        res.json({ message: "Token inválido" });
        return;
    }

    
    next();
};

export default authUser;
