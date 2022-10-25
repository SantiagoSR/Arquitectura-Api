import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   namedoc: "",
   author: "",
   title: "",
   content: "",
   date: "",
   crops: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/pdflist/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const crop = await response.json();
     if (!crop) {
       window.alert(`PDF with id ${id} not found`);
       navigate("/pdflist");
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
   const editedPDF = {
     namedoc: form.namedoc,
     //author: form.author,
     //title: form.title,
     //content: form.content,
     //date: form.date
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/pdflist/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPDF),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update PDF File Name </h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="namedoc">Document Name: </label>
         <input
           type="text"
           className="form-control"
           id="seed"
           value={form.namedoc}
           onChange={(e) => updateForm({ namedoc: e.target.value })}
         />
       </div>
       <br />
       <div className="form-group">
         <input
           type="submit"
           value="Update PDF"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
