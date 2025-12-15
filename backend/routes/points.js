const express = require('express');
const router = express.Router();
const data = require('../data/queries'); 

router.post('/', async (req, res) => {
    try {
        const { user_id, context_name, points } = req.body;

        let result = await data.addPoints(context_name, user_id);
        
        return res.status(200).json({
            points: result.points,
            status: result.status
        });

    } catch (error) {
        console.error('Error in /points route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;