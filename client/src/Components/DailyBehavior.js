import  { useState, useContext} from "react"
import { CohortContext } from "../Context/CohortProvider"
import DailyBehaviorContainer from "./DailyBehaviorContainer"

function DailyBehavior(){

    let [cohorts, setCohorts] = useContext(CohortContext)
    const [currentCohort, setCurrentCohort] = useState([])
    const [showClass, setShowClass] = useState(false)


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
            setShowClass(!showClass)
        }
    }

    // function  handleOnChooseClass(e){
    //    e.preventDefault();
    //    setShowClass(!showClass)
    // }

    return(
        <div>
            <h1>Choose a Class to add Daily Behavior!</h1>
            <form>
            <select onChange={(e) => handleClassChange(e)}>
                <option>Choose a Class</option>
                {currentTeacherClasses}
            </select>
            </form>
            {showClass ? <DailyBehaviorContainer classToShow={classToShow} /> : null}
         </div>
    )
}

export default DailyBehavior;