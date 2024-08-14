const express = require('express')
const mongoose = require('mongoose');
const schema = require('./Schema/schema');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;
app.get('/', (req, res)=>{
    res.send("running")
})

mongoose.connect("mongodb://127.0.0.1:27017/BREAD")
// mongoose.connect("mongodb+srv://Aman:amanAWSdb@cluster0.0plgcho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> {
    console.log("Connected to database");

    // To Find All
    app.get("/get", async (req, res)=>{
        // try{
            const data = await schema.find();
            console.log(data);
            res.json({result: data});
        // }
        // catch(err){
        //     res.json({ error: err})
        // }
    });
    
    // To Create data
    app.post("/create", async (req, res)=> {
    //   try{
        const data = new schema(req.body);
        const result = await data.save();
        console.log(data);
        res.send(result)
    //   } 
    //   catch(err){
    //     res.status(404).json({ error: err})
    //   }
    });


    // Endpoint to check if key exists
    app.get('/check-key/:key', async (req, res) => {
      try {
        const data = await schema.findOne({ key: req.params.key });
        if (data) {
          res.json({result : data, exists: true });
        } else {
          res.json({ exists: false });
        }
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });

    // Find and Update (with ID)
    app.get(`/update/:id`, async(req, res)=>{
        // console.log(`${id}`)
        const data = await schema.find({_id: req.params.id});
        if(data){
         res.json({result : data})
         console.log(data);
         
        }
        else{
         res.send({result: "Updated and find with get"});
         console.log("No Record Found");
        }
    })

    // To Update data (with ID)
    app.put(`/update/:id`, async (req, res)=> {
        const data = await schema.updateOne(
            { _id: req.params.id }, 
            { $set: req.body }
        );
        console.log("Updated with put");
        res.json({result : data})
    });

    // Update using key reference
    app.put(`/update/data/:key`, async (req, res)=>{
        const data = await schema.updateOne(
            { key: req.params.key },
            { $set: req.body }
        );
        console.log("Update with key");
        console.log(data);
        res.json({result : data})
    })




    // To Delete the data (with ID)
    app.delete("/delete/:id", async(req, res)=>{
        const data = await schema.deleteOne({ _id: req.params.id});
        res.json({result : data});
        console.log('Deleted');
    })


    // Find and Delete (with ID)
    app.get("/delete/:key", async (req, res)=>{
        const data = await schema.find({key: req.params.key});
        console.log(data);
        res.json({result : data});
    })

    // Delete with key reference
    app.delete("/delete/data/:key", async(req, res)=>{
        const data = await schema.deleteOne({key: req.params.key});
        console.log(data);
        res.json({result : data});
    })


    app.listen(port, ()=> {
        console.log(`Server is running on port : ${port}`);
    })

})
.catch(()=> {
    console.log("Not Connected");
})