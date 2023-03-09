const{Router}=require('express')
const {bdcountrybyid}= require('../controllers/countrie')
const router= Router()

router.get('/:id',async (req,res)=>{
    const {id}=req.params
    try {
        let countrybyid= await bdcountrybyid(id)
        res.status(200).json(countrybyid)
    } catch (error) {
        res.status(500).json({error: error})
    }
})


module.exports = router;