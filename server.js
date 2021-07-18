'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const router = require("./src/routers");
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api/v1/", router);
//port
/* const PORT = 8080;
const HOST = '0.0.0.0'; */

app.use("/", (req, res)=>{
   res.send("Hallo Bintang")
})

/* app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`); */
const port = 5000;
app.listen(port, ()=>console.log(`Running on port ${port}`))