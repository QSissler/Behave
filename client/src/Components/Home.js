import { useState } from "react"

function Home(){
    const [showForm, setShowForm] = useState(false)

    function handleShowForm(){
        setShowForm(!showForm)
    }

    return(
    
            <div className="home-page">
            <h1>Welcome to Behave!</h1>
            <img className="welcome-image" src="https://clipart.world/wp-content/uploads/2020/08/group-of-happy-students-in-school-uniform-png.png"></img>
            </div>
    )
}

export default Home;