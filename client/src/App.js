import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [accounts, setAccounts] = useState([]);
  // const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/accounts')
      .then(response => {
        console.log(response.data)
        setAccounts(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <div className="App">
      <h1>Random Accounts</h1>
      <div className="container">
        {
          accounts.map(account => {
            return (
              <div key={account.id} className="account">
                <h2>{`Name: ${account.name}`}</h2>
                <p>{`Account Identification: ${account.id}`}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
