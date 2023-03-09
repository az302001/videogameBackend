require('dotenv').config()
const axios = require('axios');
// const {APIKEY}= process.env 
const {Country,Activity}= require('../db')


const bdcountrybyid = async (id)=>{ 
    try {
        const countrydbid=await Country.findByPk(id,{
            include: {
                model: Activity,
            },
        });
        return countrydbid;
    } catch (error) {
        return error
    }
}


module.exports ={
    bdcountrybyid
}


