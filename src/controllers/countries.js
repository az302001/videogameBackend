require('dotenv').config()
const axios = require('axios');
const { Country, Activity} = require('../db')
const { Op } = require('sequelize');


const GetApiInfo = async () => {
    try {
            const response= await axios.get(`https://restcountries.com/v3/all`)
            console.log(response.data.length)
            
          const datamapeo= await response.data?.map(v=>{
               return  { 
                    // id: v.ccn3,
                    name: v.name.common,
                    flags:v.flags[0],
                    continents:v.continents[0],
                    capital:v.capital != null ? v.capital[0] : "capital no encontrada",
                    subregión:v.subregion,
                    area:v.area,
                    población:v.population
                }
            })



         return datamapeo
    } catch (err) {
        console.error(err);
        return ("sin datos")
    }
}

const GetBDinfo= async () => {
    try {
        const bdinfo= await Country.findAll({
            include:{
                model:Activity
            }
        })
        if(bdinfo.length){
            return bdinfo
        }else{
            const data= await GetApiInfo()
            // console.log(data)
            await Country.bulkCreate(data)

            return GetBDinfo()
        }

    } catch (error) {
        console.log(error)
    }
}


const Getcountrybyname = async (name) => {
   try {
        const countrybyname= await Country.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
        return countrybyname
   } catch (error) {
    
   }
}

module.exports = {
    GetApiInfo ,
    Getcountrybyname,
    GetBDinfo,
}