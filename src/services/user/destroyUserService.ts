import userRepository from "../../Model/userRepository";

const destroy = async (id: number): Promise<boolean> => {
    try {
        return await userRepository.destroy(id);
    } catch (error: any) {
        throw new Error(error);
    }
};

export default {
    destroy,
};
