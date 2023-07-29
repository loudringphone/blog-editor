import React, { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import MenuLineIcon from 'remixicon-react/MenuLineIcon';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import HomeLineIcon from 'remixicon-react/HomeLineIcon';

import '../../styles/header.css';




const Header = (props) => {
const {currentUser} = props
  let nav_links

  if (currentUser) {
    nav_links = [
        {path: 'posts', display: 'Posts'},
        {path: 'account', display: 'My account'},
        {path: 'account/logout', display: 'Logout'},
        ];
  } else {
    nav_links = [
        {path: 'posts', display: 'Posts'},
        {path: 'account/login', display: 'Login'},
        ];
  }
  
  const [headerStyle, setHeaderStyle] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [mobileMenuDisplay, setMobileMenuDisplay] = useState("none");
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1020) {
        setMobileMenuDisplay("flex");
        setHeaderStyle({ height: '65px' });
        setIsNavVisible(false);
      } else {
        setMobileMenuDisplay("none");
        setHeaderStyle({ height: '65px' });
        setIsNavVisible(true);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [mobileNavStyle, setMobileNavStyle] = useState({ display: 'none', width: '0px' });
  const [navigationStyle, setNavigationStyle] = useState({ display: 'none' });

  const handleClose = () => {
    document.body.classList.remove('scroll-locked');
    setMobileNavStyle({ display: 'flex', width: '0px' });
    setNavigationStyle({ display: 'none' });
    setTimeout(() => {
      setMobileNavStyle({ display: 'none', width: '0px' });
    }, 300);
  };

  const handleOpen = () => {
    document.body.classList.add('scroll-locked');
    setMobileNavStyle({ display: 'flex', width: '0px' });

    setTimeout(() => {
      if (window.innerWidth <= 325) {
        setMobileNavStyle({ display: 'flex', width: '225px', top: window.scrollY });
      } else {
        setMobileNavStyle({ display: 'flex', width: '325px', top: window.scrollY });
      }
    }, 1);
    setTimeout(() => {
      setNavigationStyle({ display: 'block' });
    }, 200);
  };

  const handleClick = () => {
    setHeaderStyle({ overflow: 'visible' });
  };

  return (
    <>
      <div className="mobile-nav-overlay" style={navigationStyle} onClick={handleClose}></div>
      <header className='header' style={headerStyle}>
        <div className="nav_wrapper">
          <div className="mobile_menu" style={{ display: mobileMenuDisplay }} onClick={handleOpen}>
            <span>
              <MenuLineIcon size={30} />
            </span>
          </div>
          <NavLink className="logo" to='/'>
            <h3>BLOG</h3>
          </NavLink>
        </div>

        <ul id='nav' style={{ display: isNavVisible ? 'flex' : 'none', opacity: isNavVisible ? '1' : '0' }}>
          {nav_links.map((item, index) => (
            <li className="nav_item" key={index}>
              <NavLink
                to={'/' + item.path}
                className={(navClass) => navClass.isActive ? "nav_active" : ""}
              >
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </header>
      <div className="mobile_nav" style={mobileNavStyle}>
        <div>
          <div className="navigation" style={navigationStyle}>
            <ul className="menu">

              <span className="home_icon" onClick={handleClose}><Link to='/'><HomeLineIcon size={30} /></Link>
              </span>

              <span className="close_icon" onClick={handleClose}><CloseLineIcon size={30} />
              </span>
            </ul>
            <ul className="quick_links">
              {nav_links.map((item, index) => (
                <li onClick={handleClose} key={index}>
                  <NavLink
                    to={'/' + item.path}
                    className={(navClass) => navClass.isActive ? "nav_active" : ""}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
