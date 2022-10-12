import { NavLink } from "react-router-dom";
import {useHistory} from 'react-router-dom'

function NavBar({ setUser, user }) {
    const history = useHistory()

    function handleLogoutClick(){
        fetch("/logout", {
            method: "DELETE"
        }).then((res => {
            if (res.ok){
                setUser(null)
                history.push("/")
            }
        }))
    }

  return (
    user ? (<nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      {/* <NavLink exact to="/tripform">
        Trip Form
      </NavLink>
      <NavLink exact to="/itemform">
        Item Form
      </NavLink>
      <NavLink exact to="/myitems">
        Packing Lists
      </NavLink> */}
      <button onClick={handleLogoutClick}>Logout</button>
    </nav> ) :
    (<nav>
    <NavLink exact to="/">
        Home
      </NavLink>
        <NavLink exact to="/login">
            Log In
        </NavLink>
        <NavLink exact to="/signup">
        Signup
      </NavLink>
    </nav>)

)};


export default NavBar;