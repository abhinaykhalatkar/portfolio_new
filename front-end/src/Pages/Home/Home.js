import './Home.scss';
import React ,{useContext}from 'react';
import {ThemeContext } from '../../Context/ThemeContext/ThemeContext';

export default function HomePage() {
    const darkThemeCon=useContext(ThemeContext)
    const darkTheme=darkThemeCon.darkTheme

  const themeStyle = {
    backgroundColor: darkTheme? '#333' : '#CCC',
    color: darkTheme ? '#CCC' : '#333',
    padding: '2rem',
    margin: '2rem',
  };

  return (
    <div style={themeStyle} className='p-Home'>
        {console.log(darkTheme)}
      <h1>Hey from HomePage</h1>
      <p>This is your awesome HomePage subtitle</p>
    </div>
  );
}