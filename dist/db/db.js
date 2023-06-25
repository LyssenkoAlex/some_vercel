"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'default',
    password: 'fgQw1s2SWbNi',
    host: 'ep-ancient-silence-035934-pooler.ap-southeast-1.postgres.vercel-storage.com',
    port: 5432,
    database: 'verceldb',
    ssl: true
});
exports.default = pool;
//# sourceMappingURL=db.js.map