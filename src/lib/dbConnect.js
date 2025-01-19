import mysql from "mysql2/promise";

let connection;

export const createConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "IT-ONLINE",
    });
  }
  return connection;
};
