import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {

var backend = 'api'
 const [form, setForm] = useState({
   seed: "",
   volume: "",
   crop: "",
   date: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new crop to the database.
   const newPerson = { ...form };
 
   await fetch('http://'+backend+':5000/record/add', {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ seed: "", volume: "", crop: "" , date: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Crop</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="seed">Seed</label>
         <input
           type="string"
           className="form-control"
           id="seed"
           value={form.seed}
           onChange={(e) => updateForm({ seed: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="volume"> Volume</label>
         <input
           type="number"
           className="form-control"
           id="volume"
           value={form.volume}
           onChange={(e) => updateForm({ volume: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="crop">Crop</label>
         <input
           type="number"
           className="form-control"
           id="crop"
           value={form.crop}
           onChange={(e) => updateForm({ crop: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="date">Date</label>
         <input
           type="date"
           className="form-control"
           id="date"
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
         />
       </div>
       <br></br>
       <div className="form-group">
         <input
           type="submit"
           value="Create Crop"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
