// client/src/components/App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import DailyBehavior from "./Components/DailyBehavior";
import Account from "./Components/Account";
import StudentProfileContainer from "./Components/StudentProfileContainer";
import NoteFormContainer from "./Components/NoteFormContainer";
import UpdateClassForm from "./Components/UpdateClassForm";
import { CohortProvider } from "./Context/CohortProvider";


function App() {
  const [user, setUser] = useState(null);
 
  

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
        });
      }
    });
  }, []);


  

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user} setUser={setUser}/>
        <Switch>

        <Route exact path="/">
           <Home user={user}/>
        </Route>

        <Route exact path="/login">
            <Login setUser={setUser} user={user}/>
          </Route>

          <Route exact path="/signup">
            <Signup setUser={setUser} user={user}/>
          </Route>

          <CohortProvider>
          <Route exact path="/dailybehavior">
            <DailyBehavior />
          </Route>

          <Route exact path="/studentprofiles">
            <StudentProfileContainer />
          </Route>

          <Route exact path="/addnote">
            <NoteFormContainer />
          </Route>

          <Route exact path="/account">
            <Account user={user} setUser={setUser}/>
          </Route>

          <Route exact path="/cohorts/:id">
            <UpdateClassForm user={user}/>
          </Route>
          </CohortProvider>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

