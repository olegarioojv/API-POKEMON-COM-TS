import User from "./User";
import UserModelInterface from "./interface/UserModelInterface";

const create = async (user: Partial<UserModelInterface>): Promise<UserModelInterface> => {
    try {
        const newUser = await (User as any).create(user);
        return newUser;
    } catch (error: any) {
        throw new Error(error);
    }
}

const findByEmail = async (email: string): Promise<UserModelInterface | null> => {
    try {
        const user = await (User as any).findOne({
            where: {
                email
            }
        });

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

const destroy = async (id: number) => {
    try {
        const user = await User.destroy({
            where: { id }
        });

        if (!user) {
            return false;
        }

        return true;
    } catch (error: any) {
        throw new Error(error);
    }
}

const update = async (userData: Partial<UserModelInterface>, id: number) => {
    try {
        const [rowsUpdated] = await User.update(userData, {
            where: { id }
        });

        if (rowsUpdated === 0) {
            return false;
        }

        return true;
    } catch (error: any) {
        throw new Error(error);
    }
}

const findAll = async (): Promise<UserModelInterface[]> => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default {
    create,
    findByEmail,
    destroy,
    update,
    findAll
};
