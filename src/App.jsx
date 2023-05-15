import React, { useState } from 'react';
import { Canva } from "./components/canva/Canva"
import { Note } from "./components/note/Note"
import { Search } from "./components/search/Search"

import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';


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
      <div>User: {m_strUser}</div>
      <Search />
      <Note /><br/>
      <Canva /><br/>
      <SignOutButton /><br/>
    </div>
  );
  else
    return <>{Render()}<div>Please wait...</div></>
}

export default App;
