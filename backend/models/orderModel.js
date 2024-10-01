import pool from '../db.js';

const orderSchema = `
CREATE TABLE IF NOT EXISTS orders (
    orderId SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id),
    items JSONB NOT NULL, 
    amount NUMERIC(10,2) NOT NULL,
    address JSONB NOT NULL DEFAULT '{}',
    status VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment boolean NOT NULL DEFAULT FALSE
)`;

 pool.query(orderSchema)
    .then(res => {
        console.log('Order Schema created successfully');
    })
    .catch(err => {
        console.error('Error executing query', err.stack);
    })

