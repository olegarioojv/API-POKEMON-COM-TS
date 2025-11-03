import { Model } from "sequelize";

interface UserModelInterface extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;      // exemplo: 'admin', 'user', etc.
    status: boolean;   // ativo/inativo
}

export default UserModelInterface;
