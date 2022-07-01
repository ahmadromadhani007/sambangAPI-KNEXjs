const express = require('express');
const router = express.Router();

router.use(require('../controller/pertemuan'));
    
module.exports = router;