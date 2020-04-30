/*global chrome*/
import React, { useState } from 'react';
import './App.css';
import { fromUrl } from "parse-domain";
const axios = require('axios');

function App() {
  const timestamp = new Date().toUTCString();
  const [currentUrl, setCurrentUrl] = useState('');
  const [parsedUrl, setParsedUrl] = useState('');

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    setCurrentUrl(tabs[0].url);
    setParsedUrl(fromUrl(currentUrl));
  });

  function sendPostRequest() {
    axios.post(
      'http://youta-api.ngrok.io/starter-project/', 
      {
        timestamp,
        username: "user@user.com​", 
        domain: parsedUrl, 
        url: currentUrl
      },
      {
        headers: {
        'Content-Type': 'application/json'
        }
      }
    )
    .then(function (response) {
      //console.log(response);
      //alert('success')
    })
    .catch(function (error) {
      //console.log(error);
      //alert('failed')
    });
  }
   return (
    <div className="App">
      <div className="body">
        <div className="parsedUrl">{parsedUrl}</div>
        <div className="button" onClick={()=>sendPostRequest()}>Submit</div>
      </div>
    </div>
  );
}

export default App;

