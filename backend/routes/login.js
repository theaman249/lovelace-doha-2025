const express = require('express');
const router = express.Router();
const data = require('../data/queries'); 
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    try {
      const { alias, password } = req.body;

      const user = await data.getUser(alias);

      //console.log(user);

      if (!user) {
        console.log('User not found:', alias);
        return res.status(401).json({ error: 'Authentication failed: User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        console.log('Incorrect password:', password);
        return res.status(401).json({ error: 'Authentication failed: Incorrect Password' });
      }
      
      res.status(200).json({ 
        id: user.id,
        name: user.name,
        surname: user.surname,
        alias: user.alias,
      });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
        console.log(error);
    }
});

module.exports = router;


