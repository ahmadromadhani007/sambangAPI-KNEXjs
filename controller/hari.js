const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/hari/create', async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('hari').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_hari: simpan[0],
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

router.get('/hari/all', async(req, res) => {
    try {
        const result = await database("hari").select("*");
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

router.get('/hari/one/:id_hari', async(req, res) => {
    try {
        const result = await database("hari").select('*').where('id_hari', req.params.id_hari).first();
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

router.put('/hari/edit/:id_hari', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('hari').where('id_hari', req.params.id_hari).first();
        if (result) {
            await database('hari').update(data).where('id_hari', req.params.id_hari);
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