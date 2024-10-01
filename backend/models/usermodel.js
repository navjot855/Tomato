import pool from '../db.js';

const userSchema = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NUll ,
    email VARCHAR(250) NOT NULL  UNIQUE,
    password VARCHAR(100) NOT NULL,
    cartData JSONB NOT NULL DEFAULT '{}'
)`;

 pool.query(userSchema)
    .then(res => {
        console.log('User Schema created successfully');
    })
    .catch(err => {
        console.error('Error executing query', err.stack);
    })

