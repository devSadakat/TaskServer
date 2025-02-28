
const express = require ('express');
const cors = require ('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; 

// middleware
app.use(cors);
app.use(express.json());


// Get operation
app.get('/', async(req, res) => {
    console.log('The server is running');
});

app.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
} )
