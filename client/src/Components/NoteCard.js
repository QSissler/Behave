import { useState } from "react"

function NoteCard({note, handleNoteDelete, notes, setNotes}){
    const [showNoteUpdateForm, setShowNoteUpdateForm] = useState(false)
    const [behaviorLevel, setBehaviorLevel] = useState(note.behavior_level)
    const [parentContact, setParentContact] = useState(note.parent_contact)
    const [isChecked, setIsChecked] = useState(note.parent_contact)
    const [noteText, setNoteText] = useState(note.note)
    const [updatedNote, setUpdatedNote] = useState([])

    function handleNoteUpdate(){
        setShowNoteUpdateForm(!showNoteUpdateForm)
    }

    function handleUpdateNote(e){
        e.preventDefault()

        let updatedNote ={
            parent_contact : parentContact,
            note : noteText,
            behavior_level : behaviorLevel
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
                    <button type="submit">Update Note</button>
                </form>
                <button onClick={handleNoteUpdate}>Abort</button>
            </div> : <div>
            <h1>{note.nice_created_date}</h1>
            <label> Parent Contact: {note.parent_contact ? "Yes" : "No"}</label>
            <p>Behavior Color: {note.behavior_level}</p>
            <p>{note.note}</p>
            <button onClick={handleNoteUpdate}>Update Note</button>
            <button onClick={() => handleNoteDelete(note)}>Delete Note</button>
            </div>}

         </div>
    )
}

export default NoteCard;