const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors=require('cors')

app.use(cors());
app.use(express.json());

//opDKEpJaBet6owPb

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//mongodb configuration

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:opDKEpJaBet6owPb@cluster0.mergvyr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create collection of documents
    const bookCollections=client.db("BookInventory").collection("books");

    //insert a book to the database: post method
    
    app.post("/upload-book",async(req,res)=>{
      const data=req.body;
      const result=await bookCollections.insertOne(data);
      res.send(result);
    })

    //get all books from db

    app.get("/all-books",async(req,res)=>{
      const books= bookCollections.find();
      const result=await books.toArray();
      res.send(result);
    })


    //update book data 
    app.patch("/book/:id",async(req,res)=>{
      const id=req.params.id;
     // console.log(id);
      const updateBookData=req.body;
      const filter={_id:new ObjectId(id)};
      const options={upsert:true};

      const updateDoc={
        $set:{
          ...updateBookData
        }
      }

      const result=await bookCollections.updateOne(filter,updateDoc,options)
      res.send(result);
    
    })

    app.delete("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await bookCollections.deleteOne(filter);
        if (result.deletedCount === 1) {
          res.send({ message: "Book deleted successfully" });
        } else {
          res.status(404).send({ error: "Book not found" });
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    //find By category 

    app.get("/allCategory-books",async(req,res)=>{
      let query={};
      if(req.query?.category){
        query={category:req.query.category}
      }
      const result=await bookCollections.find(query).toArray();
      res.send(result);
    })

    //to get single book data
    const { ObjectId } = require('mongodb');

app.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await bookCollections.findOne(filter);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error("Error retrieving book:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})