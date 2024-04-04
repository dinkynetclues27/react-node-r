require('dotenv').config();
const sequelize = require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors())
const path = require("path")
const routers = require('./routes/route')
const port = process.env.PORT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/public/assets", express.static(path.join(__dirname, 'public', 'assets')))
app.use(routers);
sequelize;
app.listen(port, () => {
    console.log("Server is running on port 4000");
  });

