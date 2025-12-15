const db = require('../commons/conn'); 
const data = require('../data/queries'); 


router.post('/register', async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    if (!email || !password || !name || !surname) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 3. Check if user already exists
    // Re-using existing data.getUser function
    const existingUser = await data.getUser(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // 4. Hash 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. Create the user in the database
    const newUser = await data.createUser(name, surname, email, hashedPassword);

    // 6. Generate JWT (Auto-login)
    // Using the same secret and expiry as your login route
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // 7. Send success response
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      jwt_token: token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});