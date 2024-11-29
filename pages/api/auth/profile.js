import { authenticateToken } from "../../../middleware/auth";
import { User } from "../../../sequelize"; // Import User langsung dari sequelize.js

export default async function handler(req, res) {
    if (req.method === "GET") {
        authenticateToken(req, res, async () => {
            try {
                // Cari user berdasarkan ID dari JWT
                const user = await User.findByPk(req.user.id, { attributes: ["email"] });

                if (!user) {
                    return res.status(404).json({ error: "User not found!" });
                }

                res.status(200).json({ user });
            } catch (error) {
                console.error("Fetch User Error:", error); // Log error untuk debugging
                res.status(500).json({ error: "Failed to fetch user!" });
            }
        });
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end("Method Not Allowed");
    }
}
