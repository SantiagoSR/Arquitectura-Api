import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Crop = (props) => (
 <tr>
   <td>{props.crop.seed}</td>
   <td>{props.crop.volume}</td>
   <td>{props.crop.crop}</td>
   <td>{props.crop.date}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.crop._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteCrop(props.crop._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function CropList() {
 const [crops, setCrops] = useState([]);
 
 // This method fetches the crops from the database.
 useEffect(() => {
   async function getCrops() {
     const response = await fetch(`http://localhost:5000/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const crops = await response.json();
     setCrops(crops);
   }
 
   getCrops();
 
   return;
 }, [crops.length]);
 
 // This method will delete a crop
 async function deleteCrop(id) {
   await fetch(`http://localhost:5000/record/delete/${id}`, {
     method: "DELETE"
   });
 
   const newCrops = crops.filter((el) => el._id !== id);
   setCrops(newCrops);
 }
 
 // This method will map out the crops on the table
 function cropList() {
   return crops.map((crop) => {
     return (
       <Crop
         crop={crop}
         deleteCrop={() => deleteCrop(crop._id)}
         key={crop._id}
       />
     );
   });
 }
 
 // This following section will display the table with the crops of individuals.
 return (
   <div>
     <h3>PDF List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Author</th>
           <th>Title</th>
           <th>Date</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{cropList()}</tbody>
     </table>
   </div>
 );
}
