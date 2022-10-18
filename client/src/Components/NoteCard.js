
import { useState } from "react"

function NoteCard({note}){
   console.log(note)
   const [isChecked, setIsChecked] = useState(note.parent_contact)

   function handleCheckChange(){
//     fetch(`/items/${item.id}`, {
//     method: "PATCH",
//      headers: {
//     "Content-Type": "application/json",
//     },
//      body: JSON.stringify({
//        packed: !item.packed,
//      }),
//  })
//   .then((res) => res.json())
//   .then(console.log);

  setIsChecked(!isChecked)
}

    return(
        <div>
            <h1>{note.nice_created_date}</h1>
            <label> Parent Contact:
                <input 
                className="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckChange}/>
            </label>
            <p>{note.behavior_level}</p>
            <p>{note.note}</p>
         </div>
    )
}

export default NoteCard;