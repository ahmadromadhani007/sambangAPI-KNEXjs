const e = require("express");
const express = require("express");
const router = express.Router();
const database = require("../config/database");

router.get("/", async (req, res) => {
  try {
    if (req.query.no_mahrom) {
      const result = await database("detail_mahrom")
        .join("mahrom", "mahrom.id_mahrom", "=", "detail_mahrom.id_mahrom")
        .join("wali", "wali.id_wali", "=", "detail_mahrom.id_wali")
        .select(
          "mahrom.id_mahrom",
          "mahrom.no_mahrom",
          "wali.nik",
          "wali.nama_wali",
          "wali.no_telp"
        )
        .where("mahrom.no_mahrom", req.query.no_mahrom)
        .groupBy("mahrom.id_mahrom")
        .first();

      result.keluarga = await database("detail_mahrom")
        .join("wali", "wali.id_wali", "=", "detail_mahrom.id_wali")
        .select("wali.nik", "wali.nama_wali", "wali.no_telp")
        .where("detail_mahrom.sebagai_wali", "t")
        .andWhere("detail_mahrom.id_mahrom", result.id_mahrom)
        .groupBy("detail_mahrom.id_mahrom");

      const results = await database("detail_mahrom")
        .join("mahrom", "mahrom.id_mahrom", "=", "detail_mahrom.id_mahrom")
        .join("santri", "santri.id_santri", "=", "detail_mahrom.id_santri")
        .join("wilayah", "wilayah.id_wilayah", "=", "santri.id_wilayah")
        .join("lembaga", "lembaga.id_lembaga", "=", "santri.id_lembaga")
        .select(
          "santri.id_santri",
          "santri.nama",
          "wilayah.nama_wilayah",
          "lembaga.nama_lembaga"
        )
        .where("mahrom.id_mahrom", "=", result.id_mahrom)
        .andWhere("detail_mahrom.sebagai_wali", "=", "y");

      results.forEach((item, index) => {
        result.santri = item;
      });
      return res.status(200).json({
        status: true,
        message: "Success",
        data: result,
      });
    } else {
      const result = await database("detail_mahrom")
        .join("mahrom", "mahrom.id_mahrom", "=", "detail_mahrom.id_mahrom")
        .join("wali", "wali.id_wali", "=", "detail_mahrom.id_wali")
        .select(
          "mahrom.id_mahrom",
          "mahrom.no_mahrom",
          "wali.nik",
          "wali.nama_wali",
          "wali.no_telp"
        )
        .groupBy("mahrom.id_mahrom");

      result.forEach(async (item) => {
        item.keluarga = await database("detail_mahrom")
          .join("wali", "wali.id_wali", "=", "detail_mahrom.id_wali")
          .select("wali.nik", "wali.nama_wali", "wali.no_telp")
          .where("detail_mahrom.sebagai_wali", "t")
          .andWhere("detail_mahrom.id_mahrom", item.id_mahrom)
          .groupBy("detail_mahrom.id_mahrom");
      });

      Promise.all(
        result.map((item) =>
          database("detail_mahrom")
            .join("mahrom", "mahrom.id_mahrom", "=", "detail_mahrom.id_mahrom")
            .join("santri", "santri.id_santri", "=", "detail_mahrom.id_santri")
            .join("wilayah", "wilayah.id_wilayah", "=", "santri.id_wilayah")
            .join("lembaga", "lembaga.id_lembaga", "=", "santri.id_lembaga")
            .select(
              "santri.id_santri",
              "santri.nama",
              "wilayah.nama_wilayah",
              "lembaga.nama_lembaga"
            )
            .where("mahrom.id_mahrom", "=", item.id_mahrom)
            .andWhere("detail_mahrom.sebagai_wali", "=", "y")
        )
      ).then((results) => {
        results.forEach((item, index) => {
          result[index].santri = item;
        });
        return res.status(200).json({
          status: true,
          message: "Success",
          data: result,
        });
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/mahrom?no_mahrom=2110001", async (req, res) => {
  const data = req.body;
  const input = {
    ...data,
  };
  try {
    const simpan = await database("mahrom").insert(input);
    if (simpan) {
      return res.status(200).json({
        status: 1,
        message: "Success",
        result: {
          id_mahrom: simpan[0],
          ...input,
        },
      });
    } else {
      return res.status(400).json({
        status: 0,
        message: "Failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
});

router.get("/mahrom/one/:id_mahrom", async (req, res) => {
  try {
    const result = await database("mahrom")
      .select("*")
      .where("id_mahrom", req.params.id_mahrom)
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

router.put("/mahrom/edit/:id_mahrom", async (req, res) => {
  const data = req.body;
  try {
    const result = await database("mahrom")
      .where("id_mahrom", req.params.id_mahrom)
      .first();
    if (result) {
      await database("mahrom")
        .update(data)
        .where("id_mahrom", req.params.id_mahrom);
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

module.exports = router;
