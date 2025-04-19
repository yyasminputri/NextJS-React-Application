# 🥘 PBKK-Nextjs
This is a web application built with Next.js and TypeScript, utilizing Tailwind CSS, Sequelize ORM, and supporting features like authentication and database migration. It is suitable for use as a recipe-sharing platform, food blog, or similar interactive web application.

## 📂 Main Features
- 🧾 Recipe Management
- 📝 Review System
- 💬 Contact Page
- ❤️ Favorites Page
- 🧠 Blog Section
- 🌙 Dark Mode Toggle
- 🛡️ Authentication Middleware
- ⚙️ Sequelize ORM with Database Migrations

## 🚀 Getting Started
1. Install Dependencies
`npm install`

2. Configure Environment Variables in sequelize.js
```
host: "localhost",
port: 3308,
dialect: "mysql",
```

3. Set Up the Database
Run the migrations to create necessary tables:
`npx sequelize-cli db:migrate`

in MySQL
`CREATE DATABASE resep_makanan;`

5. Sync & Seed Data
`node dbSync.js`

6. Start the Development Server
`npm run dev`

### Visual App
### Home Page 
<img width="1440" alt="Screenshot 2025-04-18 at 12 55 36" src="https://github.com/user-attachments/assets/12234113-d50a-46c8-8911-2ca1ac7cf062" />
<img width="1440" alt="Screenshot 2025-04-18 at 12 55 45" src="https://github.com/user-attachments/assets/97b33dd3-8c48-441c-830a-e2094c5fd6aa" />
<img width="1440" alt="Screenshot 2025-04-18 at 12 55 53" src="https://github.com/user-attachments/assets/34b90589-4f4d-4de5-b342-d659c7160d8c" />

### Categories
Front End 
<img width="1440" alt="Screenshot 2025-04-18 at 12 56 38" src="https://github.com/user-attachments/assets/e0756204-9b29-42db-bc2c-9cea13447940" />
Back End
<img width="1440" alt="Screenshot 2025-04-18 at 16 01 51" src="https://github.com/user-attachments/assets/3c2dcc23-3ef7-474f-bea7-638cd52a0a7d" />

### Favorite
<img width="1440" alt="Screenshot 2025-04-18 at 12 56 31" src="https://github.com/user-attachments/assets/d7cb368d-5b65-4ec2-bb8d-31e5f6dfbf76" />

### Recipe 
Front End
<img width="1440" alt="Screenshot 2025-04-18 at 12 56 31" src="https://github.com/user-attachments/assets/d362726d-4ecd-4291-9979-5ad538372c60" />
Back End
<img width="1440" alt="Screenshot 2025-04-18 at 16 09 50" src="https://github.com/user-attachments/assets/b058e0bd-52b4-4f82-8c53-e09f3f1b690a" />



