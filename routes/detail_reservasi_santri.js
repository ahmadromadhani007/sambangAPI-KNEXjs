const express = require('express');
const router = express.Router();

router.use(require('../controller/detail_reservasi_santri'));
    
module.exports = router;