const express = require('express');
const router = express.Router();

router.use(require('../controller/hari'));
    
module.exports = router;