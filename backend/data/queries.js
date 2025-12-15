const db = require('../commons/conn'); 
const dbName = "education_for_integrity";

const subject_points = 5;
const assessment_points = 3;
const unit_points = 2;
   


async function getUser(email){
    const query = 'SELECT * FROM users WHERE email = $1';

    try {
        const { rows } = await db.query(query, [email]);

        return rows[0]; // return single user
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

async function getAllUsers() {

    const query = 'SELECT * FROM users';

    try {
        const { rows } = await db.query(query);

        return rows;

    } catch (error) {
        console.error('Error querying the database:', error);
    }
}


async function healthCheck() {
    try{
        
        const result = await db.query(
            `SELECT datname FROM pg_database WHERE datname = $1`, [dbName]
        );

        if (result.rows.length > 0) {
            console.log(`Database "${dbName}" exists.`);
            return true;
        } 
        else {
            console.log(`Database "${dbName}" does not exist.`);
            return false
        }
    }
    catch(error){
        console.error('Error querying the database:', error);
        return false;
    }
}

//getpoints (topic/unit/assessment name, assessment identifier, user)

async function getPoints(contextName, contextId, userID) {
    const query = `
        SELECT points 
        FROM xxx
        WHERE user_id = $1 AND context_name = $2 AND context_id = $3
    `;

    try {
        const { rows } = await db.query(query, [userId, contextName, contextId]);
        
        if (rows.length > 0) {
            return rows[0].points;
        }
        return 0; // Default to 0 if they haven't started this assessment yet
    } catch (error) {
        console.error('Error fetching points:', error);
        throw error;
    }
}

async function addPoints(contextName, contextId, userId) {
    let pointsToAdd = 0;

    if (indexOf(contextName, "unit") > -1) {
        pointsToAdd = unit_points;
    } else if (indexOf(contextName, "assessment") > -1) {
        pointsToAdd = assessment_points;
    } else {
        pointsToAdd = subject_points;
    }
    
    const insertQuery = `
        INSERT INTO xxx (user_id, context_name, context_id, points)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, context_name, context_id)
        DO NOTHING
        RETURNING points;
    `;

    try {
        const { rows } = await db.query(insertQuery, [userId, contextName, contextId, pointsToAdd]);

        if (rows.length > 0) {
            return { 
                points: rows[0].points, 
                status: 'created' 
            };
        }

        // Case B: The Insert was ignored (User already had a score)
        // fetch the existing score
        const existingScore = await getPoints(contextName, contextId, userId);
        
        return { 
            points: existingScore, 
            status: 'ignored'
        };

    } catch (error) {
        console.error('Error adding points:', error);
        throw error;
    }
}


module.exports = {
    getUser,
    getAllUsers,
    healthCheck,
    getPoints,
    addPoints
};