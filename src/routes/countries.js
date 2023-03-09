const{Router}=require('express')
const {Getcountrybyname,GetBDinfo}=require('../controllers/countries')
const router= Router()
const {Country,Activity}= require('../db')

router.get('/',async (req,res)=>{
    const {name}=req.query
    console.log(name)

    try {
        if(name){
            let allcountriesbyname=await Getcountrybyname(name)
            return res.status(200).json(allcountriesbyname)
        }

        let allcountries= await GetBDinfo()
        res.status(200).json(allcountries)
    } catch (error) {
        console.error(error)
    }
})

module.exports= router