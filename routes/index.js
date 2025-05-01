const express = require('express');
const router = express.Router();
const postsRoutes = require('./posts');

// ✅ Handle homepage
router.get('/', (req, res) => {
  res.render('home', { title: 'My Blog' });
});

// ✅ Mount /posts routes
router.use('/posts', postsRoutes);

module.exports = router;
