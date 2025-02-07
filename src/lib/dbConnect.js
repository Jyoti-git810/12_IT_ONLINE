import mysql from "mysql2/promise";

let pool;

export const createConnection = async () => {
  if (!pool) {
    pool = await mysql.createPool({
      host: "localhost",
      user: "root",
      database: "IT-ONLINE",
      waitForConnections: true,
      connectionLimit: 10, // Adjust as needed
    });
  }
  return pool;
};
