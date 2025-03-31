const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// connect with MongoDB

// const uri = "mongodb+srv://sadakathossain11:<db_password>@cluster1.csyfged.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const uri = `mongodb+srv://sadakathossain11:${process.env.DB_PASS}@cluster1.csyfged.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
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
        // Send a ping to confirm a successful connection
        await client.db("TaskManagement").command({ ping: 1 });
        const dataCollection = client.db("TaskManagement").collection('AllTask')
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Get operation
        app.get('/', async (req, res) => {
            res.send('Server is error running.')
        });

        // Load data from MongoDB
        app.get('/allTask', async (req, res) => {
            const result = await dataCollection.find().toArray();
            res.send(result)
        })


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});