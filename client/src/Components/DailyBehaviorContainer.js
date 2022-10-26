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
        setShowClass(false)
    }

   

    

    return(
        <div>
            <h1>{classToShow[0].cohort_name}</h1>
            {classToShow.length !== 0 ? studentsToShow : null}
            <button onClick={handleFireOffSubmitAllNotes} className="noteButton">Submit All Notes</button>
         </div>
    )
}

export default DailyBehaviorContainer;