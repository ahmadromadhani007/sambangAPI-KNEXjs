const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/wilayah/create', async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('wilayah').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_wilayah: simpan[0],
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

router.get('/wilayah/all', async(req, res) => {
    try {
        const result = await database("wilayah").select("*");
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

router.get('/wilayah/one/:id_wilayah', async(req, res) => {
    try {
        const result = await database("wilayah").select('*').where('id_wilayah', req.params.id_wilayah).first();
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

router.put('/wilayah/edit/:id_wilayah', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('wilayah').where('id_wilayah', req.params.id_wilayah).first();
        if (result) {
            await database('wilayah').update(data).where('id_wilayah', req.params.id_wilayah);
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