const router = require('express').Router();
const data = require('../data/queries');

router.post('/', async (req, res) => {
    try {
        
        const { alias } = req.body; 

        const user = await data.getUser(alias);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({
            name: user.name,
            surname: user.surname,
            alias: user.alias,
            kt_balance: user.kt_balance,
            points: (await data.getUserPoints(alias)).points
        });


    } catch (error) {
        console.error('Error in /profile route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = router;