import  { useState, useContext, useEffect} from "react"
import { CohortContext } from "../Context/CohortProvider"


function Account({user, setUser}){
    let [cohorts, setCohorts] = useContext(CohortContext)
    const [imagePlaceholder, setImagePlaceholder] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png")
    const [showUserUpdateForm, setShowUserUpdateForm] = useState(false)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [roomNumber, setRoomNumber] = useState("")
    const [avatar, setAvatar] = useState("")


    function handleCohortDelete(cohort){
        fetch(`/cohorts/${cohort.id}`, {
            method: "DELETE",
            })   
        setCohorts(cohorts.filter(c => c.id !== cohort.id))
    }

    const classesToShow = cohorts.map(cohort => {
        return (
            <div key={cohort.id}>
            <p key={cohort.id}>{cohort.cohort_name}</p>
            <button onClick={() => handleCohortDelete(cohort)}>Delete</button>
            </div>
        )
    })

    function handleUpdateUserForm(){
        setShowUserUpdateForm(!showUserUpdateForm)
        setUserName(user.name)
        setName(user.name)
        setRoomNumber(user.room_number)
        setAvatar(user.avatar)
    }

    function handleUpdateUser(){
        let updatedUser = {
            username: userName,
            name: name,
            room_number: roomNumber,
            avatar: avatar
        }

        fetch(`/teachers/${user.id}`, {
            method: "PATCH",
             headers: {
            "Content-Type": "application/json",
            },
             body: JSON.stringify(updatedUser),
         })
          .then(res => res.json())
          .then(console.log);

        setUserName("")
        setName("")
        setRoomNumber("")
        setAvatar("")
        setShowUserUpdateForm(false)
    }


    return(
        user ? (
        <div>
            <h1>Manage Your Account</h1>
            <img className="student-image" src={user.avatar ? user.avatar : imagePlaceholder} ></img>
            <h2>{user.name}</h2>
            <h3>Room Number: {user.room_number}</h3>
            {showUserUpdateForm ? null : <button onClick={handleUpdateUserForm}>Update Account</button>}
            {showUserUpdateForm ? (
                <form onSubmit={handleUpdateUser}>
                    <label>Username:</label><input value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                    {/* <label>New Password:</label><input value={password} onChange={(e) => setPassword(e.target.value)}></input> */}
                    <label>Name:</label><input value={name} onChange={(e) => setName(e.target.value)}></input>
                    <label>Room Number:</label><input value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)}></input>
                    <label>Avatar:</label><input value={avatar} onChange={(e) => setAvatar(e.target.value)}></input>
                    <button type="submit">Update Account</button>
                </form>
            ) : null}
            <h2>Classes</h2>
            {classesToShow}
         </div>) : (<div>
            <h1>Loading</h1>
         </div>)
    )
}

export default Account;