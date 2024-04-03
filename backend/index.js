// require('dotenv').config();
// const sequelize = require('./database');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();

// app.use(cors())
// const path = require("path")
// const routers = require('./routes/route')
// const port = process.env.PORT
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use("/public/assets", express.static(path.join(__dirname, 'public', 'assets')))
// app.use(routers);
// sequelize;
// app.listen(port, () => {
//     console.log("Server is running on port 4000");
//   });

// index.js

require('dotenv').config();
const cors = require('cors')
const express = require('express');
const sequelize = require('./database');
const routers = require('./routes/route');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
app.use(cors())
// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
const path = require("path")
// Serve static files from the public/assets directory
app.use("/public/assets", express.static(path.join(__dirname, 'public', 'assets')));

// Routes
app.use(routers);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
sequelize;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
