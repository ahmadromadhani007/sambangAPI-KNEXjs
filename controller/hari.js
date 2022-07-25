const express = require("express");
const router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const database = require("../config/database");

router.get("/", async (req, res) => {
  try {
    const result = await database("hari")
      .join("wilayah", "wilayah.id_wilayah", "=", "hari.id_wilayah")
      .join("shift", "shift.id_shift", "=", "hari.id_shift")
      .select("hari.*", "shift.nama_shift", "wilayah.nama_wilayah");

    return res.status(200).json({
      success: true,
      message: "Succes",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const schema = {
    nama: { type: "string", min: 3, max: 255 },
    id_shift: { type: "number" },
    id_wilayah: { type: "number" },
    status_hari: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const check = await database("hari")
      .where("nama", req.body.nama)
      .where("id_shift", req.body.id_shift)
      .where("id_wilayah", req.body.id_wilayah)
      .where("status_hari", req.body.status_hari);

    if (check.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Data sudah ada",
      });
    }

    const simpan = await database("hari").insert(req.body);
    if (simpan) {
      return res.status(201).json({
        success: true,
        message: "Success",
        data: await database("hari").where("id_hari", simpan[0]).first(),
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed",
      });
    }
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: "Terdapat yang tidak sesuai",
      error: error.sqlMessage,
      data: data,
    });
  }
});

router.get("/:id_hari", async (req, res) => {
  try {
    const result = await database("hari")
      .where("id_hari", req.params.id_hari)
      .first();
    if (result) {
      return res.status(200).json({
        status: 1,
        message: "Success",
        result: result,
      });
    } else {
      return res.status(400).json({
        status: 0,
        message: "Data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
});

router.put("/:id_hari", async (req, res) => {
  const schema = {
    nama: { type: "string", min: 3, max: 255 },
    id_shift: { type: "number", integer: true },
    id_wilayah: { type: "number" },
    status_hari: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const check = await database("hari")
      .where("nama", req.body.nama)
      .where("id_shift", req.body.id_shift)
      .where("id_wilayah", req.body.id_wilayah)
      .where("status_hari", req.body.status_hari)
      .where("id_hari", "!=", req.params.id_hari);

    if (check.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Data sudah ada",
      });
    }

    const simpan = await database("hari")
      .update(req.body)
      .where("id_hari", req.params.id_hari);
    if (simpan) {
      return res.status(201).json({
        success: true,
        message: "Berhasil diubah",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed",
      });
    }
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: "Terdapat yang tidak sesuai",
      error: error.sqlMessage,
      data: data,
    });
  }
});

module.exports = router;
