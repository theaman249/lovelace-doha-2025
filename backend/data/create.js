const db = require('../commons/conn'); 
const USER_CREATED_SUCCESSFULLY = 'User created successfully';

async function createUser(name, surname, alias, hashedPassword) {
    const query = `
        INSERT INTO users (name, surname, alias, password)
        VALUES ($1, $2, $3, $4)
    `;  

    try {
        await db.query(query, [name, surname, alias, hashedPassword]);
        
        return{
            message: USER_CREATED_SUCCESSFULLY,
        };

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }

}

module.exports = {
    createUser,
};