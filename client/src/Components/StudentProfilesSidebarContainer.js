import  { useState, useContext} from "react"
import { CohortContext } from "../Context/CohortProvider"
import StudentProfileCard from "./StudentProfileCard"

function StudentProfilesSideBarContainer(){
    
    let [cohorts, setCohorts] = useContext(CohortContext)
    const [currentCohortProfilesPage, setCurrentCohortProfilesPage] = useState([])
    const [chosenStudent, setChosenStudent] = useState([])

    const currentTeacherClassesForProfiles = cohorts.map(cohort => {
        return <option key={cohort.id}>{cohort.cohort_name}</option>
    })

    function handleClassProfilePageChange(e){
        setCurrentCohortProfilesPage(e.target.value)
        setChosenStudent([])   
    }

    const selectedCohort = cohorts.filter(cohort => cohort.cohort_name === currentCohortProfilesPage)
    

    function showSelectedStudent(student){
        setChosenStudent(student)
    }

    
    return(
        <div>
            <h1>SideBar</h1>
            <form>
            <select onChange={(e) => handleClassProfilePageChange(e)}>
                <option>Choose a Class</option>
                {currentTeacherClassesForProfiles}
            </select>
            </form>
            {selectedCohort.length === 0 ? null : selectedCohort[0].students.map(student => {
                return <button onClick={() => showSelectedStudent(student)} key={student.id}>{student.name}</button>
            })}
            {chosenStudent.length === 0 ? null : <StudentProfileCard chosenStudent={chosenStudent}/>}
         </div>
    )
}

export default StudentProfilesSideBarContainer;