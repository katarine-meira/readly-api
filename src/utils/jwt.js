import jwt from "jsonwebtoken"
import "dotenv/config";

const SECRET = process.env.SECRET_JWT;

const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, email: user.email},
        SECRET,
        {expiresIn: "1d"}
    );
};

export {generateToken}