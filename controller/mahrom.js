const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/mahrom/create', async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('mahrom').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_mahrom: simpan[0],
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

router.get('/mahrom/all', async(req, res) => {
    try {
        const result = await database("mahrom").select("*");
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

router.get('/mahrom/one/:id_mahrom', async(req, res) => {
    try {
        const result = await database("mahrom").select('*').where('id_mahrom', req.params.id_mahrom).first();
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

router.put('/mahrom/edit/:id_mahrom', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('mahrom').where('id_mahrom', req.params.id_mahrom).first();
        if (result) {
            await database('mahrom').update(data).where('id_mahrom', req.params.id_mahrom);
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