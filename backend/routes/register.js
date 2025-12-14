const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Register successful'
    });
});

module.exports = router;