import { MongoClient, ServerApiVersion } from 'mongodb';
import { USER_PASSWORD, USERNAME } from './secrets/mongoSecrets';
import { WORDS } from './dataCleaning/ingestWords';
const dbName = 'RhymingCouplets';
const collectionName = 'coolWords';
const uri = `mongodb+srv://${USERNAME}:${USER_PASSWORD}@words.amxz6ms.mongodb.net/?retryWrites=true&w=majority&appName=words`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const insertOneDocument = async (data: Document, dbName:string, collectionName:string) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Inserting data into the collection
        const result = await collection.insertOne(data);
        console.log(`Inserted document into the collection.`);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

const insertManyDocuments = async (data: Document[], dbName:string, collectionName:string) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Inserting data into the collection
        const result = await collection.insertMany(data);
        console.log(`Inserted ${result.insertedCount} documents into the collection.`);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        // Close the connection
        await client.close();
    }
};
insertManyDocuments(WORDS, dbName, collectionName);



const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.log('Failed to ping your client...scrubby dub dub bruv');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
