import pkg  from 'pg';
const {Pool} = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    ssl: {
      rejectUnauthorized: false,  // Use this if you don't have the server certificate
  },
  });

pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err.stack));

 export default pool; 