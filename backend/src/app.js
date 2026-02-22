//to create server
const express=require("express")
const image = require("./routes/postRoutes");

const app=express();

app.use(express.json())

app.use('/api',image)

module.exports=app