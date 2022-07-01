const express = require('express');
const router = express.Router();

router.use(require('../controller/pengurus'));
    
module.exports = router;