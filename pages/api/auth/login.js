import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../sequelize"; // Import User langsung dari sequelize.js
import config from "../../../config/config.json"; // Mengimpor konfigurasi dari config.json

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
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
      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.development.JWT_SECRET,  // Menggunakan JWT_SECRET dari config.json
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
      console.error("Login Error:", error); // Log error untuk debugging
      res.status(500).json({ error: "Failed to log in!" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
