import { useState } from "react"
function NewClassForm({user}){

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

    }
    
    return(
        <div>
            <form onSubmit={onHandleCreateClass}>
                <label>Grade Level:</label><input type="text" value={gradeLevel} onChange={handleGradeChange}></input>
                <label>Subject:</label><input type="text" value={subject} onChange={handleSubjectChange}></input>
                <label>Year:</label><input type="text" value={year} onChange={handleYearChange}></input>
                <button type="submit">Create New Class</button>
            </form>
            
         </div>
    )
}

export default NewClassForm;

// t.string "grade"
//     t.string "subject"
//     t.string "year"
//     t.integer "teacher_id"