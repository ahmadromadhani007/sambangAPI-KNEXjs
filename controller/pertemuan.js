const express = require("express");
const router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const database = require("../config/database");

router.get("/", async (req, res) => {
  try {
    const result = await database("pertemuan").select("*").first();
    return res.status(200).json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
});

router.put("/:id_pertemuan", async (req, res) => {
  const schema = {
    batas_sambang: { type: "number" },
    batas_tamu: { type: "number" },
    waktu: { type: "number" },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const check = await database("pertemuan")
      .where("batas_sambang", req.body.batas_sambang)
      .where("batas_tamu", req.body.batas_tamu)
      .where("waktu", req.body.waktu)
      .where("id_pertemuan", "!=", req.params.id_pertemuan);

    if (check.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Data sudah ada",
      });
    }

    const simpan = await database("pertemuan")
      .update(req.body)
      .where("id_pertemuan", req.params.id_pertemuan);
    if (simpan) {
      return res.status(201).json({
        success: true,
        message: "Berhasil diubah",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: res.message,
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
