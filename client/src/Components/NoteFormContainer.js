import  { useState, useContext} from "react"
import { CohortContext } from "../Context/CohortProvider"
import BehaviorNoteForm from "./BehaviorNoteForm"

function NoteFormContainer(){

    let [cohorts, setCohorts] = useContext(CohortContext)
    const [chosenCohortClass, setChosenCohortClass] = useState([])
    const [showStudentDropdown, setShowStudentDropdown] = useState(false)
    const [chosenStudent, setChosenStudent] = useState([])
    const [showNoteForm, setShowNoteForm] = useState(false)
    const [studentForNote, setStudentForNote] = useState([])
    const [showNoteSubmitted, setShowNoteSubmitted] = useState(false)

    const currentTeacherClasses = cohorts.map(cohort => {
        return <option key={cohort.id}>{cohort.cohort_name}</option>
    })

    const selectedCohort = cohorts.filter(cohort => cohort.cohort_name === chosenCohortClass)

    function handleCohortChange(e){
        setChosenCohortClass(e.target.value)

        if (e.target.value === "Choose Class"){
            setShowStudentDropdown(false)
            setChosenStudent([])   
            setShowNoteForm(false)
        } else {
            setShowStudentDropdown(true)
            setChosenStudent([])
            setShowNoteForm(false)
        }
    }

    function handleStudentChange(e){
        setShowNoteSubmitted(false)
        setChosenStudent(e.target.value)

        if (e.target.value === "Choose Student"){
            setChosenStudent([]) 
            setShowNoteForm(false)  
        } else {setShowNoteForm(true)}
    }



    return(
        <div>
            <h1>Add a Note!</h1>
            <div className="noteForm">
                <select onChange={(e) => handleCohortChange(e)}>
                <option>Choose Class</option>
                {currentTeacherClasses}
                </select>
                
                { showStudentDropdown ? 
                <select onChange={(e) => handleStudentChange(e)}>
                    <option>Choose Student</option>
                    {selectedCohort.length === 0 ? null : selectedCohort[0].students.map(student => {
                    return <option key={student.id}>{student.name}</option>})}
                </select> : null
                }
                {showNoteSubmitted ? <h2 className="submit-words">Note Submitted!</h2> : null}
                {showNoteForm ? <BehaviorNoteForm chosenStudent={chosenStudent} selectedCohort={selectedCohort} setShowNoteSubmitted={setShowNoteSubmitted}/> : null}
                </div>
         </div>
    )
}

export default NoteFormContainer;