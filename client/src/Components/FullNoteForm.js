import  { useState, useContext} from "react"
import { CohortContext } from "../Context/CohortProvider"

function FullNoteForm(){

    let [cohorts, setCohorts] = useContext(CohortContext)

    const currentTeacherClasses = cohorts.map(cohort => {
        return <option key={cohort.id}>{cohort.cohort_name}</option>
    })
    

    return(
        <div>
            <h1>Add a Note!</h1>
            <form>
                <select>
                <option>Choose Class</option>
                {currentTeacherClasses}
                </select>
                <select>
                    <option>Choose Student</option>
                </select>
            </form>
         </div>
    )
}

export default FullNoteForm;