import { NavLink } from 'react-router-dom';
import './NavBar.scss'
import { Switch1 } from '../Switch/Switch';

export default function Navbar() {
  return (
    <div className='c-NavBar'>
    <nav className='Nav'>
      <div className='NavMenu'>
        <NavLink className='NavLink' to='/' activeStyle>
          HOME
        </NavLink>
        <NavLink className='NavLink' to='/about' activeStyle>
          ABOUT
        </NavLink>
        <NavLink className='NavLink' to='/annual' activeStyle>
          Other
        </NavLink>
        <Switch1/>
      </div>
    </nav>
  </div>
  );

}