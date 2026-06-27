import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({
    path: './.env'
})
    
import env from "./constants.js";
setInterval(()=>{
    fetch(env.PROJECT_URL)
    .then(()=>{
        console.log("Fetched!")
    })

}, 1000*60*60)

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
