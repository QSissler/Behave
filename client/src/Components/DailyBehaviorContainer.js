import { useState } from "react"
import DailyBehaviorCard from "./DailyBehaviorCard";

function DailyBehaviorContainer({ classToShow, setShowClass }){
    const [fireOffAllNotes, setFireOffAllNotes] = useState(false)
    

    const studentsToShow = classToShow[0].students.map(student => {
        return <DailyBehaviorCard student={student} fireOffAllNotes={fireOffAllNotes} setFireOffAllNotes={setFireOffAllNotes} key={student.id}/>
    })

    function handleFireOffSubmitAllNotes(){
        setFireOffAllNotes(true)
        alert("All Notes Submitted")
        // setShowClass(false)
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