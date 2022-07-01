const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/pertemuan/create', async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('pertemuan').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_pertemuan: simpan[0],
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

router.get('/pertemuan/all', async(req, res) => {
    try {
        const result = await database("pertemuan").select("*");
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

router.get('/pertemuan/one/:id_pertemuan', async(req, res) => {
    try {
        const result = await database("pertemuan").select('*').where('id_pertemuan', req.params.id_pertemuan).first();
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

router.put('/pertemuan/edit/:id_pertemuan', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('pertemuan').where('id_pertemuan', req.params.id_pertemuan).first();
        if (result) {
            await database('pertemuan').update(data).where('id_pertemuan', req.params.id_pertemuan);
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