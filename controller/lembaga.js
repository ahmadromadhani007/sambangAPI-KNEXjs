const express = require("express");
const router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const database = require("../config/database");

router.post("/", async (req, res) => {
  const schema = {
    nama_lembaga: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const simpan = await database("lembaga").insert(req.body);
    if (simpan) {
      return res.status(201).json({
        success: true,
        message: "Success",
        data: await database("lembaga").where("id_lembaga", simpan[0]).first(),
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
    const result = await database("lembaga").select("*");
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

router.get("/:id_lembaga", async (req, res) => {
  try {
    const result = await database("lembaga")
      .select("*")
      .where("id_lembaga", req.params.id_lembaga)
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
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

router.put("/:id_lembaga", async (req, res) => {
  const schema = {
    nama_lembaga: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const check = await database("lembaga")
      .where("nama_lembaga", req.body.nama_lembaga)
      .where("id_lembaga", "!=", req.params.id_lembaga);

    if (check.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Data sudah ada",
      });
    }

    const simpan = await database("lembaga")
      .update(req.body)
      .where("id_lembaga", req.params.id_lembaga);
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
