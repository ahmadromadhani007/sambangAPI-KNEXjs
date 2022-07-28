const express = require("express");
const router = express.Router();

// Master Data
router.use("/hari", require("./hari"));
router.use("/shift", require("./shift"));
router.use("/santri", require("./santri"));
router.use("/wilayah", require("./wilayah"));
router.use("/lembaga", require("./lembaga"));
router.use("/informasi", require("./informasi"));
router.use("/pertemuan", require("./pertemuan"));
router.use("/jenis-mahrom", require("./jenis_mahrom"));
router.use("/mahrom", require("./mahrom"));

// router.use("/controller", require("./detail_reservasi_santri"));
// router.use("/controller", require("./detail_reservasi_wali"));
router.use("/controller", require("./pengurus"));
router.use("/controller", require("./reservasi"));

module.exports = router;
