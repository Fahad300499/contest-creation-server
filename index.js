const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
var cors = require('cors')
const port = 3000

app.use(cors());
app.use(express.json())

const uri = "mongodb+srv://contestDBUser:p3NrGPFcpgeQmukR@cluster0.co3ydzz.mongodb.net/?appName=Cluster0";

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

        const contestDB = client.db("contestDB");
        const contestCollection = contestDB.collection("contest");

        // all contest get api
        app.get('/all-contests', async(req, res)=>{
            const contest = req.body;
            const cursor = contestCollection.find({}).sort({participants : -1})
            const result = await cursor.toArray();
            res.send(result);
        })
         // all contest post api
        app.post('/all-contests', async(req, res)=>{
            const contest = req.body;
            const result = await contestCollection.insertOne(contest);
            res.send(result);
        })

        // contest get api
        app.get('/contests', async(req, res)=>{
            const contest = req.body;
            const cursor = contestCollection.find({}).limit(6).sort({participants : -1})
            const result = await cursor.toArray();
            res.send(result);
        })

        // contest details page api
        app.get('/contests/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id : new ObjectId(id)}
            const cursor = contestCollection.find(query)
            const result = await cursor.toArray();
            res.send(result);
        })

        // contest post api
        app.post('/contests', async(req, res)=>{
            const contest = req.body;
            const result = await contestCollection.insertOne(contest);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// contestDBUser
// p3NrGPFcpgeQmukR