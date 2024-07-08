import { MongoClient, ServerApiVersion } from 'mongodb';
import { USER_PASSWORD, USERNAME } from '../secrets/mongoSecrets';
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

// get all of the data in coolWords
// move to a lower case
// update all of the data in coolWords

const fetchAllDocuments = async (dbName:string, collectionName:string) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Inserting data into the collection
        const cursor = await collection.find();
        const data = await cursor.map((document) => {
            document.word = document.word.toLowerCase();
            return document;
        }).toArray();
        return data;
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        // Close the connection
        await client.close();
    }
};
const removeDups = (documents) => {
    const wordLookup = {};
    return Array.from(documents).filter((document) => {
        if (wordLookup[document.word]) {
            return false;
        } else {
            wordLookup[document.word] = document;
            return true;
        }
    });
};

const documents = fetchAllDocuments(dbName, collectionName);
// remove repeated words
const uniqueWords = removeDups(documents);
// update db for words


