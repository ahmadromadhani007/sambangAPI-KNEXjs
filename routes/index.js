const express = require('express');
const router = express.Router();

router.use("/",require('./detail_reservasi_santri'));
router.use("/",require('./detail_reservasi_wali'));
router.use("/",require('./hari'));
router.use("/",require('./informasi'));
router.use("/",require('./jenis_mahrom'));
router.use("/",require('./lembaga'));
router.use("/",require('./mahrom'));
router.use("/",require('./pengurus'));
router.use("/",require('./pertemuan'));
router.use("/",require('./reservasi'));
router.use("/",require('./santri'));
router.use("/",require('./shift'));
router.use("/",require('./wilayah'));

module.exports = router;
