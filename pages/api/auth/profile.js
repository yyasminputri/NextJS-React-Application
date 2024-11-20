import { authenticateToken } from "../../../middleware/auth";
import User from "../../../models/User";
import sequelize from "../../../sequelize";

export default async function handler(req, res) {
    await sequelize.authenticate();

    if (req.method === "GET") {
        authenticateToken(req, res, async () => {
            try {
                const user = await User.findByPk(req.user.id, { attributes: ["email"] });

                if (!user) {
                    return res.status(404).json({ error: "User not found!" });
                }

                res.status(200).json({ user });
            } catch (error) {
                res.status(500).json({ error: "Failed to fetch user!" });
            }
        });
    } else {
        res.status(405).end("Method Not Allowed");
    }
}
