const express = require("express");
const router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const database = require("../config/database");

router.post("/", async (req, res) => {
  const schema = {
    uid_santri: { type: "string", min: 3, max: 255 },
    nis: { type: "string", min: 3, max: 255 },
    id_wilayah: { type: "number" },
    id_lembaga: { type: "number" },
    nama: { type: "string", min: 3, max: 255 },
    jenkel: { type: "string" },
    alamat: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const simpan = await database("santri").insert(req.body);
    if (simpan) {
      return res.status(201).json({
        success: true,
        message: "Success",
        data: await database("santri").where("id_santri", simpan[0]).first(),
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
    const result = await database("santri")
      .join("wilayah", "wilayah.id_wilayah", "=", "santri.id_wilayah")
      .join("lembaga", "lembaga.id_lembaga", "=", "santri.id_lembaga")
      .select("santri.*", "wilayah.nama_wilayah", "lembaga.nama_lembaga");
    return res.status(200).json({
      success: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id_santri", async (req, res) => {
  try {
    const result = await database("santri")
      .join("wilayah", "wilayah.id_wilayah", "=", "santri.id_wilayah")
      .join("lembaga", "lembaga.id_lembaga", "=", "santri.id_lembaga")
      .join("mahrom", "mahrom.id_mahrom", "=", "santri.id_mahrom")
      .select(
        "santri.*",
        "wilayah.nama_wilayah",
        "lembaga.nama_lembaga",
        "mahrom.nama_mahrom"
      )
      .where("santri.id_santri", req.params.id_santri)
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

router.put("/:id_santri", async (req, res) => {
  const schema = {
    uid_santri: { type: "string", min: 3, max: 255 },
    nis: { type: "string", min: 3, max: 255 },
    id_wilayah: { type: "number" },
    id_lembaga: { type: "number" },
    nama: { type: "string", min: 3, max: 255 },
    jenkel: { type: "string" },
    alamat: { type: "string", min: 3, max: 255 },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const check = await database("santri")
      .where("uid_santri", req.body.uid_santri)
      .where("nis", req.body.nis)
      .where("id_wilayah", req.body.id_wilayah)
      .where("id_lembaga", req.body.id_lembaga)
      .where("nama", req.body.nama)
      .where("jenkel", req.body.jenkel)
      .where("id_santri", "!=", req.params.id_santri);

    if (check.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Data sudah ada",
      });
    }

    const simpan = await database("santri")
      .update(req.body)
      .where("id_santri", req.params.id_santri);
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
