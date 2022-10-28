import  { useState, useContext} from "react"
import { CohortContext } from "../Context/CohortProvider"
import DailyBehaviorContainer from "./DailyBehaviorContainer"
import { MdOutlineNoteAlt } from "react-icons/md";

function DailyBehavior(){

    let [cohorts, setCohorts] = useContext(CohortContext)
    const [currentCohort, setCurrentCohort] = useState([])
    const [showClass, setShowClass] = useState(false)
    const [showSubmitMessage, setShowSubmitMessage] = useState(false)


    const currentTeacherClasses = cohorts.map(cohort => {
        return <option key={cohort.id}>{cohort.cohort_name}</option>
    })

    const classToShow = cohorts.filter(cohort => {
       if (currentCohort === "Choose a Class"){
        setShowClass(false)
        setCurrentCohort([])
       } else {return cohort.cohort_name === currentCohort}
    })

    function handleClassChange(e){
        setCurrentCohort(e.target.value)
        
        if (showClass === false){
            setShowClass(true)
        }

        setShowSubmitMessage(false)
    }



    return(
        <div className="dailyBehavior">
            <h1>Daily Behavior</h1>
            <form>
            <select onChange={(e) => handleClassChange(e)} className="behavior-class-select">
                <option>Choose a Class</option>
                {currentTeacherClasses}
            </select>
            </form>
            {showSubmitMessage ? <h2 className="submit-words">All Notes Submitted!</h2> : null}
            {showClass ? <DailyBehaviorContainer classToShow={classToShow} 
            setShowClass={setShowClass} 
            setShowSubmitMessage={setShowSubmitMessage}
            setCurrentCohort={setCurrentCohort}
            /> : null}
         </div>
    )
}

export default DailyBehavior;