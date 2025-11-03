import UserModelInterface from "../../Model/User/interface/UserModelInterface";
import userRepository from "../../Model/userRepository";

const updateUser = async (user: Partial<UserModelInterface>, id: number) => {
    try {
        return await userRepository.update(user, id);
    } catch (error: any) {
        throw new Error(error);
    }
};

export default {
    updateUser,
};
