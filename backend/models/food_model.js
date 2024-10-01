import pool from '../db.js';
import './usermodel.js';
const createSchema = `
CREATE TABLE IF NOT EXISTS food (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NUll,
    description VARCHAR(250) NOT NULL,
    price NUMERIC(10, 2)  NOT NULL,
    image VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL
)`;

pool.query(createSchema)
    .then(res => {
        console.log('Schema created successfully');
    })
    .catch(err => {
        console.error('Error executing query', err.stack);
    })

    


export const addFood = async(name,description,price,image,category) =>{
    const query = `
        INSERT INTO food (name,description, price, image, category)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [name,description, price, image, category];

    try {
        const res = await pool.query(query,values);
        return {success: "true", message: "food Added",data:res.rows[0]};
    } catch (error) {
        console.error('Error adding food', error.stack);
        return {success: "false", message: "Error"};
    }
};
export const foods = async()=>{
    try {
        const result= await pool.query('select * from food;');
        return result.rows;
    } catch (error) {
        console.log(error.stack);
    }
}