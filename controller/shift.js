const express = require("express");
const router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const database = require("../config/database");

router.get("/", async (req, res) => {
  try {
    const result = await database("shift").select("*");
    return res.status(200).json({
      status: 1,
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

router.post("/", async (req, res) => {
  const schema = {
    nama_shift: { type: "string", min: 3, max: 255 },
    jam_mulai: { type: "string", min: 3, max: 255 },
    jam_selesai: { type: "string", min: 3, max: 255 },
    kapasitas: { type: "number" },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const simpan = await database("shift").insert(req.body);
    if (simpan) {
      return res.status(201).json({
        success: true,
        message: "Success",
        data: await database("shift").where("id_shift", simpan[0]).first(),
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

router.get("/:id_shift", async (req, res) => {
  try {
    const result = await database("shift")
      .select("*")
      .where("id_shift", req.params.id_shift)
      .first();
    if (result) {
      return res.status(200).json({
        status: 1,
        message: "Success",
        data: result,
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

router.put("/:id_shift", async (req, res) => {
  const schema = {
    nama_shift: { type: "string", min: 3, max: 255 },
    jam_mulai: { type: "string", min: 3, max: 255 },
    jam_selesai: { type: "string", min: 3, max: 255 },
    kapasitas: { type: "number" },
    status: { type: "string" },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const check = await database("shift")
      .where("nama_shift", req.body.nama_shift)
      .where("jam_mulai", req.body.jam_mulai)
      .where("jam_selesai", req.body.jam_selesai)
      .where("kapasitas", req.body.kapasitas)
      .where("status", req.body.status)
      .where("id_shift", "!=", req.params.id_shift);

    if (check.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Data sudah ada",
      });
    }

    const simpan = await database("shift")
      .update(req.body)
      .where("id_shift", req.params.id_shift);
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
