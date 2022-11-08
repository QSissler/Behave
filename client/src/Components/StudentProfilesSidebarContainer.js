import  { useState, useContext} from "react"
import { CohortContext } from "../Context/CohortProvider"
import StudentProfileCard from "./StudentProfileCard"

function StudentProfilesSideBarContainer(){
    
    let [cohorts, setCohorts] = useContext(CohortContext)
    const [currentCohortProfilesPage, setCurrentCohortProfilesPage] = useState([])
    const [chosenStudent, setChosenStudent] = useState([])
    const [showUpdateStudentForm, setShowUpdateStudentForm] = useState(false)
   

    const currentTeacherClassesForProfiles = cohorts.map(cohort => {
        return <option key={cohort.id}>{cohort.cohort_name}</option>
    })

    function handleClassProfilePageChange(e){
        setCurrentCohortProfilesPage(e.target.value)
        setChosenStudent([])   
    }

    const selectedCohort = cohorts.filter(cohort => cohort.cohort_name === currentCohortProfilesPage)
    

    function showSelectedStudent(selectedStudent){
        setShowUpdateStudentForm(false)
        setChosenStudent(selectedStudent)
    }

    
    return(
        <div className="profiles">
            <div className="sidebar">
            <form>
            <select onChange={(e) => handleClassProfilePageChange(e)} className="sidebar-select">
                <option>Choose a Class</option>
                {currentTeacherClassesForProfiles}
            </select>
            </form>
            {selectedCohort.length === 0 ? null : selectedCohort[0].students.map(student => {
                return <button className="studentList" onClick={() => showSelectedStudent(student)} key={student.id}>{student.name}</button>
            })}
            </div>
            {chosenStudent.length === 0 ? null : 
            <StudentProfileCard 
            chosenStudent={chosenStudent} 
            showUpdateStudentForm={showUpdateStudentForm} 
            setShowUpdateStudentForm={setShowUpdateStudentForm}/>}
         </div>
    )
}

export default StudentProfilesSideBarContainer;