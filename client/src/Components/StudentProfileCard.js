import { useEffect, useState } from "react"
import NoteCard from "./NoteCard"
import GreenSmile from "../Image/GreenSmile.png"
import YellowSmile from "../Image/YellowSmile.png"
import RedSmile from "../Image/RedSmile.png"
import { BsArrowLeft } from "react-icons/bs";




function StudentProfileCard({chosenStudent, showUpdateStudentForm, setShowUpdateStudentForm}){
    const [student, setStudent] = useState([])
    const [notes, setNotes] = useState([])
    const [imagePlaceholder, setImagePlaceholder] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png")
    const [studentName, setStudentName] = useState("")
    const [studentAvatar, setStudentAvatar] = useState("")
    const [parentName, setParentName] = useState("")
    const [parentNumber, setParentNumber] = useState("")
    const [showNoteForm, setShowNoteForm] = useState(false)
    const [behaviorLevel, setBehaviorLevel] = useState("Green")
    const [parentContact, setParentContact] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [note, setNote] = useState("")

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
            return GreenSmile
        } else if (int === 2){
            return YellowSmile
        } else if (int === 3){
            return RedSmile
        }
    }

    function handleShowAddNoteForm(){
        setShowNoteForm(!showNoteForm)
    }

    function handleBehaviorColorWordToInt(color){
        if (color === "Green"){
            return 1
        } else if (color === "Yellow"){
            return 2
        } else if (color === "Red"){
            return 3
        }
    }

    function handleSubmitNewNote(e){
        e.preventDefault();
        let newNote = {
            student_id : student.id,
            parent_contact : parentContact,
            note : note,
            behavior_level : handleBehaviorColorWordToInt(behaviorLevel)
        }

        fetch("/notes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
            })
            .then(res => res.json())
            .then(data => setNotes([data, ...notes]))

        setBehaviorLevel("Green")
        setParentContact(false)
        setNote("")
        setIsChecked(false)
        setShowNoteForm(false)
    }

    return(
        <div className="student-profile">
        {showUpdateStudentForm ? (<div>
            <form onSubmit={handleUpdateStudent} className="student-update-form">
                <BsArrowLeft className="back-arrow" onClick={() => setShowUpdateStudentForm(false)}/>
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
            <div className="profile-info">
            <div className="parent-info">
            <h3>Contact Information</h3>
            <p>{student.parent_name}</p>
            <p>{student.parent_number}</p>
            </div>
            <div className="behavior-info"> <h3>Behavior</h3> Average Behavior: <img src={handleBehaviorColor(student.behavior)} className="average-image"/>
            <p>Parents have been contacted {student.parent_contact_amount} times.</p></div>
            </div>
            <button onClick={handleShowStudentUpdateForm} className="update-student-button">Update Student</button> 
            <button onClick={handleShowAddNoteForm}className="add-note-button">{showNoteForm ? "Hide Note" :" Add Note"}</button>
            {showNoteForm ? <form onSubmit={(e) => handleSubmitNewNote(e)} className="form-style-3">
            <textarea className="note-comment-input" type="textarea" rows="2" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Comment"></textarea>
            {/* <div className="contact-and-level"> */}
            <select onChange={(e) => setBehaviorLevel(e.target.value)} value={behaviorLevel} className="daily-behavior-select">
                    <option>Green</option>
                    <option>Yellow</option>
                    <option>Red</option>
                </select>
            <label>Parent Contact?
                <input 
                type="checkbox" 
                value={parentContact} 
                checked={isChecked}
                onChange={() => {
                setParentContact(!parentContact)
                setIsChecked(!isChecked)}}>
                </input></label>
                {/* </div> */}
                <button type="submit" className="submit-new-note-button">Submit Note</button>
            </form> : null}
            </div>
        )}
         <div className="noteCards">
            {notesToShow}
            </div>
         </div>
    )
}

export default StudentProfileCard;