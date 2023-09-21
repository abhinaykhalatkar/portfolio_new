import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import axios from 'axios'
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app'; 
import { getAnalytics,logEvent } from 'firebase/analytics'; 

const firebaseConfig = {
  apiKey: process.env.REACT_APP_PORTF_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_PORTF_FIREBASE_authDomain,
  databaseURL: process.env.REACT_APP_PORTF_FIREBASE_databaseURL,
  projectId: process.env.REACT_APP_PORTF_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_PORTF_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_PORTF_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_PORTF_FIREBASE_appId,
  measurementId: process.env.REACT_APP_PORTF_FIREBASE_measurementId
};
const app = initializeApp(firebaseConfig);
const analytics=getAnalytics(app); 



const root = ReactDOM.createRoot(document.getElementById('root'));
const AppWithAnalytics = () => {
  useEffect(() => {

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://ip-api.com/json');
        const { query, city, regionName, country } = response.data;
    
        // Log an event with user details
        logEvent(analytics,'R_user_details', {
          ip_address: query,
          city:city,
          region: regionName,
          country:country,
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

root.render(<AppWithAnalytics />);

reportWebVitals();


// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.scss";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();
