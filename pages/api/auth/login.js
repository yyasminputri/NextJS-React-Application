import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../models/User";
import sequelize from "../../../sequelize";

export default async function handler(req, res) {
    await sequelize.authenticate();

    if (req.method === "POST") {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required!" });
        }

        try {
            // Cari user berdasarkan email
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ error: "User not found!" });
            }

            // Bandingkan password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid password!" });
            }

            // Buat token JWT
            const token = jwt.sign({ id: user.id, email: user.email }, "your_secret_key", { expiresIn: "1h" });

            res.status(200).json({ message: "Login successful!", token });
        } catch (error) {
            res.status(500).json({ error: "Failed to log in!" });
        }
    } else {
        res.status(405).end("Method Not Allowed");
    }
}
