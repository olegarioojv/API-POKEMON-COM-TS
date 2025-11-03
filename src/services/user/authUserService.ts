import ValidPayLoadAuthInterface from "../../Model/User/interface/ValidPayLoadAuthInterface";
import userRepository from "../../Model/userRepository";
import UserModelInterface from "../../Model/User/interface/UserModelInterface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const validPayLoad = (payLoad?: ValidPayLoadAuthInterface): boolean => {
  if (!payLoad || !payLoad.email || !payLoad.password) {
    return false;
  }

  return true;
};

const authUserService = async (email: string, password: string): Promise<UserModelInterface | null> => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    return null;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return null;
  }

  return user;
};

const createToken = (user: UserModelInterface): boolean | object => {
  const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    return false;
  }

  const payload = {
    email: user.email,
    id: user.id,
    role: user.role
  };

  const expiresIn = "1h";

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });

  return {
    token,
    expiresIn
  };
};

export default {
  validPayLoad,
  authUserService,
  createToken
};
