const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/informasi/create', async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('informasi').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_informasi: simpan[0],
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

router.get('/informasi/all', async(req, res) => {
    try {
        const result = await database("informasi").select("*");
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

router.get('/informasi/one/:id_informasi', async(req, res) => {
    try {
        const result = await database("informasi").select('*').where('id_informasi', req.params.id_informasi).first();
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

router.put('/informasi/edit/:id_informasi', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('informasi').where('id_informasi', req.params.id_informasi).first();
        if (result) {
            await database('informasi').update(data).where('id_informasi', req.params.id_informasi);
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