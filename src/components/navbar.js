import React from "react";
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#98fb98"}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/#">News</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" end className="nav-link" activeClassName="active">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/posts/create" end className="nav-link" activeClassName="active">New article</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/info" end className="nav-link" activeClassName="active">Info</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
