import React, { useState } from 'react';
import { Canva } from "./components/canva/Canva"
import { Note } from "./components/note/Note"
import { Note as personalNote } from "./components/personalNote/Note"
import { Board } from "./components/board/Board"
import { Search } from "./components/search/Search"

import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';


import { Routes, Route,Link } from 'react-router-dom';

function App() {

  useMsalAuthentication(InteractionType.Redirect);
  const [m_strUser, setm_strUser] = useState("");

  function Render() {

    const { accounts } = useMsal();

    try {
      const username = accounts[0].username;
      setm_strUser(username);
    }
    catch (e) {
    }
  }

  const handleSignOut = (instance) => {
    instance.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:3001/login.html'
    });

  }

  const SignOutButton = () => {
    const { instance } = useMsal();
    return (
      <button onClick={()=>handleSignOut(instance)}>Sign out</button>

    )

  }

  if (m_strUser !== "")
  return (
    <div className="App">
      
        {/* <Note /><br/>
        <Canva user={m_strUser}/><br/> */}
      

        <Routes>
          <Route path="/" element={<Board m_strUser={m_strUser}/>} />
          <Route path="/personal" element={<personalNote />} />
        </Routes>
        <SignOutButton /><br/>
        

    </div>
  );
  else
    return <>{Render()}<div>Please wait...</div></>
}

export default App;
