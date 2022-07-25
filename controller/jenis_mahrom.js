const express = require("express");
const router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const database = require("../config/database");

router.post("/", async (req, res) => {
  const schema = {
    jenis_mahrom: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const simpan = await database("jenis_mahrom").insert(req.body);
    if (simpan) {
      return res.status(201).json({
        success: true,
        message: "Success",
        data: await database("jenis_mahrom")
          .where("id_jenis_mahrom", simpan[0])
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
    const result = await database("jenis_mahrom").select("*");
    return res.status(200).json({
      success: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id_jenis_mahrom", async (req, res) => {
  try {
    const result = await database("jenis_mahrom")
      .select("*")
      .where("id_jenis_mahrom", req.params.id_jenis_mahrom)
      .first();
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Success",
        result: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

router.put("/:id_jenis_mahrom", async (req, res) => {
  const schema = {
    jenis_mahrom: { type: "number" },
    status: { type: "string" },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const check = await database("jenis_mahrom")
      .where("jenis_mahrom", req.body.jenis_mahrom)
      .where("id_jenis_mahrom", "!=", req.params.id_jenis_mahrom);

    if (check.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Data sudah ada",
      });
    }

    const simpan = await database("jenis_mahrom")
      .update(req.body)
      .where("id_jenis_mahrom", req.params.id_jenis_mahrom);
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
