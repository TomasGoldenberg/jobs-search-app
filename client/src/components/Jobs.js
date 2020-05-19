import React from "react"
import {Typography}from "@material-ui/core"
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Job from "./Job"
import JobModal from "./JobModal"

export default function Jobs({jobs}){
    //MODAL
    const [open, setOpen] = React.useState(false);
    const [selectedJob, setSelectedJob] = React.useState({});

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };



    //PAGINATION
    const [activeStep, setActiveStep] = React.useState(0);
    const numJobs= jobs.length
    const numPages =Math.ceil(numJobs / 50)
    const jobsOnPage = jobs.slice(activeStep*50, (activeStep *50) + 50 )

    //step 0 == 0/49
    //step 1 == 50/99 
    


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    


    console.log("the job is", jobs[0])
    return(
        <div className="jobs">
            <JobModal open={open} job={selectedJob}  handleClose={handleClose}/>
            <Typography variant="h4" component="h1">
                Entry Level Software Jobs
            </Typography>
            <Typography variant="h6" component="h2">
               Found {numJobs} Jobs !
            </Typography>
            {
                jobsOnPage.map(
                    (job,i) =>  <Job job={job} key={i} onClick={()=>{
                        console.log("clicked")
                        handleClickOpen();
                        setSelectedJob(job)
                    }}/>
                )
            }


            <div>
                Page: {activeStep +1} of {numPages } 
            </div>

            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                    Next
                     <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                     <KeyboardArrowRight/>
                    Back
                    </Button>
                }
            />



        </div>
    )
}