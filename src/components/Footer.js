import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component{
    render() {
        return (
             <footer className="footer">
                <p>Made By StarShip-Crew</p>
               {" "}
                <a href="https://github.com/GeshikaSingh/Starship-Crew" target="_blank" rel="noreferrer noopener">Github</a> 
             </footer>
        );
    }
} 
export default Footer;
