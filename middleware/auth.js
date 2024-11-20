import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Token required!" });
    }

    try {
        const decoded = jwt.verify(token, "your_secret_key");
        req.user = decoded; // Simpan data user di request object
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token!" });
    }
}
