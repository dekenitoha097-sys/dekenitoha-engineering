import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function testConnection() {
  console.log("Test de connexion à la base de données...");
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("Connexion réussie ✅");
  } catch (error) {
    console.error("Erreur de connexion ❌", error);
  }
}

testConnection();