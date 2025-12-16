const express = require('express');
const router = express.Router();
const data = require('../data/queries'); 
const create = require('../data/create');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
  try {
    const { name, surname, password } = req.body;

    if (!password || !name || !surname) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 3. Check if user already exists
    // Re-using existing data.getUser function
    // const existingUser = await data.getUser(alias);
    // if (existingUser) {
    //   return res.status(409).json({ error: 'User already exists' });
    // }

    // 4. Hash 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. Create the user in the database
    const newUser = await create.createUser(name, surname, generateAlias(name), hashedPassword);
    console.log('New user created:', newUser);

    // 7. Send success response
    res.status(201).json({
      message: newUser.message,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// WARNING: This solution doesn't scale. Please use a more robust method in production.
function generateAlias(name){
  const rand = Math.floor(Math.random() * 90) + 10;

  return name + rand;
}

module.exports = router;