import { useEffect, useState } from "react"
import NoteCard from "./NoteCard"


function StudentProfileCard({chosenStudent, showUpdateStudentForm, setShowUpdateStudentForm}){
    const [student, setStudent] = useState([])
    const [notes, setNotes] = useState([])
    const [imagePlaceholder, setImagePlaceholder] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png")
    const [studentName, setStudentName] = useState("")
    const [studentAvatar, setStudentAvatar] = useState("")
    const [parentName, setParentName] = useState("")
    const [parentNumber, setParentNumber] = useState("")

    useEffect(() => {
        fetch(`/students/${chosenStudent.id}`)
        .then(res => res.json())
        .then(data => setStudent(data))
    }, [chosenStudent])

    useEffect(() => {
        fetch(`/students/${chosenStudent.id}/notes`)
        .then(res => res.json())
        .then(data => setNotes(data))
    }, [chosenStudent])

    const notesToShow = notes.map(note => {
        return <NoteCard className="note" 
        note={note} 
        notes={notes} 
        setNotes={setNotes} 
        handleNoteDelete={handleNoteDelete}
        handleBehaviorColor={handleBehaviorColor}
        key={note.id}/>
    })

    function handleNoteDelete(noteToDelete){
        fetch(`/notes/${noteToDelete.id}`, {
            method: "DELETE",
            })

        setNotes(notes.filter(note => note.id !== noteToDelete.id))
    }

    function handleShowStudentUpdateForm(){
        setStudentName(chosenStudent.name)
        setStudentAvatar(chosenStudent.avatar)
        setParentName(chosenStudent.parent_name)
        setParentNumber(chosenStudent.parent_number)
        setShowUpdateStudentForm(true)
    }

    function handleUpdateStudent(e){
        e.preventDefault()
        
       let updatedStudent = {
        name : studentName,
        avatar : studentAvatar,
        parent_name :parentName,
        parent_number : parentNumber,
       }

       fetch(`/students/${chosenStudent.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStudent)
        })
        .then(res => res.json())
        .then(data => setStudent(data))

       setShowUpdateStudentForm(false)
    }

    function handleBehaviorColor(int){
        if (int === 0){
            return "No Behavior Added"
        } else if (int === 1){
            return "🟢"
        } else if (int === 2){
            return "🟡"
        } else if (int === 3){
            return "🔴"
        }
    }

    return(
        <div>
        {showUpdateStudentForm ? (<div>
            <form onSubmit={handleUpdateStudent}>
                <label>Student Name</label><input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)}></input>
                <label>Student Avatar</label><input type="text" value={studentAvatar} onChange={(e) => setStudentAvatar(e.target.value)}></input>
                <label>Parent Name</label><input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)}></input>
                <label>Parent Number</label><input type="text" value={parentNumber} onChange={(e) => setParentNumber(e.target.value)}></input>
                <button type="submit" className="noteButton">Update Student</button>
            </form>
        </div>) : (
            <div className="studentInfo">
            <img className="profile-image" src={student.avatar === "" ? imagePlaceholder : student.avatar}></img>
            <h1>{student.name}</h1>
            <p>{student.parent_name}</p>
            <p>{student.parent_number}</p>
            <p>Average Behavior: {handleBehaviorColor(student.behavior)}</p>
            <p>Parents have been contacted {student.parent_contact_amount} times.</p>
            <button onClick={handleShowStudentUpdateForm} className="noteButton">Update Student</button> 
            </div>
        )}
         <div className="noteCards">
            {notesToShow}
            </div>
         </div>
    )
}

export default StudentProfileCard;