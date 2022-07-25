const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/lembaga', async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('lembaga').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_lembaga: simpan[0],
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

router.get('/lembaga/all', async(req, res) => {
    try {
        const result = await database("lembaga").select("*");
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

router.get('/lembaga/:id_lembaga', async(req, res) => {
    try {
        const result = await database("lembaga").select('*').where('id_lembaga', req.params.id_lembaga).first();
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

router.put('/lembaga/:id_lembaga', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('lembaga').where('id_lembaga', req.params.id_lembaga).first();
        if (result) {
            await database('lembaga').update(data).where('id_lembaga', req.params.id_lembaga);
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