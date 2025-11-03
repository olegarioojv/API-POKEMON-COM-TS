import { Request, Response } from "express";
import authUserService from "../../services/user/authUserService";
import destroyUserService from "../../services/user/destroyUserService";
import updateUserService from "../../services/user/updateUserService";
import createUserService from "../../services/user/createUserService";

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validPayLoad = createUserService.validPayLoad(req.body);

        if (!validPayLoad) {
            res.status(400).json({ message: "Usuário inválido" });
            return;
        }

        const userExist = await createUserService.userExist(req.body.email);

        if (userExist) {
            res.status(409).json({ message: "Usuário já existente" });
            return;
        }

        const newUser = await createUserService.createUserService(req.body);

        if (!newUser) {
            res.status(500).json({ message: "Erro ao criar usuário" });
            return;
        }

        res.status(201).json({
            message: "Usuário criado com sucesso",
            user: newUser,
        });

    } catch (error: any) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

const authUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validPayLoad = authUserService.validPayLoad(req.body);

        if (!validPayLoad) {
            res.status(400).json({ message: "Email e senha são obrigatórios" });
            return;
        }

        const user = await authUserService.authUserService(req.body.email, req.body.password);

        if (!user) {
            res.status(400).json({ message: "Falha na autenticação do usuário" });
            return;
        }

        const token = authUserService.createToken(user);

        if (!token) {
            res.status(500).json({ message: "Erro ao gerar token" });
            return;
        }

        res.status(200).json({
            message: "Usuário autenticado com sucesso",
            token
        });

    } catch (error: any) {
        console.error("Erro ao autenticar usuário:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            message: req.user
        });
    } catch (error: any) {
        console.error("Erro ao obter usuário:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            message: "Usuários obtidos com sucesso"
        });
    } catch (error: any) {
        console.error("Erro ao obter usuários:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

const destroyUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const destroyed = await destroyUserService.destroy(req.user.id);

        if (!destroyed) {
            res.status(400).json({ message: "Não foi possível deletar o usuário" });
            return;
        }

        res.status(200).json({ message: "Usuário deletado com sucesso" });

    } catch (error: any) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const update = await updateUserService.updateUser(req.body, req.user.id);

        if (!update) {
            res.status(400).json({ message: "Não foi possível atualizar o usuário" });
            return;
        }

        res.status(200).json({ message: "Usuário atualizado com sucesso" });

    } catch (error: any) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde" });
    }
};

export default {
    createUser,
    authUser,
    getUser,
    getUsers,
    destroyUser,
    updateUser,
};
