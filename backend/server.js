//Start server
const app = require("./src/app");
const connectDB = require("./src/db/db");
const dotenv=require('dotenv')
const cors=require('cors');
const image = require("./src/routes/postRoutes");
dotenv.config();

app.use(cors( {origin: "http://localhost:5173"}))

const PORT= process.env.PORT || 3000

connectDB();
app.use('/api',image)

app.listen(PORT,()=>{
    console.log(`Server is running in http://localhost:${PORT}`)
})