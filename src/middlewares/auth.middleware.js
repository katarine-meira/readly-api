import jwt from "jsonwebtoken"
import prisma from "../config/database.js"

const SECRET = process.env.SECRET_JWT;

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({error: "Token não fornecido"});
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        next()
    } catch (error) {
        console.log(error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expirado" });
        }
        return res.status(401).json({ error: "Token inválido"})
    }
}

export default authMiddleware;
