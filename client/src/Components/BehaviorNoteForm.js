import { useState, useEffect } from "react"

function BehaviorNoteForm({chosenStudent, selectedCohort}){
    const [behaviorLevel, setBehaviorLevel] = useState("Green")
    const [parentContact, setParentContact] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [note, setNote] = useState("")
    const [student, setStudent] = useState([])


    function handleSubmitNewNote(e){
        e.preventDefault();
        let newNote = {
            student_id : student[0].id,
            parent_contact : parentContact,
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

        setBehaviorLevel("Green")
        setParentContact(false)
        setNote("")
        setIsChecked(false)
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
            <label>Parent Contact?</label>
                <input 
                type="checkbox" 
                value={parentContact} 
                checked={isChecked}
                onChange={() => {
                setParentContact(!parentContact)
                setIsChecked(!isChecked)}}>
                </input>
            <label>Note:</label><input type="text" value={note} onChange={(e) => setNote(e.target.value)} ></input>
                <select onChange={(e) => setBehaviorLevel(e.target.value)} value={behaviorLevel} className="daily-behavior-select">
                    <option>Green</option>
                    <option>Yellow</option>
                    <option>Red</option>
                </select>
                <button type="submit" className="noteButton">Submit Note</button>
            </form>
         </div>
    )
}

export default BehaviorNoteForm;