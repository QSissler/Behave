import { useState, useContext } from "react"
import { CohortContext } from "../Context/CohortProvider"
import { BsArrowLeft } from "react-icons/bs";

function NewClassForm({user, handleShowNewClassForm}){

    let [cohorts, setCohorts] = useContext(CohortContext)
    const [gradeLevel, setGradeLevel] = useState("")
    const [subject, setSubject] = useState("")
    const [year, setYear] = useState("")

    function handleGradeChange(e){
        setGradeLevel(e.target.value)
    }
    function handleSubjectChange(e){
        setSubject(e.target.value)
    }
    function handleYearChange(e){
        setYear(e.target.value)
    }

    function onHandleCreateClass(e){
        e.preventDefault();
        
      let newClass = {
            grade : gradeLevel,
            subject : subject,
            year : year,
            teacher_id: user.id
        }

        fetch("/cohorts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClass)
            })
            .then(res => res.json())
            .then(data => setCohorts([...cohorts, data]))

            handleShowNewClassForm()
    }
    
    return(
        <div>
            <form onSubmit={onHandleCreateClass} className="new-class-form">
            <BsArrowLeft className="back-arrow" onClick={handleShowNewClassForm}/>
                <input type="text" value={gradeLevel} onChange={handleGradeChange} placeholder="Grade Level"></input>
                <input type="text" value={subject} onChange={handleSubjectChange} placeholder="Subject"></input>
                <input type="text" value={year} onChange={handleYearChange} placeholder="Year"></input>
                <button type="submit" className="noteButton">Create New Class</button>
            </form>
            
         </div>
    )
}

export default NewClassForm;