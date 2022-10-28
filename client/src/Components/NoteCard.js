import { useState } from "react"
import GreenSmile from "../Image/GreenSmile.png"
import YellowSmile from "../Image/YellowSmile.png"
import RedSmile from "../Image/RedSmile.png"
import { BsArrowLeft } from "react-icons/bs";

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
            return GreenSmile
        } else if (int === 2){
            return YellowSmile
        } else if (int === 3){
            return RedSmile
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
            <h3>{note.nice_created_date}</h3>
            {showNoteUpdateForm ? <div>
                <form onSubmit={handleUpdateNote} className="note-card-update-form">
                <BsArrowLeft className="back-arrow" onClick={handleNoteUpdate}/>
                <label>Parent Contact<input 
                type="checkbox" 
                value={parentContact} 
                checked={isChecked}
                onChange={() => {
                setParentContact(!parentContact)
                setIsChecked(!isChecked)}}></input></label>
                    <select value={behaviorLevel} onChange={(e) => setBehaviorLevel(e.target.value)} className="note-form-select">
                        <option>Green</option>
                        <option>Yellow</option>
                        <option>Red</option>
                    </select>
                    <textarea type="textarea" rows="2" value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
                    <button type="submit" className="note-update-btn">Update Note</button>
                </form>
            </div> : <div className="note-contents">
            <img src={handleBehaviorNumberToColor(note.behavior_level)} className="smile-image"></img>
            <br></br>
            <label>{note.parent_contact ? "Parent was contacted." : null}</label>
            <p>{note.note}</p>
            <button onClick={handleNoteUpdate} className="update-note-button">Update Note</button>
            <button onClick={() => handleNoteDelete(note)} className="delete-note-button">Delete Note</button>
            </div>}

         </div>
    )
}

export default NoteCard;