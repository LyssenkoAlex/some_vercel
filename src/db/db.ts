import { Pool } from "pg";

const pool =new Pool({
    user: 'default',
    password: 'fgQw1s2SWbNi',
    host: 'ep-ancient-silence-035934-pooler.ap-southeast-1.postgres.vercel-storage.com',
    port: 5432,
    database: 'verceldb',
    ssl:true
});

export default pool;