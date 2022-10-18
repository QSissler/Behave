import { useState } from "react"
function DailyBehaviorCard({ student }){
    const [imagePlaceholder, setImagePlaceholder] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png")
    
    
        return(
            <div>
               <img className="student-image" src={student.avatar === "" ? imagePlaceholder : student.avatar} ></img>
                <h3>{student.name}</h3>
                <form>
                    <input type="text"></input>
                    <select>
                        <option>Green</option>
                        <option>Yellow</option>
                        <option>Red</option>
                    </select>
                    <button>Submit</button>
                </form>
             </div>
        )
    }
    
    export default DailyBehaviorCard;