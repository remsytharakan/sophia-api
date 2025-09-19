const express = require('express');
const router = new express.Router();

router.use('/user', require('./user'));
router.use('/admin', require('./admin'));

router.use('/public/images', express.static('public/images'));
router.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Education API is running 🚀' });
});

module.exports = router;