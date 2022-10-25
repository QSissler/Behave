import { useState } from "react"
import NewClassForm from "./NewClassForm"
function Home({user}){
    const [showForm, setShowForm] = useState(false)

    function handleShowForm(){
        setShowForm(!showForm)
    }

    return(
    
            <div>
            <h1>Welcome to Behavior Manager!</h1>
            </div>
    )
}

export default Home;