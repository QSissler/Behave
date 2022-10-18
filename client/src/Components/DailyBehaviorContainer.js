import { useState } from "react"
import DailyBehaviorCard from "./DailyBehaviorCard";

function DailyBehaviorContainer({ classToShow }){
    

    const studentsToShow = classToShow[0].students.map(student => {
        return <DailyBehaviorCard student={student} key={student.id}/>
    })

    

    return(
        <div>
            <h1>{classToShow[0].cohort_name}</h1>
            {classToShow.length !== 0 ? studentsToShow : null}
         </div>
    )
}

export default DailyBehaviorContainer;