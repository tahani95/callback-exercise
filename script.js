const express = require('express');
const app = express()
const port = 6000; 
let count=0;
  
let users=[{username: "string", password: "string", id:9}];
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded 
app.get("/api/v1/Users",(req,res)=>{
  if(req.query.search){
  let searchUser= users.filter((user)=>{
    if(user.username.startsWith(`${req.query.search}`)){return user}})
  res.send(searchUser);}
  if(Object.entries(req.query).length==0){res.status(200).send(users)}
  res.status(404).send();
})
app.get("/api/v1/Users/:id",(req,res)=>{
  let idUser;
  if(!isNaN(req.params.id)){
    idUser=users.filter(user=>{
      if(user.id==req.params.id){
        return user;
      }
    })
    if(idUser.length==0){
      res.status(404).send();
    }
    else{
    res.send(idUser);
  }
  }
  else{
    res.status(400).send("ID must be a number");
  }
  
     
 })
 app.post("/api/v1/users/",(req,res)=>{
  count++ ;
  req.body.id=count;
  let a=false;
  users.forEach(user=>{if(user.username==req.body.username){a=true}})
   if(a){
     res.status(409).send(`${req.body.username} already exists`);
   }
   else{
     users.push(req.body);
    res.status(201).send(req.body);
   }
 })

 app.put('/api/v1/users/:id',(req,res)=>{
 let editId=[];
 users.forEach(user=>{if(user.id==req.params.id){editId.push(user)}})
  if(!isNaN(req.params.id)){
  if(editId.length!==0){
    let checkUsername=users.some(user=>user.username===req.body.username)
    if(checkUsername){
      res.status(409).send(`${req.body.username} already exists`);
    }
    users.find(user=>{if(user.id==req.params.id){
      user.username=req.body.username;
      user.password=req.body.password}})
    res.status(200).send(users);
  }
     else{res.status(404).send()}
  }
  else{
    res.status(400).send("ID must be a number");}
 })
app.delete('/api/v1/users/:id',(req,res)=>{
  let checkID=false;
  if(!isNaN(req.params.id)){
      users.find((user,index)=>{if(user.id==req.params.id){
      users.splice(index,1);
        checkID=true;
        res.status(200).send();}})
  }