import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   seed: "",
   volume: "",
   crop: "",
   date: "",
   crops: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const crop = await response.json();
     if (!crop) {
       window.alert(`Crop with id ${id} not found`);
       navigate("/record");
       return;
     }
 
     setForm(crop);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedCrop = {
     seed: form.seed,
     volume: form.volume,
     crop: form.crop,
     date: form.date
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/record/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedCrop),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Crop</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="seed">Seed: </label>
         <input
           type="text"
           className="form-control"
           id="seed"
           value={form.seed}
           onChange={(e) => updateForm({ seed: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="volume">Volume: </label>
         <input
           type="number"
           className="form-control"
           id="volume"
           value={form.volume}
           onChange={(e) => updateForm({ volume: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="crop">Crop: </label>
         <input
           type="number"
           className="form-control"
           id="crop"
           value={form.crop}
           onChange={(e) => updateForm({ crop: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="date">Date: </label>
         <input
           type="date"
           className="form-control"
           id="date"
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
         />
       </div>
       <br />
       <div className="form-group">
         <input
           type="submit"
           value="Update Crop"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
