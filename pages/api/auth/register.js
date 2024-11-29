import bcrypt from "bcryptjs";
import { User } from "../../../sequelize"; // Import model User langsung dari sequelize.js

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required!" });
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format!" });
        }

        // Validasi panjang password
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long!" });
        }

        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Simpan user ke database
            const newUser = await User.create({
                email,
                password: hashedPassword,
            });

            // Respon sukses
            res.status(201).json({
                message: "User registered successfully!",
                user: { email: newUser.email },
            });
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ error: "Email already in use!" });
            } else {
                console.error("Registration Error:", error); // Log error untuk debugging
                res.status(500).json({ error: "Failed to register user!" });
            }
        }
    } else {
        // Tambahkan header untuk metode yang diizinkan
        res.setHeader("Allow", ["POST"]);
        res.status(405).end("Method Not Allowed");
    }
}
