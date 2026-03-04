import { db } from "@/utils/db";

export async function GET() {
  try {
    const [rows] = await db.query("SHOW TABLES");
    return new Response(JSON.stringify({ message: "API is working!", tables: rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return new Response(JSON.stringify({ message: "Database connection failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}