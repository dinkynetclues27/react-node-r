const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database');
const jwt = require("jsonwebtoken")
const JWT_SECRET = "dinkyjani"

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await sequelize.query(
            `SELECT * FROM user WHERE email = :email`,
            {
                replacements: { email },
                type: QueryTypes.SELECT
            }
        );

        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({
            email: user[0].email,

        }, JWT_SECRET);
        res.cookie('jwt',token, { httpOnly: true, secure: true, maxAge: 3600000 })
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = login;