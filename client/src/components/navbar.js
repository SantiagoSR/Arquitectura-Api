import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <img style={{"width" : 45 + '%'}} src="https://i0.wp.com/events.globallandscapesforum.org/wp-content/uploads/sites/2/2018/11/egaplogo_m.jpg?fit=355%2C240&ssl=1" alt=""></img>
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/record">
               List of Crops
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Create New Crop
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}