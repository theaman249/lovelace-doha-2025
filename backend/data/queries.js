const db = require('../commons/conn'); 
const dbName = "education_for_integrity";

const USER_NOT_FOUND = 'user not found';

const subject_points = 5;
const assessment_points = 3;
const unit_points = 2;

async function getUser(alias){
    const query = 'SELECT * FROM users WHERE alias = $1';

    try {
        const { rows } = await db.query(query, [alias]);

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

async function getPoints(contextName, userId) {
    const query = `
        SELECT points 
        FROM ${contextName}
        WHERE user_id = $1
    `;

    try {
        const { rows } = await db.query(query, [userId]);
        
        if (rows.length > 0) {
            return rows[0].points;
        }

        return 0;
    } catch (error) {
        console.error('Error fetching points:', error);
        throw error;
    }
}

async function getUserPoints(alias) {

    const user = await getUser(alias);

    console.log('Fetched user:', user);
    console.log('Alias provided:', alias);
    
    if (!user) {
        return{
            timestamp: new Date(),
            status: "not found",
            points: 0
        }
    }

    const arr_contexts = [
        "introduction_to_corruption_unit1_points",
        "introduction_to_corruption_quiz1_points",
        "introduction_to_corruption_matchab_points",
        "introduction_to_corruption_unit2_points",
        "introduction_to_corruption_unit3_points"
    ];

    let points = 0;

    for(let i=0; i<arr_contexts.length; i++){
        const context = arr_contexts[i];
        points = points + await getPoints(context, user.id);
    }

    return {
        timestamp: new Date(),
        status: 'success',
        points: points
    };

}

async function addPoints(contextName, userId) {
    let pointsToAdd = 0;

    // check if user already has points for this assessment/unit/topic 
    const userHasPoints = await getPoints(contextName, userId);

    if (userHasPoints > 0) {
        return {
            points: userHasPoints,
            status: 'has points'
        };
    }

    if (contextName.indexOf("unit") > -1) {
        pointsToAdd = unit_points;
    } else if (contextName.indexOf("quiz") > -1 || contextName.indexOf("matchab") > -1 || contextName.indexOf("draganddrop") > -1) {
        pointsToAdd = assessment_points;
    } else {
        pointsToAdd = subject_points;
    }

    console.log(`Adding ${pointsToAdd} points for user ${userId} in context ${contextName}`);
    
    const insertQuery = `
        INSERT INTO ${contextName} (user_id, points)
        VALUES ($1, $2)
    `;

    console.log('Insert Query:', insertQuery);

    try {
        await db.query(insertQuery, [userId, pointsToAdd]);

        return {
            points: pointsToAdd,
            status: 'success'
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
    addPoints,
    getUserPoints
};