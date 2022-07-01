const express = require('express');
const router = express.Router();

router.use(require('../controller/shift'));
    
module.exports = router;