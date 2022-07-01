const express = require('express');
const router = express.Router();

router.use(require('../controller/santri'));
    
module.exports = router;