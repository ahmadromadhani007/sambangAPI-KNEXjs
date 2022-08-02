const e = require("express");
const express = require("express");
const router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
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
          "mahrom.no_kk",
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
        .andWhere("detail_mahrom.sebagai_wali", "=", "y")
        .then((data) => {
          result.santri = data;
          return result;
        });
      return res.status(200).json({
        status: true,
        message: "Success",
        data: results,
      });
    } else {
      const result = await database("detail_mahrom")
        .join("mahrom", "mahrom.id_mahrom", "=", "detail_mahrom.id_mahrom")
        .join("wali", "wali.id_wali", "=", "detail_mahrom.id_wali")
        .select(
          "mahrom.id_mahrom",
          "mahrom.no_mahrom",
          "mahrom.no_kk",
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

router.post("/", async (req, res) => {
  const schema = {
    no_mahrom: { type: "string", min: 1, max: 10 },
    no_kk: { type: "string", min: 1, max: 10 },
    id_wali: { type: "number" },
    keluarga: {
      type: "array",
      items: {
        type: "object",
        props: {
          id_wali: { type: "number" },
          sebagai_wali: { type: "string", empty: false },
        },
      },
    },
    santri: {
      type: "array",
      min: 1,
      items: {
        type: "number",
        positive: true,
        integer: true,
      },
    },
  };

  const check = v.compile(schema);

  const data = check(req.body);
  try {
    const mahrom = {
      no_mahrom: req.body.no_mahrom,
      no_kk: req.body.no_kk,
      id_wali: req.body.id_wali,
    };

    const result = await database("mahrom").insert(mahrom);

    const id_mahrom = result[0];

    for (let i = 0; i < req.body.santri.length; i++) {
      for (let j = 0; j < req.body.keluarga.length; j++) {
        const detail = {
          id_mahrom: id_mahrom,
          id_santri: req.body.santri[i],
          id_wali: req.body.keluarga[j].id_wali,
          sebagai_wali: req.body.keluarga[j].sebagai_wali,
        };

        await database("detail_mahrom").insert(detail);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Success",
    });
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: "Terdapat yang tidak sesuai",
      error: error,
      data: data,
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
