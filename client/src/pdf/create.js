import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   namedoc: "",
   author: "",
   title: "",
   content: "",
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
 
   await fetch("http://localhost:5000/pdflist/add", {
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
 
   setForm({ namedoc: "", author: "", title: "", content:"", date: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New PDF</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="namedoc">Name of the Document</label>
         <input
           type="string"
           className="form-control"
           id="namedoc"
           value={form.namedoc}
           onChange={(e) => updateForm({ namedoc: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="author">Author</label>
         <input
           type="string"
           className="form-control"
           id="author"
           value={form.author}
           onChange={(e) => updateForm({ author: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="title">Title</label>
         <input
           type="string"
           className="form-control"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="content">Content</label>
         <input
           type="string"
           className="form-control"
           id="content"
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
       <div className="form-group">
         <input
           type="submit"
           value="Create PDF"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
