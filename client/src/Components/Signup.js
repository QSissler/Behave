import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'


function Signup({user, setUser}) {
   
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    function handleUsernameChange(e){
        SetUsername(e.target.value)
    }

    function handlePasswordChange(e){
        SetPassword(e.target.value)
    }

    function onSubmit(e){
        e.preventDefault()
        const user = {
            username,
            password,
            name: "",
            avatar: "",
            room_number: ""
        }

    fetch("/signup",{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(user)
      })
      .then(res => {
          if(res.ok){
              res.json().then(user => {
                 setUser(user)
                 history.push(`/users/${user.id}`)
              })
          }else {
              res.json().then(error => setErrors(error.errors))
                // setErrors(Object.entries(json.errors)))
          }
      })
     
  }


    return (
        <div className="form"> 
        <form onSubmit={onSubmit}>
            <h1>Create a New Account!</h1>
          <input placeholder="Username" type='text' name='username' value={username} onChange={e => handleUsernameChange(e)} />
        <div></div>
        <input placeholder="Password" type='password' name='password' value={password} onChange={e => handlePasswordChange(e)} />
        <div></div>
        <input type='submit' value='Sign up!' />
      </form>
      {errors.length > 0 ? errors.map((err) => <div>{err}</div>) : null}
        </div>
    )
}

export default Signup