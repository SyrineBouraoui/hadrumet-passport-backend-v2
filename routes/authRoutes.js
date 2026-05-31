const express = require('express');
const router = express.Router();
const { loginEP, registerEP } = require('../controllers/authController');
const authenticateToken = require('../middleware/authmiddleware');
const { getById } = require('../utils/fileHelper');

// Public routes
router.post('/login', loginEP);
router.post('/register', registerEP);

// Protected routes
router.use(authenticateToken);

router.get('/me', async (req, res) => {
  const user = await getById('users', 'application_id', req.user.applicationId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
});

module.exports = router;