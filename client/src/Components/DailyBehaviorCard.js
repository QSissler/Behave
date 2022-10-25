import { useState, useEffect } from "react"
function DailyBehaviorCard({ student, fireOffAllNotes }){
    const [imagePlaceholder, setImagePlaceholder] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png")
    const [note, setNote] = useState("")
    const [behaviorLevel, setBehaviorLevel] = useState("Green")

    useEffect(() =>{
        let newNote = {
            student_id : student.id,
            parent_contact : false,
            note : note,
            behavior_level : behaviorLevel
            }

        fetch("/notes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
            })
            .then(res => res.json())
    }, [fireOffAllNotes])
    
        return(
            <div>
               <img className="student-image" src={student.avatar === "" ? imagePlaceholder : student.avatar} ></img>
                <h3>{student.name}</h3>
                <form>
                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)}></input>
                    <select value={behaviorLevel} onChange={(e) => setBehaviorLevel(e.target.value)}>
                        <option>Green</option>
                        <option>Yellow</option>
                        <option>Red</option>
                    </select>
                </form>
             </div>
        )
    }
    
    export default DailyBehaviorCard;