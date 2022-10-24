import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   seed: "",
   volume: "",
   crops: "",
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
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
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
 
   setForm({ seed: "", volume: "", crops: "" , date: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="seed">Large</label>
         <input
           type="string"
           className="form-control"
           id="seed"
           value={form.seed}
           onChange={(e) => updateForm({ seed: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="volume"> Width</label>
         <input
           type="number"
           className="form-control"
           id="volume"
           value={form.volume}
           onChange={(e) => updateForm({ volume: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="volume">Seed Space</label>
         <input
           type="number"
           className="form-control"
           id="crops"
           value={form.volume}
           onChange={(e) => updateForm({ crops: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="date">Date</label>
         <input
           type="date"
           className="form-control"
           id="date"
           value={form.volume}
           onChange={(e) => updateForm({ date: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create form"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
