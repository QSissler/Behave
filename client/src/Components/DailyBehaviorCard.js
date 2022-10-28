import { useState} from "react"
function DailyBehaviorCard({ student, fireOffAllNotes, setFireOffAllNotes, setShowClass, setShowSubmitMessage }){
    const [imagePlaceholder, setImagePlaceholder] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png")
    const [note, setNote] = useState("")
    const [behaviorLevel, setBehaviorLevel] = useState("Green")

    function handleBehaviorColor(color){
        if (color === "Green"){
            return 1
        } else if (color === "Yellow"){
            return 2
        } else if (color === "Red"){
            return 3
        }
    }

    if (fireOffAllNotes) {
        createNewNote()
    }

    function createNewNote(){
        let newNote = {
            student_id : student.id,
            parent_contact : false,
            note : note,
            behavior_level : handleBehaviorColor(behaviorLevel)
            }

        fetch("/notes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
            })
            .then(res => res.json())
            .then(data => {
                setShowClass(false)
                setShowSubmitMessage(true)
            })

            setFireOffAllNotes(false)
            
    }
    
        return(
            <div className="daily-behavior-card">
               <img className="student-image" src={student.avatar === "" ? imagePlaceholder : student.avatar} ></img>
                <h3>{student.name}</h3>
                <form>
                    <input type="text" className="behavior-card-input"placeholder="Add note" value={note} onChange={(e) => setNote(e.target.value)}></input>
                    <select value={behaviorLevel} onChange={(e) => setBehaviorLevel(e.target.value)} className="daily-behavior-select">
                        <option>Green</option>
                        <option>Yellow</option>
                        <option>Red</option>
                    </select>
                </form>
             </div>
        )
    }
    
    export default DailyBehaviorCard;