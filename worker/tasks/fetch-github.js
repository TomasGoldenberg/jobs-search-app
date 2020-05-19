const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client); //to give each job his own redis item

var fetch = require("node-fetch")

const baseURL = "https://jobs.github.com/positions.json"
async function fetchGithub(){
    
    let resultCount = 1 , onPage = 1
    const allJobs= []
    const filteredJobs = []

    //fetch all pages
    while(resultCount > 0){
        const response = await fetch(`${baseURL}?page=${onPage}`)
        const jobs = await response.json()

        allJobs.push(...jobs)
        onPage++
        resultCount= jobs.length
        console.log(`got`,jobs.length, `jobs`)
    }


    //filter algorithm
    
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        
        
        //algo logic
        if(
            jobTitle.includes("senior") ||
            jobTitle.includes("maneger") ||
            jobTitle.includes("sr.")    ||
            jobTitle.includes("lead")    ||
            jobTitle.includes("architect") 
            ){
               return false
            }

        
        return true
    })

    console.log("got", allJobs.length, "total jobs")
    
  
    //set in redis 
    console.log("number of junior filtered jobs" , jrJobs)
    const success = await setAsync("github",JSON.stringify(jrJobs))
    console.log({success})
}


module.exports =fetchGithub