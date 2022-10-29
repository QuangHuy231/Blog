import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "huycool2311",
  database: "blog",
});
export default db;
