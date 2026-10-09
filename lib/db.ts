import mysql from 'mysql2/promise';

export const Connection = mysql.createPool({
  host: process.env.HOSTNAME,
  port: Number(process.env.PORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
