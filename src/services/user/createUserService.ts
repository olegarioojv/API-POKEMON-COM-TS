import ValidPayLoadAuthInterface from "../../Model/User/interface/ValidPayLoadAuthInterface";
import UserModelInterface from "../../Model/User/interface/UserModelInterface";
import userRepository from "../../Model/User/userRepository";
import bcrypt from "bcrypt";

// Função para validar se o payload é válido
const validPayLoad = (user: ValidPayLoadAuthInterface): boolean => {
    if (!user.name || !user.email || !user.password) {
        return false;
    }
    return true;
};

// Função principal que cria o Usuário
const createUserService = async (
    user: Partial<UserModelInterface>
): Promise<UserModelInterface | null> => {
    try {
        if (!user.name || !user.email || !user.password) {
            return null;
        }

        // Criptografa a senha antes de salvar
        user.password = await bcrypt.hash(user.password, 10);

        const newUser = await userRepository.create(user);

        return newUser;
    } catch (error: any) {
        throw new Error(error);
    }
};

// Verifica se o Usuário já existe
const userExist = async (email: string): Promise<boolean> => {
    const user = await userRepository.findByEmail(email);
    if (user) {
        return true;
    }
    return false;
};

export default {
    createUserService,
    userExist,
    validPayLoad,
};
