const express = require("express");
const router = express.Router();
const database = require("../config/database");

router.post("/", async (req, res) => {
  const data = req.body;
  const input = {
    ...data,
  };
  try {
    const simpan = await database("santri").insert(input);
    if (simpan) {
      return res.status(200).json({
        status: 1,
        message: "Success",
        result: {
          id_santri: simpan[0],
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

router.get("/santri/all", async (req, res) => {
  try {
    const result = await database("santri").select("*");
    return res.status(200).json({
      status: 1,
      message: "Success",
      result: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
});

router.get("/santri/one/:id_santri", async (req, res) => {
  try {
    const result = await database("santri")
      .select("*")
      .where("id_santri", req.params.id_santri)
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

router.put("/santri/edit/:id_santri", async (req, res) => {
  const data = req.body;
  try {
    const result = await database("santri")
      .where("id_santri", req.params.id_santri)
      .first();
    if (result) {
      await database("santri")
        .update(data)
        .where("id_santri", req.params.id_santri);
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
