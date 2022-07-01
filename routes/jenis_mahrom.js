const express = require('express');
const router = express.Router();

router.use(require('../controller/jenis_mahrom'));
    
module.exports = router;