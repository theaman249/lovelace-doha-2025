const express = require('express');
const router = express.Router();
const data = require('../data/queries'); 

// router.post('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: 'Login successful'
//     });
// });

// module.exports = router;

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await data.getUser(email);

      //console.log(user);

      if (!user) {
        console.log('User not found:', email);
        return res.status(401).json({ error: 'Authentication failed: User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        console.log('Incorrect password:', password);
        return res.status(401).json({ error: 'Authentication failed: Incorrect Password' });
      }
      
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',});

      res.status(200).json({ 
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        jwt_token: token
      });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
        console.log(error);
    }
});


