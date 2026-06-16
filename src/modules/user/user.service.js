import { generateToken } from "../../utils/jwt.js";
import { createUser, findUserByEmail } from "./user.repository.js"
import bcrypt from "bcrypt"

const registerUser = async (name, email, password) => {
    const userExists = await findUserByEmail(email);

    if(userExists) {
        throw new Error("Email já está em uso");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    return createUser({
        name,
        email,
        password: hashedPassword
    });
};

const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if(!user) {
        throw new Error("Usuário não encontrado");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch) {
        throw new Error("Senha Inválida");
    }

    const token = generateToken(user);
    return {user, token}
}

export { registerUser, loginUser };