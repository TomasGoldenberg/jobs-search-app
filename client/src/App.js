import React from 'react';
import './App.css';

import Jobs from "./components/Jobs"
import Header from "./components/Header"

const JOB_API_URL="http://localhost:5000/jobs"


async function fetchJobs(setCb){
  const res = await fetch(JOB_API_URL)
  const json = await res.json()
  setCb(json)
}

function App() {

  const [jobs, setJobs]=React.useState([])

  React.useEffect(()=>{
    fetchJobs(setJobs)
  },[])
  return (
    <div className="App">
      <Header />
      <Jobs jobs={jobs}/>
    </div>
  );
}

export default App;
