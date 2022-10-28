import { useState } from "react"
import DailyBehaviorCard from "./DailyBehaviorCard";

function DailyBehaviorContainer({ classToShow, setShowClass, setShowSubmitMessage, setCurrentCohort }){
    const [fireOffAllNotes, setFireOffAllNotes] = useState(false)
    
    

    const studentsToShow = classToShow[0].students.map(student => {
        return <DailyBehaviorCard student={student} 
        setShowClass={setShowClass} 
        fireOffAllNotes={fireOffAllNotes} 
        setFireOffAllNotes={setFireOffAllNotes} 
        setShowSubmitMessage={setShowSubmitMessage}
        key={student.id}/>
    })

    function handleFireOffSubmitAllNotes(){
        setFireOffAllNotes(true)
       
    }

   

    

    return(
        <div>
            <h2>{classToShow[0].cohort_name}</h2>
            <button onClick={handleFireOffSubmitAllNotes} className="submit-all-notes">Submit All Notes</button>
            <div className="daily-behavior-cards">
            {classToShow.length !== 0 ? studentsToShow : null}
            </div>
         </div>
    )
}

export default DailyBehaviorContainer;