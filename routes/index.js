const express = require("express");
const router = express.Router();

router.use("/hari", require("./hari"));
router.use("/shift", require("./shift"));
router.use("/santri", require("./santri"));
router.use("/controller", require("./detail_reservasi_santri"));
router.use("/controller", require("./detail_reservasi_wali"));
router.use("/controller", require("./informasi"));
router.use("/controller", require("./jenis_mahrom"));
router.use("/controller", require("./lembaga"));
router.use("/controller", require("./mahrom"));
router.use("/controller", require("./pengurus"));
router.use("/controller", require("./pertemuan"));
router.use("/controller", require("./reservasi"));
router.use("/controller", require("./wilayah"));

module.exports = router;
