import { useEffect, useState } from "react"
import NoteCard from "./NoteCard"

function StudentProfileCard({chosenStudent}){
    const [student, setStudent] = useState([])
    const [notes, setNotes] = useState([])
    const [imagePlaceholder, setImagePlaceholder] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png")


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
        return <NoteCard note={note} key={note.id}/>
    })

    return(
        <div>
            <img className="student-image" src={student.avatar === "" ? imagePlaceholder : student.avatar}></img>
            <h1>{student.name}</h1>
            <p>{student.parent_name}</p>
            <p>{student.parent_number}</p>
            <p>Average Behavior: {student.behavior}</p>
            <p>Parents have been contacted {student.parent_contact_amount} times.</p>
            {notesToShow}
         </div>
    )
}

export default StudentProfileCard;