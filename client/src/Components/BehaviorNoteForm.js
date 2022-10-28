import { useState, useEffect } from "react"

function BehaviorNoteForm({chosenStudent, selectedCohort, setShowNoteSubmitted}){
    const [behaviorLevel, setBehaviorLevel] = useState("Green")
    const [parentContact, setParentContact] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [note, setNote] = useState("")
    const [student, setStudent] = useState([])

    function handleBehaviorColor(color){
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
            student_id : student[0].id,
            parent_contact : parentContact,
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

        setBehaviorLevel("Green")
        setParentContact(false)
        setNote("")
        setIsChecked(false)
        setShowNoteSubmitted(true)
    }


     
    useEffect(() => {
        let filterForChosenStudent = selectedCohort[0].students.filter(student => {
       return student.name === chosenStudent
    }) 
    setStudent(filterForChosenStudent)
    }, [chosenStudent])

    

    return(
        <div className="notesForm">
            <form onSubmit={(e) => handleSubmitNewNote(e)} className="form-style-3">
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
            </form>
         </div>
    )
}

export default BehaviorNoteForm;