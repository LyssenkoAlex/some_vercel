import { Pool } from "pg";
require('dotenv').config();

const pool =new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: process.env.POSTGRES_DATABASE,
    ssl:true
});

export default pool;