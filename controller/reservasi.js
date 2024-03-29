const express = require('express');
const router = express.Router();
const database = require('../config/database');

// router.get('/reservasi/all/:id_hari', async(req, res) => {
//     try {
//         const result = await database('reservasi')
//         .leftOuterJoin('hari','hari.id_hari','reservasi.id_hari')
//         .select('reservasi.*','hari.nama')
//         .where('reservasi.id_hari',req.params.id_hari);
//         if (result.length > 0){
//             return res.status(200).json({
//                 status: 1,
//                 message: "Success",
//                 data: result
//         })
//     } else {
//         return res.status(400).json({
//             status: 0,
//             message: "Data not found",
//         })
//     }

// } catch (error) {
//         return res.status(500).json({
//             status:0,
//             message: error.message
//         })
//     }
// });

router.post('/reservasi', async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('reservasi').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_reservasi: simpan[0],
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

router.get('/reservasi/all', async(req, res) => {
    try {
        const result = await database("reservasi").select("*");
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

router.get('/reservasi/:id_reservasi', async(req, res) => {
    try {
        const result = await database("reservasi").select('*').where('id_reservasi', req.params.id_reservasi).first();
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

router.put('/reservasi/:id_reservasi', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('reservasi').where('id_reservasi', req.params.id_reservasi).first();
        if (result) {
            await database('reservasi').update(data).where('id_reservasi', req.params.id_reservasi);
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