const { Client } = require('pg');

const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

(async () => {
    const client = new Client({
        user: process.env.PG_USER_NAME,
        host: process.env.PG_HOST,
        password: process.env.PG_PASSWORD,
        port: process.PG_PORT,
    });

    try {

        console.log(`Running Database script...`);

        await client.connect();
        
        const dbName = 'education_for_entegrity';

        // Check if the database exists
        const result = await client.query(
            `SELECT datname FROM pg_database WHERE datname = $1`, [dbName]
        );

        if (result.rows.length > 0) {
            console.log(`Database "${dbName}" already exists.`);
        } 
        else {
            console.log(`Database "${dbName}" does not exist. Creating...`);
            await client.query(`CREATE DATABASE ${dbName}`);
        }
        
        await client.end(); 

        const dbClient = new Client({
            user: process.env.PG_USER_NAME,
            host: process.env.PG_HOST,
            password: process.env.PG_PASSWORD,
            port: process.PG_PORT,
            database: dbName, // Now connect to "genesis"
        });

        await dbClient.connect();

        // Create tables
        await dbClient.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                surname VARCHAR(100) NOT NULL,
                alias VARCHAR(100),
                password VARCHAR(255) NOT NULL,
                kt_balance DOUBLE PRECISION DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS introduction_questions (
                id SERIAL PRIMARY KEY,
                questions TEXT,
                answers JSONB
            );

            CREATE TABLE IF NOT EXISTS introduction_to_corruption_unit1_points(
                user_id INTEGER REFERENCES users(id),
                points INTEGER
            );

            CREATE TABLE IF NOT EXISTS introduction_to_corruption_Quiz1_points(
                user_id INTEGER REFERENCES users(id),
                points INTEGER
            );

            CREATE TABLE IF NOT EXISTS introduction_to_corruption_MatchAB_points(
                user_id INTEGER REFERENCES users(id),
                points INTEGER
            );

            CREATE TABLE IF NOT EXISTS introduction_to_corruption_unit2_points(
                user_id INTEGER REFERENCES users(id),
                points INTEGER
            );

            CREATE TABLE IF NOT EXISTS introduction_to_corruption_unit3_points(
                user_id INTEGER REFERENCES users(id),
                points INTEGER
            );
            `
        );

        console.log('tables created successfully.');

        await dbClient.end();
        
        
    } catch (error) {
        console.error('Error:', error);
        process.exit(1); 
    }
})();