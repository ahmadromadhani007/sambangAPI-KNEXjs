const express = require('express');
const router = express.Router();

router.use(require('../controller/reservasi'));
    
module.exports = router;