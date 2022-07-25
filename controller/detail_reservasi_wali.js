const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/detail_reservasi_wali', async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('detail_reservasi_wali').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_detail_reservasi_wali: simpan[0],
                    ...input
                }
            })   
    } else {
        return res.status(400).json({
            status: 0,
            message: "Failed",
        })
    }

} catch (error) {
        return res.status(500).json({
            status:0,
            message: error.message
        })
    }
});

router.get('/detail_reservasi_wali/all', async(req, res) => {
    try {
        const result = await database("detail_reservasi_wali").select("*");
        return res.status(200).json({
            status: 1,
            message: "Success",
            result: result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message
        });
    }
});

router.get('/detail_reservasi_wali/:id_detail_reservasi_wali', async(req, res) => {
    try {
        const result = await database("detail_reservasi_wali").select('*').where('id_detail_reservasi_wali', req.params.id_detail_reservasi_wali).first();
        if (result) {
            return res.status(200).json({
                status: 1,
                message: "Success",
                result : result
            })
        } else { 
            return res.status(400).json({
                status: 0,
                message: "Data not found",
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            status:0,
            message: error.message
        })
    }
});

router.put('/detail_reservasi_wali/:id_detail_reservasi_wali', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('detail_reservasi_wali').where('id_detail_reservasi_wali', req.params.id_detail_reservasi_wali).first();
        if (result) {
            await database('detail_reservasi_wali').update(data).where('id_detail_reservasi_wali', req.params.id_detail_reservasi_wali);
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: result
            })  
        }else {
            return res.status(400).json({
                status: 0,
                message: "Data not found",
            })
        }

} catch (error) {
        return res.status(500).json({
            status:0,
            message: error.message
        })
    }
});

module.exports = router;