const {QueryTypes} = require('sequelize');
const sequelize = require('../database');


const bookdata = async(req,res)=>{
    try{
        const fetchbook = await sequelize.query(
            `Select * from book`,
            {type: QueryTypes.SELECT}
        );
        res.status(200).json(fetchbook);
        console.log(fetchbook);
    }
    catch(error){   
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = bookdata;