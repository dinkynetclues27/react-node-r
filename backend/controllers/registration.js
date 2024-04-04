const { QueryTypes } = require("sequelize");
const sequelize = require("../database");
const  bcrypt = require('bcrypt')
const profilepictureauthenticate = require('../middlewares/profilepictureauthenticate')

const registerdata = async(req,res)=>{
    try{
        console.log("registered data called")
        await profilepictureauthenticate(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: err });
            }

            if (!req.file) {
                return res.status(400).json({ error: "Error: No File Selected!" });
            }
    
    const {
        name,
        contact_no,
        password,
        email,
        address
      } = req.body;

      const securPass = await bcrypt.hash(password,10)

      const image = req.file.filename

   

        await sequelize.query(`Insert INTO user (name,contact_no,password,email,address,image)
        VALUES ('${name}','${contact_no}','${securPass}','${email}','${address}','${image}')`,
        {
            type:QueryTypes.INSERT,
        });
        res.status(200).json({ message: "User added successfully" });
    });
    }
    catch(error){
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = registerdata;