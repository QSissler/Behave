import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AiFillWarning } from "react-icons/ai";



function Login({setUser}){

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
        setErrors([])

        e.preventDefault()
        const user = {
        username,
        password
    }
    // Logs in user
    fetch(`/login`,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(user)
    })
    .then(res => {
        if(res.ok){
            res.json().then(user => {
                setUser(user)
                history.push("/")
            })
        }else {
            res.json().then(error => setErrors(error.error))
        }
    })
}
   

   

    return(
        <div className="login-form">
            <h2>Log In</h2>
        <form onSubmit={onSubmit}>
        <input placeholder="Username"type='text' name='username' value={username} onChange={(e) => handleUsernameChange(e)} />
      <div></div>
        <input placeholder="Password" type='password' name='password' value={password} onChange={(e) => handlePasswordChange(e)} />
       
       <div></div>
        <button type='submit' className="noteButton">Log in!</button>
      </form>
      {errors.length > 0 ? errors.map((err) => <div className="errors"><AiFillWarning/> {err}</div>) : null}
      <h3>
        Don't have an account yet? <Link exact to="/signup" className="sign-up-link">Sign up!</Link>
      </h3>
         </div>
    )
}


export default Login;