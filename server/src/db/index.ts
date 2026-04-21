import mysql from "mysql2/promise"

export const pool = mysql.createPool({
    port:Number(process.env.DB_PORT),
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
    timezone: "+07:00"
})