const subscriberModel = require('./models/subscribers')
const express = require('express');
const app = express()

app.get("/", (req,res)=>{
    res.json("Hello, This project is made by Anushri");
});

// sending GET request inorder to get subscribers list 
app.get("/subscribers", async(req, res)=>{
    try{

// get all the subscribers from the database 
        const subscribers= await subscriberModel.find().select("-__v");

// returns response with list of subscribers & status 200 (OK)        
        res.status(200).json(subscribers);
    }catch(err){

// if error occurs, returns status 400 with error message
        res.status(400).json({
            error : "Not found in Database"
        });
    }
});

// sending GET request at the path "/subscribers/name"
app.get("/subscribers/name", async (req, res)=>{

    // To retrieve a list of subscribers    
        try{   
            const subscribers= await subscriberModel.find().select("-__v -_id -subscribedDate")
    
    // returns response with list of subscribers & status 200 (OK)
            res.status(200).json(subscribers);
        }catch(err){
    
    // if error occurs, returns status 400 with error message
            res.status(400).json({
                error : "Invalid name Url"
            });
        }
    });
    
    //sending GET request to fetch data as per id
    app.get("/subscribers/:id", async (req, res) => {
      try{
        let id =req.params.id;
        let subscribers= await subscriberModel.findById(id);
        res.status(200).json(subscribers);
      }catch(err){
        res.status(400).json({message: "Invalid Id"});
      }
    })


















module.exports = app;
