import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   large: "",
   width: "",
   seed_space: "",
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
 
   setForm({ large: "", width: "", seed_space: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="large">Large</label>
         <input
           type="number"
           className="form-control"
           id="large"
           value={form.large}
           onChange={(e) => updateForm({ large: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="width"> Width</label>
         <input
           type="number"
           className="form-control"
           id="width"
           value={form.width}
           onChange={(e) => updateForm({ width: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="width">Seed Space</label>
         <input
           type="number"
           className="form-control"
           id="width"
           value={form.width}
           onChange={(e) => updateForm({ seed_space: e.target.value })}
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
