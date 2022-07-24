const express = require("express");
const router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const database = require("../config/database");

router.post("/", async (req, res) => {
  const schema = {
    nama_informasi: { type: "string", min: 3, max: 255 },
    detail_informasi: { type: "string" },
    tanggal_mulai: { type: "string", min: 3, max: 255 },
    tanggal_akhir: { type: "string", min: 3, max: 255 },
    status: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const simpan = await database("informasi").insert(req.body);
    if (simpan) {
      return res.status(201).json({
        success: true,
        message: "Success",
        data: await database("informasi")
          .where("id_informasi", simpan[0])
          .first(),
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

router.get("/", async (req, res) => {
  try {
    const result = await database("informasi").select("*");
    return res.status(200).json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

router.get("/:id_informasi", async (req, res) => {
  try {
    const result = await database("informasi")
      .select("*")
      .where("id_informasi", req.params.id_informasi)
      .first();
    if (result) {
      return res.status(200).json({
        status: true,
        message: "Success",
        data: result,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

router.put("/:id_informasi", async (req, res) => {
  const schema = {
    nama_informasi: { type: "string", min: 3, max: 255 },
    detail_informasi: { type: "string", min: 3, max: 255 },
    tanggal_mulai: { type: "string", min: 3, max: 255 },
    tanggal_akhir: { type: "string", min: 3, max: 255 },
    status: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const check = await database("informasi")
      .where("nama_informasi", req.body.nama_informasi)
      .where("detail_informasi", req.body.detail_informasi)
      .where("tanggal_mulai", req.body.tanggal_mulai)
      .where("tanggal_akhir", req.body.tanggal_akhir)
      .where("status", req.body.status)
      .where("id_informasi", "!=", req.params.id_informasi);

    if (check.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Data sudah ada",
      });
    }

    const simpan = await database("informasi")
      .update(req.body)
      .where("id_informasi", req.params.id_informasi);
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
