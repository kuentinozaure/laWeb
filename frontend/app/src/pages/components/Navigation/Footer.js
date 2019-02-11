import React from "react";
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Footer = () => {
  return (
    <div>
    <footer>
    <section id="lab_social_icon_footer">
    <h2>Association LaWeb</h2>
        <div className="container">
            <div className="text-center center-block">
                <a href="https://www.facebook.com"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
                <a href="https://twitter.com"><i id="social-tw" className="fa fa-twitter-square fa-3x social"></i></a>
                <a href="mailto:#" title="LaWeb@gma²il.com"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
            </div>
        </div>
    </section>
    </footer>
    </div>
  );
};

export default Footer;