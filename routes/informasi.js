const express = require('express');
const router = express.Router();

router.use(require('../controller/informasi'));
    
module.exports = router;