import { useState } from "react"

function NoteCard({note, handleNoteDelete, notes, setNotes}){
    const [showNoteUpdateForm, setShowNoteUpdateForm] = useState(false)
    const [behaviorLevel, setBehaviorLevel] = useState(handleBehaviorFormState(note.behavior_level))
    const [parentContact, setParentContact] = useState(note.parent_contact)
    const [isChecked, setIsChecked] = useState(note.parent_contact)
    const [noteText, setNoteText] = useState(note.note)
    const [updatedNote, setUpdatedNote] = useState([])

    function handleNoteUpdate(){
        setShowNoteUpdateForm(!showNoteUpdateForm)
    }

    function handleBehaviorFormState(int){
        if (int === 1){
            return "Green"
        } else if (int === 2){
            return "Yellow"
        } else if (int === 3){
            return "Red"
        }
    }

    function handleBehaviorColor(color){
        if (color === "Green"){
            return 1
        } else if (color === "Yellow"){
            return 2
        } else if (color === "Red"){
            return 3
        }
    }

    function handleBehaviorNumberToColor(int){
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

    function handleUpdateNote(e){
        e.preventDefault()

        let updatedNote ={
            id : note.id,
            nice_created_date : note.nice_created_date,
            parent_contact : parentContact,
            note : noteText,
            behavior_level : handleBehaviorColor(behaviorLevel)
        }

        fetch(`/notes/${note.id}`, {
            method: "PATCH",
             headers: {
            "Content-Type": "application/json",
            },
             body: JSON.stringify(updatedNote),
         })
          .then(res => res.json())
          .then(data => setUpdatedNote(data));


          let updatedNotes = notes.map(note => {
            if (note.id === updatedNote.id) {
                return updatedNote
            } else {
                return note
            }
        })

        setNotes(updatedNotes)
        setShowNoteUpdateForm(false)
    }


    return(
        <div className="note">
            {showNoteUpdateForm ? <div>
                <h1>{note.nice_created_date}</h1>
                <form onSubmit={handleUpdateNote}>
                    <label>Parent Contact</label><input 
                type="checkbox" 
                value={parentContact} 
                checked={isChecked}
                onChange={() => {
                setParentContact(!parentContact)
                setIsChecked(!isChecked)}}></input>
                    <label>Behavior Level</label>
                    <select value={behaviorLevel} onChange={(e) => setBehaviorLevel(e.target.value)}>
                        <option>Green</option>
                        <option>Yellow</option>
                        <option>Red</option>
                    </select>
                    <label>Note</label><input type="text" value={noteText} onChange={(e) => setNoteText(e.target.value)}></input>
                    <button type="submit" className="noteButton">Update Note</button>
                </form>
                <button onClick={handleNoteUpdate}>Abort</button>
            </div> : <div>
            <h3>{note.nice_created_date}</h3>
            <label> Parent Contact: {note.parent_contact ? "Yes" : "No"}</label>
            <p>Behavior Color: {handleBehaviorNumberToColor(note.behavior_level)}</p>
            <p>{note.note}</p>
            <button onClick={handleNoteUpdate} className="noteButton">Update Note</button>
            <button onClick={() => handleNoteDelete(note)} className="noteButton">Delete Note</button>
            </div>}

         </div>
    )
}

export default NoteCard;