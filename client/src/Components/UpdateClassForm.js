import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
function UpdateClassForm({user}){

    let { id } = useParams()

    const [cohort, setCohort] = useState([])
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [parentName, setParentName] = useState("")
    const [parentNumber, setParentNumber] = useState("")
    const [cohortStudents, setCohortStudents] = useState([])
    const [showNewStudentForm, setShowNewStudentForm] = useState(false)


    useEffect(() => {
        fetch(`/cohorts/${id}`)
        .then(res => res.json())
        .then(data => {
            setCohort(data)
            setCohortStudents(data.students)
        })
    }, [])

   function handleStudentDelete(deletedStudent){
    fetch(`/students/${deletedStudent.id}`, {
        method: "DELETE",
        })

      let studentsWithDeletedStudentGone = cohort.students.filter(student => student.id !== deletedStudent.id)
      setCohortStudents(studentsWithDeletedStudentGone)
   }

   function handleNewStudent(e){
    e.preventDefault();

    let newStudent = {
        name: name,
        avatar: avatar,
        parent_name: parentName,
        parent_number: parentNumber,
        cohort_id: cohort.id,
        teacher_id: user.id
    }

    fetch("/students", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
        })
        .then(res => res.json())
        .then(data => addNewStudentToCohort(data))

        setShowNewStudentForm(false)
   }

   function addNewStudentToCohort(addedStudent){
        let updatedStudentArray = [...cohortStudents, addedStudent]
        setCohortStudents(updatedStudentArray)
   }

   const [gradeLevel, setGradeLevel] = useState("")
   const [subject, setSubject] = useState("")
   const [year, setYear] = useState("")
   const [showUpdateClassForm, setShowUpdateClassForm] = useState(false)

   function handleGradeChange(e){
       setGradeLevel(e.target.value)
   }
   function handleSubjectChange(e){
       setSubject(e.target.value)
   }
   function handleYearChange(e){
       setYear(e.target.value)
   }

   function onHandleUpdateClass(e){
        e.preventDefault()
       
       let updatedClass = {
            grade : gradeLevel,
            subject : subject,
            year : year,
            teacher_id: user.id
       }

       fetch(`/cohorts/${cohort.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClass)
        })
        .then(res => res.json())
        .then(data => setCohort(data))

        setShowUpdateClassForm(false)

   }
   
   function handleUpdateClassToggle(){
    setShowUpdateClassForm(!showUpdateClassForm)
        setGradeLevel(cohort.grade)
        setSubject(cohort.subject)
        setYear(cohort.year)
   }
   

    return(
        <div>
            <h1>Update Class</h1>
            <h2>{cohort.cohort_name}</h2>
            <button onClick={handleUpdateClassToggle}>Update Class Info</button>
            {showUpdateClassForm ? 
            <form onSubmit={onHandleUpdateClass}>
                <label>Grade Level:</label><input type="text" value={gradeLevel} onChange={handleGradeChange}></input>
                <label>Subject:</label><input type="text" value={subject} onChange={handleSubjectChange}></input>
                <label>Year:</label><input type="text" value={year} onChange={handleYearChange}></input>
                <button type="submit">Update Class</button>
            </form> : null}
            {showNewStudentForm ? <div>
                <form onSubmit={handleNewStudent}>
                    <label>Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <label>Avatar</label><input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)}></input>
                    <label>Parent Name</label><input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)}></input>
                    <label>Parent Number</label><input type="text" value={parentNumber} onChange={(e) => setParentNumber(e.target.value)}></input>
                    <button type="submit">Add Student</button>
                </form>
            </div> : null}
            <button onClick={() => setShowNewStudentForm(!showNewStudentForm)}> {showNewStudentForm ? "Abort": "Add Student"}</button>
            {cohort.length === 0 ? null : cohortStudents.map(student => {
                return <div key={student.id}>
                    <h3>{student.name}</h3>
                    <button onClick={() => handleStudentDelete(student)}>Remove Student</button>
                </div>
            })}
         </div>
    )
}

export default UpdateClassForm;