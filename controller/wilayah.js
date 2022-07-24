const express = require("express");
const router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const database = require("../config/database");

router.post("/", async (req, res) => {
  const schema = {
    nama_wilayah: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const simpan = await database("wilayah").insert(req.body);
    if (simpan) {
      return res.status(201).json({
        success: true,
        message: "Success",
        data: await database("wilayah").where("id_wilayah", simpan[0]).first(),
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
    const result = await database("wilayah").select("*");
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

router.get("/:id_wilayah", async (req, res) => {
  try {
    const result = await database("wilayah")
      .select("*")
      .where("id_wilayah", req.params.id_wilayah)
      .first();
    if (result) {
      return res.status(200).json({
        status: true,
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
    return res.status(400).json({
      status: 0,
      message: error.message,
    });
  }
});

router.put("/:id_wilayah", async (req, res) => {
  const schema = {
    nama_wilayah: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const check = await database("wilayah")
      .where("nama_wilayah", req.body.nama_wilayah)
      .where("id_wilayah", "!=", req.params.id_wilayah);

    if (check.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Data sudah ada",
      });
    }

    const simpan = await database("wilayah")
      .update(req.body)
      .where("id_wilayah", req.params.id_wilayah);
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
