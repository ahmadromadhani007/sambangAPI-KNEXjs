const express = require('express');
const router = express.Router();

router.use(require('../controller/detail_reservasi_wali'));
    
module.exports = router;