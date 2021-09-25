import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import LogoImg from './img/f-icon.png'; 

export const Header = () => {
    return (
        <Navbar bg="light" variant="light" >
          <Navbar.Brand href="#home" >
            <img
              alt=""
              src={LogoImg}
              width="40"
              height="40"
              className="inline border-b-4"
            />{" "}
            MPG team builder
          </Navbar.Brand>
        </Navbar>
    );
}
