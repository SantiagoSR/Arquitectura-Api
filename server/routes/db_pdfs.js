const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/pdflist").get(function (req, res) {
 let db_connect = dbo.getDb("planificacion");
 db_connect
   .collection("pdfs")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/pdflist/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("pdfs")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/pdflist/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   namedoc: req.body.namedoc,
   author: req.body.author,
   title: req.body.title,
   content: req.body.content,
   date: req.body.date,
 };
 
 db_connect.collection("pdfs").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/pdflist/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     namedoc: req.body.namedoc,
     author: req.body.author,
     title: req.body.title,
     content: req.body.content,
     date: req.body.date,
   },
 };
 db_connect
   .collection("pdfs")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("pdf updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/pdflist/delete/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("pdfs").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("pdf deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;
