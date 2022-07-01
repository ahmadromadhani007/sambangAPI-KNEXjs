const express = require('express');
const router = express.Router();

router.use(require('../controller/lembaga'));
    
module.exports = router;