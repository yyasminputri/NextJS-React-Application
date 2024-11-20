import bcrypt from "bcryptjs";
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
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Simpan user ke database
            const newUser = await User.create({
                email,
                password: hashedPassword,
            });

            res.status(201).json({ message: "User registered successfully!", user: { email: newUser.email } });
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ error: "Email already in use!" });
            } else {
                res.status(500).json({ error: "Failed to register user!" });
            }
        }
    } else {
        res.status(405).end("Method Not Allowed");
    }
}
