import React, { useState } from 'react';
import { Canva } from "./components/canva/Canva"
import { Note } from "./components/note/Note"

import { Board } from "./components/board/Board";

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
      postLogoutRedirectUri: 'https://patacon-ten.vercel.app/login.html'
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
      
        <Routes>
          <Route path="/" element={<Board m_strUser={m_strUser}/>} />
        </Routes>
        <SignOutButton /><br/>
        

    </div>
  );
  else
    return <>{Render()}<div>Please wait...</div></>
}

export default App;
