const express = require("express")
const app = express()
const cors = require("cors")

const PORT = 5000
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

app.use(cors())

app.get("/jobs",async (req,res)=>{
  
    const jobs = await getAsync("github")
    
    return res.send(jobs)
})

app.listen(PORT, ()=>{
    console.log("server runing on port ", PORT)
})