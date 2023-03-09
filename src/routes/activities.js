const{Router}=require('express')
// const {getallbyname,allInfo}=require('../controllers/videogames')
const router= Router()
const {Country,Activity}= require('../db')
const { Op } = require('sequelize');

router.get('/',async(req,res)=>{
    try {
        let activities = await Activity.findAll({
            include: {
                model:Country
            },
        });
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/',async (req,res) =>{
    const {name, difficulty, duration, season, countries} = req.body
    // console.log(req.body)
    console.log(name, difficulty, duration, season, countries)
    try{
        if(name && difficulty && duration && season ){
            const act = await Activity.create({
                name,
                difficulty,
                duration,
                season
            }) 
           

            let relation= await Country.findAll({where:{name:countries}})
            act.addCountries(relation)
            return res.status(201).send('Se creo la actividad correctamente') 
        }
    } catch (err) { console.log(err) }
})

module.exports =router